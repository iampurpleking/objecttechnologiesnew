import Footer from '../../components/Footer';

// Sample blog posts data - in production this would come from Supabase
const blogPosts = [
  {
    id: 1,
    title: 'Next.js Best Practices for 2024',
    slug: 'nextjs-best-practices-2024',
    excerpt: 'Discover the latest techniques and patterns for building high-performance Next.js applications.',
    content: `
      <h2>Introduction</h2>
      <p>Next.js continues to evolve, and 2024 brings exciting new features and best practices that can significantly improve your application's performance and developer experience.</p>
      
      <h3>1. App Router Optimization</h3>
      <p>The new App Router provides better performance with server components and improved caching strategies...</p>
      
      <h3>2. Image Optimization</h3>
      <p>Leverage Next.js Image component with the latest optimization features...</p>
      
      <h3>3. Performance Monitoring</h3>
      <p>Implement comprehensive performance monitoring to track your application's health...</p>
    `,
    author: 'Object Technologies Team',
    publishedAt: '2024-09-20',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Performance'],
    image: '/api/placeholder/800/400',
    readTime: 8
  },
  {
    id: 2,
    title: 'Building Scalable React Applications',
    slug: 'building-scalable-react-applications',
    excerpt: 'Learn how to architect React applications that can grow with your business needs.',
    content: `
      <h2>Scalability in React</h2>
      <p>Building scalable React applications requires careful planning and the right architectural decisions from the start.</p>
      
      <h3>Component Architecture</h3>
      <p>Design your components with reusability and maintainability in mind...</p>
      
      <h3>State Management</h3>
      <p>Choose the right state management solution for your application's complexity...</p>
    `,
    author: 'Object Technologies Team',
    publishedAt: '2024-09-15',
    category: 'React',
    tags: ['React', 'Architecture', 'Scalability'],
    image: '/api/placeholder/800/400',
    readTime: 12
  },
  {
    id: 3,
    title: 'The Future of Web Development in Africa',
    slug: 'future-web-development-africa',
    excerpt: 'Exploring the growing tech landscape across Africa and opportunities for web developers.',
    content: `
      <h2>Africa's Tech Revolution</h2>
      <p>The African continent is experiencing unprecedented growth in technology adoption and innovation.</p>
      
      <h3>Growing Markets</h3>
      <p>Countries like Nigeria, Kenya, and South Africa are leading the charge in tech innovation...</p>
      
      <h3>Opportunities for Developers</h3>
      <p>Web developers in Africa have unique opportunities to solve local problems...</p>
    `,
    author: 'Object Technologies Team',
    publishedAt: '2024-09-10',
    category: 'Industry',
    tags: ['Africa', 'Tech Industry', 'Innovation'],
    image: '/api/placeholder/800/400',
    readTime: 6
  }
];

const categories = ['All', 'Web Development', 'React', 'Industry', 'Tutorial'];

export default function BlogPage() {
  return (
  <main className="min-h-screen bg-brand-white text-brand-black px-2 md:px-0">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h1 className="text-hero text-brand-white mb-6">Tech Insights & Updates</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, best practices, and insights from the world of technology and digital innovation.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full border transition-colors ${
                  category === 'All' 
                    ? 'bg-brand-orange text-brand-white border-brand-orange' 
                    : 'bg-brand-white text-brand-gray-700 border-brand-gray-300 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding px-2 md:px-0">
        <div className="container-max">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.id} className="card card-hover">
                <div className="aspect-video bg-brand-orange/10 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-brand-gray-600">Blog Image</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm rounded-full">
                    {post.category}
                  </span>
                  <span className="text-brand-gray-500 text-sm">{post.readTime} min read</span>
                </div>
                
                <h2 className="text-xl font-bold text-brand-orange mb-3 line-clamp-2">
                  <a href={`/blog/${post.slug}`} className="hover:text-brand-orange/80">
                    {post.title}
                  </a>
                </h2>
                
                <p className="text-brand-gray-700 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-brand-gray-500 mb-4">
                  <span>By {post.author}</span>
                  <span>{post.publishedAt}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-brand-gray-100 text-brand-gray-600 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-brand-orange hover:text-brand-orange/80 font-semibold"
                >
                  Read More 
                  <span className="ml-1">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-section-title text-brand-orange mb-4">Stay Updated</h2>
            <p className="text-section-subtitle mb-8">
              Subscribe to our newsletter and never miss our latest tech insights and updates.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}