import GlassPanel from '../GlassPanel';
import { type Education } from '@/types/resume';

export default function EducationSection({ education }: { education: Education[] }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-100 mb-8 pl-4 border-l-4 border-[#f7a072]">Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => (
          <GlassPanel key={edu.id} className="p-6">
            <h3 className="text-xl font-bold text-slate-100 mb-1">{edu.degree}</h3>
            <h4 className="text-[#7ec8e3] font-medium mb-3">{edu.institution}</h4>
            <div className="text-sm text-gray-500 mb-4 bg-white/30 inline-block px-3 py-1 rounded-full">
              {edu.startDate} - {edu.endDate}
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              {edu.description}
            </p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
