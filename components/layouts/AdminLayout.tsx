'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/blog-posts', label: 'Blog Posts', icon: '📝' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-brand-orange text-white">
        <div className="h-16 flex items-center gap-2 px-4">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <div className="font-semibold">Admin Dashboard</div>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 mb-4 text-sm text-white/60">Navigation</div>
          {adminNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/10 font-medium'
                    : 'hover:bg-white/5'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => signOut()}
            className="w-full px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {adminNavLinks.find(link => link.href === pathname)?.label || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}