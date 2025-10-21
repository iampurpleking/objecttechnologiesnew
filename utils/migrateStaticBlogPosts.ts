import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const staticPosts = [
  {
    title: 'Next.js Best Practices for 2024',
    slug: 'nextjs-best-practices-2024',
    excerpt: 'Discover the latest techniques and patterns for building high-performance Next.js applications.',
    content: `<h2>Introduction</h2><p>Next.js continues to evolve, and 2024 brings exciting new features and best practices that can significantly improve your application's performance and developer experience.</p><h3>1. App Router Optimization</h3><p>The new App Router provides better performance with server components and improved caching strategies...</p><h3>2. Image Optimization</h3><p>Leverage Next.js Image component with the latest optimization features...</p><h3>3. Performance Monitoring</h3><p>Implement comprehensive performance monitoring to track your application's health...</p>`,
    author: 'Object Technologies Team',
    published_at: '2024-09-20',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Performance'],
    read_time: 8
  },
  {
    title: 'Building Scalable React Applications',
    slug: 'building-scalable-react-applications',
    excerpt: 'Learn how to architect React applications that can grow with your business needs.',
    content: `<h2>Scalability in React</h2><p>Building scalable React applications requires careful planning and the right architectural decisions from the start.</p><h3>Component Architecture</h3><p>Design your components with reusability and maintainability in mind...</p><h3>State Management</h3><p>Choose the right state management solution for your application's complexity...</p>`,
    author: 'Object Technologies Team',
    published_at: '2024-09-15',
    category: 'React',
    tags: ['React', 'Architecture', 'Scalability'],
    read_time: 12
  },
  {
    title: 'The Future of Web Development in Africa',
    slug: 'future-web-development-africa',
    excerpt: 'Exploring the growing tech landscape across Africa and opportunities for web developers.',
    content: `<h2>Africa's Tech Revolution</h2><p>The African continent is experiencing unprecedented growth in technology adoption and innovation.</p><h3>Growing Markets</h3><p>Countries like Nigeria, Kenya, and South Africa are leading the charge in tech innovation...</p><h3>Opportunities for Developers</h3><p>Web developers in Africa have unique opportunities to solve local problems...</p>`,
    author: 'Object Technologies Team',
    published_at: '2024-09-10',
    category: 'Industry',
    tags: ['Africa', 'Tech Industry', 'Innovation'],
    read_time: 6
  }
];

async function migrate() {
  for (const post of staticPosts) {
    const { error } = await supabase.from('blog_posts').insert([post]);
    if (error) {
      console.error('Error inserting post:', post.title, error.message);
    } else {
      console.log('Inserted:', post.title);
    }
  }
}

migrate();
