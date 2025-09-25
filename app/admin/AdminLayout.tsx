"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data, error: userError } = await supabase.auth.getUser();
      if (!data?.user) {
        setAdminError('No authenticated user found.');
        router.replace('/login');
        return;
      }

      // Check if user is in admin_users table
      const { data: adminUser, error: adminQueryError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (adminQueryError) {
        setAdminError('Supabase query error: ' + adminQueryError.message);
        router.replace('/dashboard');
        return;
      }

      if (!adminUser) {
        setAdminError('User is not found in admin_users table.');
        router.replace('/dashboard');
        return;
      }

      setUser({ ...data.user, role: adminUser.role });
      setAdminError(null);
      setLoading(false);
    };

    checkAdminAccess();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'blog', label: 'Blog Management', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-brand-gray-600">Loading admin panel...</p>
          {adminError && (
            <div className="mt-4 text-red-600">{adminError}</div>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{adminError || 'Access denied.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-brand-white shadow-lg">
        <div className="p-6 border-b border-brand-gray-200">
          <h1 className="text-2xl font-bold text-brand-orange">Admin Panel</h1>
          <p className="text-sm text-brand-gray-600 mt-1">{user.email}</p>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-brand-orange/5 transition-colors ${
                activeSection === item.id 
                  ? 'bg-brand-orange/10 border-r-4 border-brand-orange text-brand-orange' 
                  : 'text-brand-gray-700'
              }`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-brand-gray-200 text-brand-gray-700 rounded hover:bg-brand-gray-300 transition-colors"
          >
            <span className="mr-2">🚪</span>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}