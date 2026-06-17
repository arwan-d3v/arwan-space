import GlassPanel from '../GlassPanel';
import { type Experience } from '@/types/resume';

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-100 mb-8 pl-4 border-l-4 border-[#7ec8e3]">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <GlassPanel key={exp.id} className="p-6 md:p-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#7ec8e3] to-[#f7a072] opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                <h4 className="text-lg text-[#f7a072] font-medium">{exp.company}</h4>
              </div>
              <span className="text-sm font-medium text-gray-500 bg-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>

            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-200">
              {exp.description.map((desc, i) => (
                <li key={i} className="pl-1">{desc}</li>
              ))}
            </ul>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
