"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Footer from '../../components/Footer';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
  };

  return (
    <main className="min-h-screen bg-brand-white text-brand-black flex flex-col items-center justify-center p-0">
      <section className="w-full max-w-md mx-auto py-16 md:py-20 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-orange font-poppins mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand-orange font-poppins"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full py-2 bg-brand-orange text-white font-semibold rounded hover:bg-brand-black transition-colors font-poppins" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
        </form>
        <button
          className="mt-4 text-brand-orange hover:underline font-poppins text-sm"
          onClick={handleForgotPassword}
          disabled={loading || !email}
        >
          Forgot password?
        </button>
        {resetSent && <div className="text-green-600 text-sm mt-2">Password reset email sent!</div>}
      </section>
      <Footer />
    </main>
  );
}
