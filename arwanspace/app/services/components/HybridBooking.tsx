'use client';

import { useState } from 'react';
import GlassPanel from '@/app/components/GlassPanel';
import { Calendar, MessageSquare, X, Loader2 } from 'lucide-react';

export default function HybridBooking() {
  const [activeView, setActiveView] = useState<'selection' | 'calendly' | 'manual'>('selection');

  // Manual Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com';

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, source: 'form' })
      });
      setStatus('success');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <GlassPanel className="p-8 h-full flex flex-col justify-center items-center min-h-[400px]">

      {activeView === 'selection' && (
        <div className="text-center space-y-6 w-full max-w-sm">
          <div className="w-16 h-16 bg-gradient-to-br from-[#b7e1fa] to-[#f7a072] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
            <Calendar size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-100">Mari Berdiskusi</h3>
          <p className="text-slate-300 text-sm mb-8">Pilih cara yang paling nyaman untuk menghubungi kami.</p>

          <button
            onClick={() => setActiveView('calendly')}
            className="w-full py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-xl shadow-lg transition flex items-center justify-center gap-3 font-semibold"
          >
            <Calendar size={20} /> Booking via Calendly
          </button>

          <button
            onClick={() => setActiveView('manual')}
            className="w-full py-4 bg-white/10 hover:bg-white/5 border border-white/20 text-slate-100 rounded-xl shadow-sm transition flex items-center justify-center gap-3 font-semibold backdrop-blur"
          >
            <MessageSquare size={20} /> Isi Form Manual
          </button>
        </div>
      )}

      {activeView === 'calendly' && (
        <div className="w-full h-full flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-100">Jadwalkan Pertemuan</h3>
            <button onClick={() => setActiveView('selection')} className="p-2 hover:bg-white/5 rounded-full transition">
              <X size={20} className="text-slate-300" />
            </button>
          </div>
          <div className="flex-grow rounded-xl overflow-hidden bg-white">
            <iframe
              src={`${calendlyUrl}?hide_gdpr_banner=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              className="min-h-[500px]"
            />
          </div>
        </div>
      )}

      {activeView === 'manual' && (
        <div className="w-full max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-100">Form Kontak</h3>
            <button onClick={() => setActiveView('selection')} className="p-2 hover:bg-white/5 rounded-full transition">
              <X size={20} className="text-slate-300" />
            </button>
          </div>

          {status === 'success' ? (
            <div className="bg-green-100/80 border border-green-200 p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">✓</div>
              <h4 className="font-bold text-green-800 mb-2">Pesan Terkirim!</h4>
              <p className="text-green-700 text-sm mb-6">Kami akan segera merespons pesan Anda via email.</p>
              <button onClick={() => setStatus('idle')} className="text-sm font-medium text-green-800 underline">Kirim pesan lain</button>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] backdrop-blur"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Email</label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] backdrop-blur"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Pesan / Kebutuhan</label>
                <textarea
                  required rows={4} value={message} onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] backdrop-blur resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm">Gagal mengirim pesan. Silakan coba lagi nanti.</p>
              )}

              <button
                type="submit" disabled={status === 'loading'}
                className="w-full py-3 bg-[#7ec8e3] hover:bg-[#6ab8d3] text-white font-bold rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 'Kirim Sekarang'}
              </button>
            </form>
          )}
        </div>
      )}

    </GlassPanel>
  );
}
