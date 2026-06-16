'use client';

import GlassPanel from '../GlassPanel';
import { type Skill } from '@/types/resume';

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 pl-4 border-l-4 border-[#b7e1fa]">Skills & Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillGroup) => (
          <GlassPanel key={skillGroup.id} className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider text-sm">{skillGroup.category}</h3>
            <div className="space-y-5">
              {skillGroup.items.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1.5 font-medium text-gray-700">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, #7ec8e3 0%, #f7a072 100%)'
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
