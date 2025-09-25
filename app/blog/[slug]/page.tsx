import { notFound } from 'next/navigation';
import Footer from '../../../components/Footer';

// Sample blog posts data - this would come from Supabase in production
const blogPosts = [
  {
    id: 1,
    title: 'Next.js Best Practices for 2024',
    slug: 'nextjs-best-practices-2024',
    excerpt: 'Discover the latest techniques and patterns for building high-performance Next.js applications.',
    content: `
      <p>Next.js continues to evolve, and 2024 brings exciting new features and best practices that can significantly improve your application's performance and developer experience.</p>
      
      <h2>1. App Router Optimization</h2>
      <p>The new App Router provides better performance with server components and improved caching strategies. Here are the key benefits:</p>
      <ul>
        <li><strong>Server Components:</strong> Reduce JavaScript bundle size by rendering components on the server</li>
        <li><strong>Streaming:</strong> Improve perceived performance with progressive loading</li>
        <li><strong>Parallel Routes:</strong> Load multiple page sections simultaneously</li>
      </ul>
      
      <h2>2. Image Optimization</h2>
      <p>Leverage Next.js Image component with the latest optimization features:</p>
      <pre><code>import Image from 'next/image'

export default function MyComponent() {
  return (
    &lt;Image
      src="/hero.jpg"
      alt="Description"
      width={800}
      height={400}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    /&gt;
  )
}</code></pre>
      
      <h2>3. Performance Monitoring</h2>
      <p>Implement comprehensive performance monitoring to track your application's health. Use tools like:</p>
      <ul>
        <li>Web Vitals for core performance metrics</li>
        <li>Analytics integration for user behavior tracking</li>
        <li>Error boundary components for graceful error handling</li>
      </ul>
      
      <h2>4. SEO Best Practices</h2>
      <p>Ensure your Next.js application is optimized for search engines:</p>
      <ul>
        <li>Use proper metadata API for dynamic meta tags</li>
        <li>Implement structured data with JSON-LD</li>
        <li>Optimize for Core Web Vitals</li>
        <li>Create XML sitemaps automatically</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>By following these best practices, you'll build Next.js applications that are not only performant but also maintainable and scalable. Remember to always test your optimizations and monitor their impact on real users.</p>
    `,
    author: 'Object Technologies Team',
    publishedAt: '2024-09-20',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Performance', 'SEO'],
    image: '/api/placeholder/800/400',
    readTime: 8
  },
  {
    id: 2,
    title: 'Building Scalable React Applications',
    slug: 'building-scalable-react-applications',
    excerpt: 'Learn how to architect React applications that can grow with your business needs.',
    content: `
      <p>Building scalable React applications requires careful planning and the right architectural decisions from the start. This guide will walk you through the essential patterns and practices.</p>
      
      <h2>Component Architecture</h2>
      <p>Design your components with reusability and maintainability in mind:</p>
      <ul>
        <li><strong>Atomic Design:</strong> Break UI into atoms, molecules, organisms, templates, and pages</li>
        <li><strong>Composition over Inheritance:</strong> Use composition patterns to build flexible components</li>
        <li><strong>Single Responsibility:</strong> Each component should have one clear purpose</li>
      </ul>
      
      <h2>State Management</h2>
      <p>Choose the right state management solution for your application's complexity:</p>
      <ul>
        <li><strong>Local State:</strong> useState and useReducer for component-level state</li>
        <li><strong>Global State:</strong> Context API for sharing state across components</li>
        <li><strong>External Libraries:</strong> Redux Toolkit, Zustand, or Jotai for complex scenarios</li>
      </ul>
      
      <h2>Code Organization</h2>
      <p>Structure your project for long-term maintainability:</p>
      <pre><code>src/
├── components/
│   ├── common/
│   ├── forms/
│   └── layout/
├── hooks/
├── services/
├── utils/
├── types/
└── pages/</code></pre>
      
      <h2>Performance Optimization</h2>
      <p>Implement performance optimizations from the start:</p>
      <ul>
        <li>Use React.memo for component memoization</li>
        <li>Implement code splitting with lazy loading</li>
        <li>Optimize bundle size with proper tree shaking</li>
        <li>Use React DevTools Profiler to identify bottlenecks</li>
      </ul>
    `,
    author: 'Object Technologies Team',
    publishedAt: '2024-09-15',
    category: 'React',
    tags: ['React', 'Architecture', 'Scalability', 'Performance'],
    image: '/api/placeholder/800/400',
    readTime: 12
  },
  {
    id: 3,
    title: 'The Future of Web Development in Africa',
    slug: 'future-web-development-africa',
    excerpt: 'Exploring the growing tech landscape across Africa and opportunities for web developers.',
    content: `
      <p>The African continent is experiencing unprecedented growth in technology adoption and innovation. This presents unique opportunities and challenges for web developers across the region.</p>
      
      <h2>Growing Markets</h2>
      <p>Countries like Nigeria, Kenya, and South Africa are leading the charge in tech innovation:</p>
      <ul>
        <li><strong>Nigeria:</strong> Home to Africa's largest fintech ecosystem</li>
        <li><strong>Kenya:</strong> Pioneer in mobile money with M-Pesa</li>
        <li><strong>South Africa:</strong> Strong e-commerce and enterprise solutions</li>
      </ul>
      
      <h2>Unique Challenges</h2>
      <p>African developers face specific challenges that require innovative solutions:</p>
      <ul>
        <li>Limited internet infrastructure in rural areas</li>
        <li>Mobile-first approach due to smartphone prevalence</li>
        <li>Diverse linguistic and cultural requirements</li>
        <li>Payment integration complexities</li>
      </ul>
      
      <h2>Opportunities for Developers</h2>
      <p>Web developers in Africa have unique opportunities to solve local problems:</p>
      <ul>
        <li>E-commerce platforms for local markets</li>
        <li>Educational technology solutions</li>
        <li>Healthcare and telemedicine applications</li>
        <li>Agricultural technology platforms</li>
      </ul>
      
      <h2>Key Technologies</h2>
      <p>Focus on technologies that work well in African contexts:</p>
      <ul>
        <li>Progressive Web Apps (PWAs) for offline functionality</li>
        <li>Mobile-responsive design for smartphone users</li>
        <li>Lightweight frameworks for slower connections</li>
        <li>Local payment gateway integrations</li>
      </ul>
      
      <h2>The Road Ahead</h2>
      <p>The future of web development in Africa is bright. With increasing investment in tech infrastructure and a growing pool of talented developers, the continent is poised to become a major player in the global tech ecosystem.</p>
    `,
    author: 'Object Technologies Team',
    publishedAt: '2024-09-10',
    category: 'Industry',
    tags: ['Africa', 'Tech Industry', 'Innovation', 'Mobile'],
    image: '/api/placeholder/800/400',
    readTime: 6
  }
];

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-brand-white text-brand-black">
      {/* Article Header */}
      <article className="section-padding">
        <div className="container-max max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-brand-gray-500 mb-8">
            <a href="/" className="hover:text-brand-orange">Home</a>
            <span className="mx-2">/</span>
            <a href="/blog" className="hover:text-brand-orange">Blog</a>
            <span className="mx-2">/</span>
            <span className="text-brand-black">{post.title}</span>
          </nav>

          {/* Article Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm">
                {post.category}
              </span>
              <span className="text-brand-gray-500 text-sm">{post.readTime} min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-brand-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-brand-gray-500 pb-6 border-b border-brand-gray-200">
              <div className="flex items-center">
                <span>By <strong className="text-brand-black">{post.author}</strong></span>
                <span className="mx-2">•</span>
                <span>{post.publishedAt}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-brand-gray-400 hover:text-brand-orange transition-colors">
                  <span className="text-lg">🔗</span>
                </button>
                <button className="p-2 text-brand-gray-400 hover:text-brand-orange transition-colors">
                  <span className="text-lg">📱</span>
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-brand-orange/10 rounded-lg mb-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-brand-gray-600">Featured Image</p>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none 
                       prose-headings:text-brand-black prose-headings:font-bold
                       prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-brand-orange
                       prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                       prose-p:text-brand-gray-700 prose-p:leading-relaxed prose-p:mb-6
                       prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline
                       prose-strong:text-brand-black
                       prose-ul:text-brand-gray-700 prose-li:mb-2
                       prose-code:bg-brand-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-brand-black
                       prose-pre:bg-brand-gray-900 prose-pre:text-brand-white prose-pre:rounded-lg prose-pre:p-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-brand-gray-200">
            <h3 className="text-lg font-semibold text-brand-black mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-brand-gray-100 text-brand-gray-600 rounded-full text-sm hover:bg-brand-orange/10 hover:text-brand-orange transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-brand-gray-50">
          <div className="container-max">
            <h2 className="text-section-title text-brand-orange mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="card card-hover">
                  <div className="aspect-video bg-brand-orange/10 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📝</div>
                      <p className="text-brand-gray-600 text-sm">Blog Image</p>
                    </div>
                  </div>
                  
                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm rounded-full mb-3 inline-block">
                    {relatedPost.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-brand-black mb-3">
                    <a href={`/blog/${relatedPost.slug}`} className="hover:text-brand-orange">
                      {relatedPost.title}
                    </a>
                  </h3>
                  
                  <p className="text-brand-gray-600 mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-brand-gray-500">
                    <span>{relatedPost.readTime} min read</span>
                    <span>{relatedPost.publishedAt}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h2 className="text-section-title text-brand-white mb-4">Enjoyed this article?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for more tech insights and updates.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-white"
            />
            <button className="btn-primary bg-brand-white text-brand-orange hover:bg-brand-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}