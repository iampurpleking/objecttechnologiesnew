'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RoleBasedDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/get-started');
        return;
      }

      // Check user metadata for role
      const userRole = user.user_metadata?.role || 'user';
      
      if (userRole === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/dashboard/user');
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
}