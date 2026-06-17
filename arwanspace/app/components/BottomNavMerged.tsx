'use client';

import { useEffect, useState } from 'react';
import GlassPanel from './GlassPanel';
import { User, Briefcase, GraduationCap, Code, Heart, Link as LinkIcon } from 'lucide-react';

interface Section {
  id: string;
  label: string;
}

interface BottomNavMergedProps {
  sections: Section[];
}

export default function BottomNavMerged({ sections }: BottomNavMergedProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // Show when scrolled past 85%
      setIsVisible(scrollPercentage > 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Map icon to section id roughly
  const getIcon = (id: string) => {
    switch (id) {
      case 'header': return <User size={18} />;
      case 'experience': return <Briefcase size={18} />;
      case 'education': return <GraduationCap size={18} />;
      case 'projects': return <Code size={18} />;
      case 'hobbies': return <Heart size={18} />;
      case 'social': return <LinkIcon size={18} />;
      default: return <div className="w-2 h-2 rounded-full bg-current" />;
    }
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <GlassPanel className="flex items-center gap-2 px-6 py-3 !rounded-full">
        {sections.slice(0, 5).map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="p-2.5 rounded-full hover:bg-white/5 transition-colors text-slate-200 hover:text-white group relative"
            title={section.label}
          >
            {getIcon(section.id)}
            {/* Tooltip for mobile / when hovered without names */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {section.label}
            </span>
          </button>
        ))}
      </GlassPanel>
    </div>
  );
}
