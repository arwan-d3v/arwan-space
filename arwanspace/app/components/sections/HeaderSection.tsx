import GlassPanel from '../GlassPanel';
import { type ResumeData } from '@/types/resume';
import { Mail, MapPin } from 'lucide-react';

export default function HeaderSection({ data }: { data: ResumeData }) {
  return (
    <section id="header" className="reveal min-h-[70vh] flex flex-col justify-center items-center text-center">
      <GlassPanel className="p-8 md:p-12 max-w-3xl w-full flex flex-col items-center">
        <div className="clay-card rounded-full p-2 mb-6 inline-block">
          {data.profile_photo_url ? (
            <img
              src={data.profile_photo_url}
              alt={data.full_name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/40 shadow-inner"
            />
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-400 to-teal-300 border-4 border-white/40 shadow-inner flex items-center justify-center text-4xl font-bold text-white">
              {data.full_name.charAt(0)}
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">{data.full_name}</h1>
        <h2 className="text-xl md:text-2xl mb-6 font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          {data.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-8">
          {data.social_links?.email && (
            <a href={`mailto:${data.social_links.email}`} className="flex items-center gap-1.5 clay-button !py-1.5">
              <Mail size={16} /> {data.social_links.email}
            </a>
          )}
          {data.social_links?.location && (
            <span className="flex items-center gap-1.5 clay-button !py-1.5">
              <MapPin size={16} /> {data.social_links.location}
            </span>
          )}
        </div>

        <p className="text-slate-700 leading-relaxed text-lg max-w-2xl">
          {data.summary}
        </p>
      </GlassPanel>
    </section>
  );
}
