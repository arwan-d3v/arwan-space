import GlassPanel from '../GlassPanel';
import { type ResumeData } from '@/types/resume';
import { Mail, MapPin } from 'lucide-react';

export default function HeaderSection({ data }: { data: ResumeData }) {
  return (
    <section id="header" className="reveal min-h-[70vh] flex flex-col justify-center items-center text-center">
      <GlassPanel className="p-8 md:p-12 max-w-3xl w-full flex flex-col items-center">
        {data.profile_photo_url ? (
          <img
            src={data.profile_photo_url}
            alt={data.full_name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/50 shadow-xl mb-6"
          />
        ) : (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-blue-300 to-orange-200 border-4 border-white/50 shadow-xl mb-6 flex items-center justify-center text-4xl font-bold text-white">
            {data.full_name.charAt(0)}
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{data.full_name}</h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-6 font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#7ec8e3] to-[#f7a072]">
          {data.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-8">
          {data.social_links?.email && (
            <a href={`mailto:${data.social_links.email}`} className="flex items-center gap-1.5 hover:text-gray-800 transition-colors">
              <Mail size={16} /> {data.social_links.email}
            </a>
          )}
          {data.social_links?.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={16} /> {data.social_links.location}
            </span>
          )}
        </div>

        <p className="text-gray-700 leading-relaxed text-lg max-w-2xl">
          {data.summary}
        </p>
      </GlassPanel>
    </section>
  );
}
