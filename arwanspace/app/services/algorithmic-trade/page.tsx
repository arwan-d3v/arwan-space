'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BackgroundParallax from '@/app/components/BackgroundParallax';
import GlassPanel from '@/app/components/GlassPanel';
import LiquidNavbar from '@/app/components/LiquidNavbar';
import { Activity, ArrowRight, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export default function AlgorithmicTradeLanding() {
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreviewSignals() {
      try {
        const res = await fetch('/api/trading/signals?limit=5');
        const data = await res.json();
        if (Array.isArray(data)) setSignals(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPreviewSignals();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 text-slate-800">
      <BackgroundParallax />
      <LiquidNavbar />

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-20">

        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-in-up">
          <GlassPanel className="p-12 max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Activity size={40} />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-6 drop-shadow-sm">
              Algorithmic Trade
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
              Sinyal trading otomatis, analisa pasar real-time, dan eksekusi presisi tinggi.
              Tingkatkan akurasi portofolio Anda dengan AI dan machine learning.
            </p>
            <Link
              href="/dashboard/trading"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-full transition-all flex items-center gap-2 group"
            >
              Coba Sekarang <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </GlassPanel>
        </section>

        {/* Features (Claymorphism) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="clay-card p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Real-Time Signals</h3>
            <p className="text-slate-600">
              Terima notifikasi sinyal beli/jual secara instan langsung dari algoritma.
            </p>
          </div>
          <div className="clay-card p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">High Accuracy</h3>
            <p className="text-slate-600">
              Analisa berbasis data historis dan indikator teknikal lanjutan dengan AI.
            </p>
          </div>
          <div className="clay-card p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">MT5 Integration</h3>
            <p className="text-slate-600">
              Terhubung langsung ke terminal MetaTrader 5 untuk eksekusi otomatis.
            </p>
          </div>
        </section>

        {/* Live Preview Signals */}
        <section className="space-y-8">
           <div className="text-center">
             <h2 className="text-3xl font-bold text-slate-800 mb-4">Live Preview Signals</h2>
             <p className="text-slate-600">Beberapa sinyal terakhir yang terdeteksi oleh sistem kami.</p>
           </div>

           <GlassPanel className="p-8">
             {loading ? (
               <div className="animate-pulse flex space-x-4">
                 <div className="flex-1 space-y-4 py-1">
                   <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                   <div className="space-y-2">
                     <div className="h-4 bg-slate-200 rounded"></div>
                     <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                   </div>
                 </div>
               </div>
             ) : signals.length > 0 ? (
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-slate-200">
                       <th className="py-4 font-semibold text-slate-700">Pair</th>
                       <th className="py-4 font-semibold text-slate-700">Signal</th>
                       <th className="py-4 font-semibold text-slate-700">Price</th>
                       <th className="py-4 font-semibold text-slate-700">Confidence</th>
                       <th className="py-4 font-semibold text-slate-700">Time</th>
                     </tr>
                   </thead>
                   <tbody>
                     {signals.map((sig) => (
                       <tr key={sig.id} className="border-b border-slate-100 last:border-0 hover:bg-white/50 transition-colors">
                         <td className="py-4 font-medium text-slate-800">{sig.pair}</td>
                         <td className="py-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                             sig.signal_type === 'buy' ? 'bg-green-100 text-green-700' :
                             sig.signal_type === 'sell' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                           }`}>
                             {sig.signal_type}
                           </span>
                         </td>
                         <td className="py-4 text-slate-600">{sig.price}</td>
                         <td className="py-4 text-slate-600">{(sig.confidence * 100).toFixed(0)}%</td>
                         <td className="py-4 text-slate-500 text-sm">{new Date(sig.timestamp).toLocaleTimeString()}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             ) : (
               <div className="text-center text-slate-500 py-8">Belum ada sinyal terbaru.</div>
             )}

             <div className="mt-8 text-center">
                <Link href="/login?redirect=/dashboard/trading" className="text-blue-600 font-semibold hover:underline">
                  Login to see full details and history &rarr;
                </Link>
             </div>
           </GlassPanel>
        </section>

      </main>
    </div>
  );
}
