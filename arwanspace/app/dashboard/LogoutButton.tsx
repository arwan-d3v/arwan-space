'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/40 text-gray-800 font-medium rounded-full shadow-sm transition-all"
    >
      <LogOut size={18} />
      Sign Out
    </button>
  );
}
