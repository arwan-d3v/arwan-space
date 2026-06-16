import GlassPanel from '../GlassPanel';
import { type Project } from '@/types/resume';
import { ExternalLink } from 'lucide-react';

export default function ProjectsSection({ projects, title, id }: { projects: Project[], title: string, id: string }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id={id} className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 pl-4 border-l-4 border-gray-400">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <GlassPanel key={project.id} className="flex flex-col h-full overflow-hidden group">
            {project.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#f7a072] transition-colors">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
              <p className="text-gray-700 text-sm mb-6 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs font-medium text-gray-600 bg-white/50 px-2 py-1 rounded-md border border-white/40">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
