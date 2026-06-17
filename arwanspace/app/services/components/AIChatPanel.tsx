'use client';

import { useState, useRef, useEffect } from 'react';
import GlassPanel from '@/app/components/GlassPanel';
import { Send, Bot, User, Loader2 } from 'lucide-react';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function AIChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Halo! Saya AI Companion Arwan\'space. Ada yang bisa saya bantu terkait layanan kami?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showForm]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await res.json();

      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);

      // Trigger form if keyword matched (simplified logic, ideally AI tool call)
      if (userMsg.toLowerCase().includes('penawaran') || userMsg.toLowerCase().includes('pesan') || data.reply.toLowerCase().includes('form kontak')) {
        setShowForm(true);
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Maaf, terjadi kesalahan koneksi. Silakan coba lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // Summarize chat locally to send
      const chatSummary = messages.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`).join('\n');

      await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          telegram_username: telegram,
          message: `[AI Chat Summary]\n${chatSummary}`,
          source: 'ai-companion'
        })
      });

      setFormStatus('success');
      setTimeout(() => setShowForm(false), 3000);
    } catch (error) {
      console.error(error);
      setFormStatus('idle');
    }
  };

  return (
    <GlassPanel className="flex flex-col h-[600px] overflow-hidden bg-white/10">
      <div className="bg-[#7ec8e3]/20 p-4 border-b border-white/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-[#7ec8e3]">
          <Bot size={24} />
        </div>
        <div>
          <h3 className="font-bold text-slate-100">AI Companion</h3>
          <p className="text-xs text-slate-300">Selalu siap membantu Anda</p>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.role === 'user'
                ? 'bg-gray-800 text-white rounded-tr-sm'
                : 'bg-white/10 text-slate-100 border border-white/10 rounded-tl-sm'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-slate-100 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}

        {showForm && formStatus !== 'success' && (
          <GlassPanel className="p-4 bg-white/30 border-[#f7a072]/30 mt-4">
            <h4 className="text-sm font-bold text-slate-100 mb-2">Silakan isi data untuk mendapatkan penawaran:</h4>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text" required placeholder="Nama Lengkap"
                value={name} onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f7a072]"
              />
              <input
                type="email" required placeholder="Email Address"
                value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f7a072]"
              />
              <input
                type="text" placeholder="Username Telegram (@...)"
                value={telegram} onChange={e => setTelegram(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#f7a072]"
              />
              <button
                type="submit" disabled={formStatus === 'loading'}
                className="w-full py-2 bg-[#f7a072] text-white text-sm font-bold rounded-lg shadow-sm hover:opacity-90 transition disabled:opacity-50 flex justify-center"
              >
                {formStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Kirim Permintaan'}
              </button>
            </form>
          </GlassPanel>
        )}

        {formStatus === 'success' && (
          <div className="flex justify-start">
            <div className="bg-green-100/80 text-green-800 border border-green-200 rounded-2xl px-4 py-2 text-sm">
              Terima kasih! Tim kami akan segera menghubungi Anda.
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/20 bg-white/5">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan apa saja..."
            className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full disabled:opacity-50 hover:bg-gray-700 transition-colors"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </form>
    </GlassPanel>
  );
}
