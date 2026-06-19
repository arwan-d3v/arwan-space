import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, Palette, User, HelpCircle, Users, Globe, Activity } from 'lucide-react';
import NeumButton from '../components/neum/NeumButton';
import NeumLogoutButton from '../admin/NeumLogoutButton'; // Reuse admin logout button
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  // Fetch session and mock role if needed
  const { data: { session } } = await supabase.auth.getSession();

  // In a real scenario, we fetch the role from the 'profiles' table.
  // For local testing without full DB, we'll mock it based on email or default to 'pro'
  let role = 'pro';
  if (session?.user?.email?.includes('company')) role = 'company';
  if (session?.user?.email?.includes('student')) role = 'student';

  const MENU = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/cv', icon: FileText, label: 'My CVs' },
    { href: '/dashboard/themes', icon: Palette, label: 'Themes' },
    { href: '/dashboard/trading', icon: Activity, label: 'Trading' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
    { href: '/dashboard/support', icon: HelpCircle, label: 'Support' },
  ];

  if (role === 'company') {
    MENU.push({ href: '/dashboard/team', icon: Users, label: 'Team Management' });
    MENU.push({ href: '/dashboard/domain', icon: Globe, label: 'Custom Domain' });
  }

  return (
    <div className="flex h-screen neum-bg overflow-hidden text-slate-200 font-sans">
      <aside className="w-64 flex-shrink-0 neum-panel rounded-none border-r border-gray-300 z-10 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold neum-text-accent tracking-wider">MEMBER AREA</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase font-semibold">Plan: {role}</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
          {MENU.map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <NeumButton className="w-full justify-start py-3">
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </NeumButton>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-300">
           <NeumLogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
        {children}
      </main>
    </div>
  );
}
