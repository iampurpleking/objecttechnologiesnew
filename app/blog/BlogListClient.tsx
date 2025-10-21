"use client";
import { useMemo, useState } from 'react';
import Footer from '../../components/Footer';

export type BlogPost = {
  id: string | number;
  title: string;
  slug?: string;
  excerpt?: string;
  read_time?: number;
  category?: string;
  tags?: string[] | null;
  author?: string;
  published_at?: string | null;
  content?: string;
  image_url?: string | null;
};

const categories = ['All', 'Web Development', 'React', 'Industry', 'Tutorial'] as const;

export default function BlogListClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState<string>('');

  const posts = useMemo(() => {
    let list = initialPosts;
    if (category !== 'All') {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q)
      );
    }
    if (tag) {
      list = list.filter((p) => Array.isArray(p.tags) && p.tags.includes(tag));
    }
    return list;
  }, [category, search, tag, initialPosts]);

  const uniqueTags = useMemo(() => {
    const s = new Set<string>();
    for (const p of initialPosts) {
      if (Array.isArray(p.tags)) {
        for (const t of p.tags) s.add(t);
      }
    }
    return Array.from(s).sort();
  }, [initialPosts]);

  return (
    <main className="min-h-screen bg-brand-white text-brand-black px-2 md:px-0">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-r from-brand-orange to-brand-orange-light text-brand-white">
        <div className="container-max text-center">
          <h1 className="text-hero text-brand-white mb-6">Tech Insights & Updates</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, best practices, and insights from the world of technology and digital innovation.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full border transition-colors ${
                  cat === category
                    ? 'bg-brand-orange text-brand-white border-brand-orange'
                    : 'bg-brand-white text-brand-gray-700 border-brand-gray-300 hover:border-brand-orange hover:text-brand-orange'
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto">
            <input
              type="search"
              placeholder="Search by title or excerpt..."
              className="flex-1 px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange w-full md:w-64"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              aria-label="Filter by tag"
            >
              <option value="">All tags</option>
              {uniqueTags.map((t) => (
                <option key={t} value={t}>#{t}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding px-2 md:px-0">
        <div className="container-max">
          {posts.length === 0 ? (
            <div className="text-center text-brand-gray-600">No posts found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="card card-hover">
                  <div className="aspect-video bg-brand-orange/10 rounded-lg mb-4 overflow-hidden">
                    {post.image_url ? (
                      <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📝</div>
                          <p className="text-brand-gray-600">Blog Image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm rounded-full">
                      {post.category || 'General'}
                    </span>
                    <span className="text-brand-gray-500 text-sm">{post.read_time ? `${post.read_time} min read` : ''}</span>
                  </div>
                  <h2 className="text-xl font-bold text-brand-orange mb-3 line-clamp-2">
                    <a href={`/blog/${post.slug}`} className="hover:text-brand-orange/80">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-brand-gray-700 mb-4 line-clamp-3">{post.excerpt || ''}</p>
                  <div className="flex items-center justify-between text-sm text-brand-gray-500 mb-4">
                    <span>By {post.author || 'Object Technologies Team'}</span>
                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(post.tags) && post.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-1 bg-brand-gray-100 text-brand-gray-600 text-xs rounded">#{t}</span>
                    ))}
                  </div>
                  <a href={`/blog/${post.slug}`} className="inline-flex items-center text-brand-orange hover:text-brand-orange/80 font-semibold">
                    Read More <span className="ml-1">→</span>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-brand-gray-50">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-section-title text-brand-orange mb-4">Stay Updated</h2>
            <p className="text-section-subtitle mb-8">Subscribe to our newsletter and never miss our latest tech insights and updates.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
