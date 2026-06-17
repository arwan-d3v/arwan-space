'use client';

import GlassPanel from '../GlassPanel';
import { type Skill } from '@/types/resume';

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-blue-400">Skills & Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillGroup) => (
          <GlassPanel key={skillGroup.id} className="p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm">{skillGroup.category}</h3>
            <div className="grid grid-cols-1 gap-4">
              {skillGroup.items.map((skill) => (
                <div key={skill.name} className="clay-card p-4">
                  <div className="flex justify-between text-sm mb-3 font-semibold text-slate-700">
                    <span>{skill.name}</span>
                    <span className="text-slate-500 font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                      style={{
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, #60a5fa 0%, #2dd4bf 100%)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
