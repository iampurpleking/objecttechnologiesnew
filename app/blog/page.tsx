import BlogListClient, { BlogPost } from "./BlogListClient";

export const revalidate = 60;

// Import at the top of the file
import { createClient } from "@supabase/supabase-js";

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    // Create Supabase client with anon key for public access
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase credentials");
      return <BlogListClient initialPosts={[]} />;
    }

    console.log("Creating Supabase client...");
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // First check all posts regardless of status
    const { data: allPosts, error: allError } = await supabase
      .from("blog_posts")
      .select("*");

    console.log("All posts in database:", allPosts?.length);
    console.log(
      "Posts status breakdown:",
      allPosts?.map((p) => ({ title: p.title, status: p.status })),
    );

    // Then fetch published posts
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    console.log("Posts from database:", data);

    if (error) {
      console.error("Supabase query error:", JSON.stringify(error, null, 2));
    }

    console.log("Found published posts:", data?.length);

    // Format posts to match the expected structure
    posts = (data || []).map((post) => ({
      id: post.id,
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt,
      read_time: post.read_time,
      category: post.category || "General",
      tags: post.tags,
      author: post.author,
      published_at: post.published_at,
      content: post.content,
      image_url: post.image_url,
    }));
  } catch (e) {
    console.error("Error fetching blog posts:", e);
    posts = [];
  }
  return <BlogListClient initialPosts={posts} />;
}
