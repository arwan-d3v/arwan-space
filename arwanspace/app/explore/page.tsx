import GlassPanel from '../components/GlassPanel';
import BackgroundParallax from '../components/BackgroundParallax';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard, Wrench, Code2, LineChart } from 'lucide-react';

const hostedApps = [
  { id: 1, name: "FinDash Pro", desc: "Real-time financial dashboard.", url: "#" },
  { id: 2, name: "TaskMaster", desc: "Collaborative project management.", url: "#" }
];

const freeTools = [
  { id: 1, name: "CV Builder", desc: "Generate aesthetic resumes.", url: "#", upcoming: true },
  { id: 2, name: "CSS Glass Generator", desc: "Visual tool for glassmorphism.", url: "#" }
];

const showcase = [
  { id: 1, name: "Next.js App Router Setup", desc: "Boilerplate for enterprise apps.", stars: 120 },
  { id: 2, name: "React Three Fiber Demo", desc: "3D web experiences.", stars: 85 }
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen relative p-4 md:p-12">
      <BackgroundParallax />

      <main className="max-w-6xl mx-auto relative z-10 space-y-12 pb-20 pt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Arwan&apos;s Ecosystem</h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Explore my hosted applications, open-source projects, and free tools available to the public.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-2.5 bg-white/40 hover:bg-white/60 border border-white/50 text-gray-800 font-medium rounded-full shadow-sm transition-all"
            >
              Resume
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-full shadow-sm transition-all flex items-center gap-2"
            >
              Member Login <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Hosted Apps */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#7ec8e3]/20 text-[#7ec8e3] rounded-lg"><LayoutDashboard size={24} /></div>
            <h2 className="text-2xl font-bold text-gray-800">Hosted Applications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostedApps.map(app => (
              <GlassPanel key={app.id} className="p-6 flex flex-col group hover:-translate-y-1 transition-transform">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#7ec8e3] transition-colors">{app.name}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{app.desc}</p>
                <a href={app.url} className="text-sm font-semibold text-gray-800 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  Launch App <ArrowRight size={14} />
                </a>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Free Tools */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#f7a072]/20 text-[#f7a072] rounded-lg"><Wrench size={24} /></div>
            <h2 className="text-2xl font-bold text-gray-800">Free Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTools.map(tool => (
              <GlassPanel key={tool.id} className="p-6 flex flex-col relative overflow-hidden group">
                {tool.upcoming && (
                  <div className="absolute -right-8 top-4 bg-gray-800 text-white text-xs font-bold px-8 py-1 rotate-45 shadow-sm">
                    COMING SOON
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{tool.desc}</p>
                <a href={tool.url} className={`text-sm font-semibold flex items-center gap-1 ${tool.upcoming ? 'text-gray-400 pointer-events-none' : 'text-[#f7a072] hover:gap-2 transition-all'}`}>
                  {tool.upcoming ? 'In Development' : 'Use Tool'} <ArrowRight size={14} />
                </a>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Showcase & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-200 text-gray-600 rounded-lg"><Code2 size={24} /></div>
              <h2 className="text-2xl font-bold text-gray-800">Open Source Showcase</h2>
            </div>
            <div className="space-y-4">
              {showcase.map(item => (
                <GlassPanel key={item.id} className="p-5 flex justify-between items-center group">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                    <span className="text-sm font-bold">{item.stars}</span>
                    <span className="text-xs">★</span>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><LineChart size={24} /></div>
              <h2 className="text-2xl font-bold text-gray-800">Platform Stats</h2>
            </div>
            <GlassPanel className="p-8 h-[calc(100%-3rem)] flex flex-col justify-center gap-8">
              <div className="flex justify-between items-center border-b border-white/40 pb-4">
                <span className="text-gray-600 font-medium">Total Projects Deployed</span>
                <span className="text-3xl font-bold text-gray-800">24</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/40 pb-4">
                <span className="text-gray-600 font-medium">Lines of Code</span>
                <span className="text-3xl font-bold text-gray-800">~150k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Coffee Cups Consumed</span>
                <span className="text-3xl font-bold text-gray-800">∞</span>
              </div>
            </GlassPanel>
          </section>
        </div>
      </main>
    </div>
  );
}
