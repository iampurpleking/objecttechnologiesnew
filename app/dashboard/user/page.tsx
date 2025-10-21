'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

export default function UserDashboard() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push('/get-started');
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!user) {
    router.replace('/get-started');
    return null;
  }

  return (
    <main className="min-h-screen bg-brand-white text-brand-black flex flex-col items-center justify-center p-0 px-2 md:px-0">
      <section className="w-full max-w-4xl mx-auto py-10 md:py-20 px-2 md:px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-orange font-poppins mb-8">User Dashboard</h1>
        <div className="mb-6 text-lg font-poppins text-brand-black/80">Welcome, {user.email}!</div>
        <button 
          onClick={handleLogout} 
          className="mb-8 px-6 py-2 bg-brand-orange text-white rounded font-semibold font-poppins hover:bg-brand-black transition-colors"
        >
          Log Out
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-brand-orange/10 rounded-lg p-6 shadow">
            <h2 className="text-2xl font-bold text-brand-orange mb-2 font-poppins">Account</h2>
            <p className="font-poppins text-brand-black/80 mb-2">
              Manage your account, view updates, and access all your tools.
            </p>
          </div>
          <div className="bg-brand-orange/10 rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-brand-orange mb-2 font-poppins">Project Updates</h2>
            <ul className="list-disc pl-6 text-brand-black/80 font-poppins space-y-1">
              <li>Latest project status and milestones</li>
              <li>Upcoming deadlines</li>
              <li>Recent activity</li>
            </ul>
          </div>
          <div className="bg-brand-orange/10 rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-brand-orange mb-2 font-poppins">Tickets & Complaints</h2>
            <ul className="list-disc pl-6 text-brand-black/80 font-poppins space-y-1">
              <li>View and manage your support tickets</li>
              <li>Submit a new complaint or request</li>
            </ul>
          </div>
          <div className="bg-brand-orange/10 rounded-lg p-6 shadow">
            <h2 className="text-xl font-bold text-brand-orange mb-2 font-poppins">Real-time Chat</h2>
            <ul className="list-disc pl-6 text-brand-black/80 font-poppins space-y-1">
              <li>Chat with support or your project manager</li>
              <li>Get instant updates and notifications</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}