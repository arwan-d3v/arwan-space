import NeumPanel from '../../components/neum/NeumPanel';
import NeumButton from '../../components/neum/NeumButton';
import { THEMES } from '@/lib/themes';
import Link from 'next/link';

export default function ThemesSelection() {
  // Mock role, in reality fetch from DB
  let role = 'pro';

  const allowedThemesCount = role === 'public' ? 2 : role === 'student' ? 7 : 27;
  const availableThemes = THEMES.slice(0, allowedThemesCount);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-100">Select a Theme</h2>
        <p className="text-slate-300 mt-2">Showing {availableThemes.length} themes available for your {role} plan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableThemes.map(theme => (
          <NeumPanel key={theme.id} className="p-4 flex flex-col group">
            <div
              className="w-full aspect-[1/1.4] bg-gray-200 rounded-lg mb-4 overflow-hidden relative"
              style={{ backgroundColor: theme.colors.background }}
            >
              {/* Abstract preview based on colors */}
              <div className="absolute inset-0 p-4 flex flex-col gap-2">
                <div className="w-1/2 h-6 rounded" style={{ backgroundColor: theme.colors.primary }}></div>
                <div className="w-3/4 h-2 rounded" style={{ backgroundColor: theme.colors.text, opacity: 0.5 }}></div>
                <div className="w-2/3 h-2 rounded" style={{ backgroundColor: theme.colors.text, opacity: 0.5 }}></div>
                <div className="mt-4 flex gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.secondary }}></div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Link href={`/dashboard/builder?theme=${theme.id}`}>
                   <button className="px-6 py-2 bg-white text-black font-bold rounded-full shadow-lg">Use Theme</button>
                </Link>
              </div>
            </div>
            <div className="flex justify-between items-center px-2">
              <div>
                <h3 className="font-bold text-slate-100">{theme.display_name}</h3>
                <p className="text-xs text-gray-500 uppercase">{theme.layout_id} layout</p>
              </div>
            </div>
          </NeumPanel>
        ))}
      </div>
    </div>
  );
}
