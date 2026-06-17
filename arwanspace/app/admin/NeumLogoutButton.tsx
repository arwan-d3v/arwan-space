'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import NeumButton from '../components/neum/NeumButton';

export default function NeumLogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <NeumButton onClick={handleLogout} className="w-full justify-center text-red-500 hover:text-red-600">
      <LogOut size={18} />
      <span className="text-sm font-bold">Sign Out</span>
    </NeumButton>
  );
}
