import GlassPanel from '../components/GlassPanel';
import BackgroundParallax from '../components/BackgroundParallax';
import LogoutButton from './LogoutButton';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <BackgroundParallax />

      <div className="w-full max-w-2xl relative z-10">
        <GlassPanel className="p-12 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#7ec8e3] to-[#f7a072] rounded-2xl flex items-center justify-center shadow-lg mb-8 rotate-3">
            <span className="text-white font-bold text-3xl">🚀</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">Member Dashboard</h1>
          <p className="text-xl text-gray-600 mb-12">Coming Soon in Milestone 3</p>

          <div className="flex gap-4">
            <a
              href="/"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-full shadow-sm transition-all"
            >
              Back to Resume
            </a>
            <LogoutButton />
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
