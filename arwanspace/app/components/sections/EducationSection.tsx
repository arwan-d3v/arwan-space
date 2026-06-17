import GlassPanel from '../GlassPanel';
import { type Education } from '@/types/resume';

export default function EducationSection({ education }: { education: Education[] }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-teal-400">Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => (
          <GlassPanel key={edu.id} className="p-6">
            <div className="clay-card p-6 h-full">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{edu.degree}</h3>
              <h4 className="text-teal-600 font-medium mb-3">{edu.institution}</h4>
              <div className="text-sm text-slate-600 mb-4 clay-button inline-block">
                {edu.startDate} - {edu.endDate}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {edu.description}
              </p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
