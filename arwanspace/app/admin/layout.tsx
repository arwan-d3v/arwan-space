import { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, CreditCard, Layers, Image as ImageIcon, MessageSquare, Settings, LogOut } from 'lucide-react';
import NeumButton from '../components/neum/NeumButton';
import NeumLogoutButton from './NeumLogoutButton';

const ADMIN_MENU = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/users', icon: Users, label: 'User Mgmt' },
  { href: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { href: '/admin/content', icon: Layers, label: 'Content' },
  { href: '/admin/plans', icon: Layers, label: 'Plans' },
  { href: '/admin/media', icon: ImageIcon, label: 'Media Library' },
  { href: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen neum-bg overflow-hidden text-gray-700 font-sans">
      <aside className="w-64 flex-shrink-0 neum-panel rounded-none border-r border-gray-300 z-10 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold neum-text-accent tracking-wider">COMMAND CENTER</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase font-semibold">Superadmin</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-3 custom-scrollbar">
          {ADMIN_MENU.map((item) => (
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

      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
        {children}
      </main>
    </div>
  );
}
