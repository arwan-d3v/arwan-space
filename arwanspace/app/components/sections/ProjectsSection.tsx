'use client';

import { useState } from 'react';
import GlassPanel from '../GlassPanel';
import { type Project } from '@/types/resume';
import { ExternalLink, PlaySquare, ImageIcon } from 'lucide-react';
import ProjectModal from '../ProjectModal';

export default function ProjectsSection({ projects, title, id }: { projects: Project[], title: string, id: string }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!projects || projects.length === 0) return null;

  return (
    <section id={id} className="reveal scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-100 mb-8 pl-4 border-l-4 border-gray-400">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const displayTitle = project.title || project.name;
          const techStack = project.techStack || project.technologies || [];
          const mediaUrls = project.mediaUrls || (project.imageUrl ? [project.imageUrl] : []);
          const coverImage = mediaUrls.length > 0 ? mediaUrls[0] : null;

          return (
            <GlassPanel
              key={project.id}
              className="flex flex-col h-full overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="relative h-56 overflow-hidden bg-gray-100"
                onClick={() => setSelectedProject(project)}
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={displayTitle}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200">
                    <ImageIcon size={48} className="mb-2 opacity-50" />
                    <span className="text-sm font-medium">No Image Available</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white font-medium px-6 py-2 border border-white/10 rounded-full bg-black/20 backdrop-blur-md">
                    View Details
                  </span>
                </div>

                {/* Indicators */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.embedUrl && (
                    <span className="bg-red-500/80 backdrop-blur text-white p-1.5 rounded-md shadow-sm" title="Video available">
                      <PlaySquare size={16} />
                    </span>
                  )}
                  {mediaUrls.length > 1 && (
                    <span className="bg-black/50 backdrop-blur text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm border border-white/20">
                      1/{mediaUrls.length}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3
                    className="text-xl font-bold text-slate-100 group-hover:text-[#f7a072] transition-colors"
                    onClick={() => setSelectedProject(project)}
                  >
                    {displayTitle}
                  </h3>
                  {(project.liveUrl || project.link) && (
                    <a
                      href={project.liveUrl || project.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-[#7ec8e3] transition-colors p-1"
                      title="Visit live site"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>

                <p
                  className="text-slate-300 text-sm mb-6 flex-grow line-clamp-3"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="text-xs font-medium text-slate-300 bg-white/50 px-2.5 py-1 rounded-md border border-white/40 shadow-sm">
                      {tech}
                    </span>
                  ))}
                  {techStack.length > 4 && (
                    <span className="text-xs font-medium text-gray-500 bg-white/30 px-2.5 py-1 rounded-md">
                      +{techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </GlassPanel>
          );
        })}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
