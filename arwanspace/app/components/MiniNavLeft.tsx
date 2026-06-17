'use client';

import { useEffect, useState } from 'react';
import GlassPanel from './GlassPanel';
import { clsx } from 'clsx';

interface Section {
  id: string;
  label: string;
}

interface MiniNavLeftProps {
  sections: Section[];
}

export default function MiniNavLeft({ sections }: MiniNavLeftProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Add visible class for animation if it exists
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              setActiveSection(section.id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the upper middle
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.set(section.id, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {sections.map((section) => (
        <div
          key={section.id}
          className="group relative flex items-center cursor-pointer"
          onClick={() => scrollTo(section.id)}
        >
          {/* Tooltip */}
          <GlassPanel className="absolute left-8 px-3 py-1.5 opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <span className="text-sm whitespace-nowrap text-slate-100 font-medium">
              {section.label}
            </span>
          </GlassPanel>

          {/* Dot */}
          <div
            className={clsx(
              "rounded-full transition-all duration-300",
              activeSection === section.id
                ? "w-4 h-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            )}
          />
        </div>
      ))}
    </nav>
  );
}
