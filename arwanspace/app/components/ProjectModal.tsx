'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github as GithubIcon } from 'lucide-react';
import { type Project } from '@/types/resume';
import GlassPanel from './GlassPanel';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Reset index when project changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setCurrentMediaIndex(0), 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, project]);

  if (!project) return null;

  const title = project.title || project.name;
  const techStack = project.techStack || project.technologies || [];
  const liveUrl = project.liveUrl || project.link;
  const mediaUrls = project.mediaUrls || (project.imageUrl ? [project.imageUrl] : []);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaUrls.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] flex flex-col"
          >
            <GlassPanel className="flex flex-col h-full bg-white/10 overflow-hidden border-white/20">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Scrollable Area */}
              <div className="overflow-y-auto flex-grow p-4 md:p-6 custom-scrollbar">
                {/* Media Section */}
                <div className="mb-8 rounded-xl overflow-hidden bg-black/40 aspect-video relative flex items-center justify-center shadow-2xl border border-white/5">
                  {project.embedUrl ? (
                    <iframe
                      src={project.embedUrl}
                      title={title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : mediaUrls.length > 0 ? (
                    <>
                      {/* Assuming image for now, logic can be expanded to check video extension */}
                      <img
                        src={mediaUrls[currentMediaIndex]}
                        alt={`${title} screenshot ${currentMediaIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />

                      {mediaUrls.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
                          >
                            <ChevronRight size={24} />
                          </button>

                          {/* Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {mediaUrls.map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentMediaIndex ? 'bg-white scale-125' : 'bg-white/10'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-white/50 flex items-center justify-center h-full w-full">
                      No media available
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white/90 mb-2">About Project</h4>
                      <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Tech Stack */}
                    {techStack.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white/90 mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {techStack.map(tech => (
                            <span key={tech} className="text-xs font-medium text-white/80 bg-white/10 px-3 py-1.5 rounded-md border border-white/10">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    {(liveUrl || project.repoUrl) && (
                      <div>
                        <h4 className="text-lg font-semibold text-white/90 mb-3">Links</h4>
                        <div className="flex flex-col gap-3">
                          {liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-[#7ec8e3]/20 hover:bg-[#7ec8e3]/40 border border-[#7ec8e3]/30 text-white rounded-lg transition-colors"
                            >
                              <ExternalLink size={18} />
                              <span>Live Preview</span>
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/5 border border-white/20 text-white rounded-lg transition-colors"
                            >
                              <GithubIcon size={18} />
                              <span>Source Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
