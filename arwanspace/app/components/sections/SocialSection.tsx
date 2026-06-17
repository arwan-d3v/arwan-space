import GlassPanel from '../GlassPanel';
import { Github, Linkedin, Twitter, Globe, Instagram, Youtube } from 'lucide-react';

export default function SocialSection({ links }: { links: Record<string, string> }) {
  if (!links || Object.keys(links).length === 0) return null;

  const getIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'github': return <Github size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'twitter': return <Twitter size={24} />;
      case 'instagram': return <Instagram size={24} />;
      case 'youtube': return <Youtube size={24} />;
      default: return <Globe size={24} />;
    }
  };

  return (
    <section id="social" className="reveal scroll-mt-24 pb-20">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-gray-400">Connect With Me</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {Object.entries(links).map(([key, url]) => {
          if (key === 'email' || key === 'location') return null; // handled in header
          return (
            <a key={key} href={url} target="_blank" rel="noreferrer" className="group">
              <div className="clay-button !p-0 w-16 h-16 rounded-full flex items-center justify-center text-slate-600 group-hover:text-blue-600 transition-all duration-300">
                {getIcon(key)}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
