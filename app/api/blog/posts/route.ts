import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 60; // ISR-like caching for 60s

export async function GET() {
  console.log('Blog API route hit - checking credentials...');
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
    console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Missing');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Missing Supabase credentials');
      return NextResponse.json({ posts: [], error: 'Missing Supabase credentials' }, { status: 200 });
    }
    
    console.log('Creating Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // First, let's check what posts we have
    console.log('Fetching all posts...');
    const { data: allPosts, error: countError } = await supabase
      .from('blog_posts')
      .select('*');
    
    if (countError) {
      console.error('Error fetching all posts:', countError);
    }
    
    console.log('Total posts found:', allPosts?.length);
    
    // Now get published posts
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, read_time, category, tags, author, published_at, content')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
      
    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    
    console.log('Published posts found:', data?.length);
    return NextResponse.json({ 
      posts: data ?? [],
      debug: { 
        totalPosts: allPosts?.length,
        publishedPosts: data?.length,
        url: process.env.NEXT_PUBLIC_BASE_URL 
      }
    }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ posts: [], error: e?.message || 'Failed to load posts' }, { status: 200 });
  }
}
