'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import GlassPanel from '../components/GlassPanel';
import BackgroundParallax from '../components/BackgroundParallax';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <BackgroundParallax />

      <div className="w-full max-w-md relative z-10">
        <GlassPanel className="p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome Back</h1>
            <p className="text-slate-300 text-sm">Sign in to access your member dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] focus:bg-white/10 transition-all placeholder:text-gray-400"
                placeholder="hello@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] focus:bg-white/10 transition-all placeholder:text-gray-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#7ec8e3] to-[#f7a072] hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to Gateway
            </Link>

            <span className="text-gray-500">
              Need access? <Link href="#" className="text-[#f7a072] font-semibold hover:underline">Register</Link>
            </span>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
