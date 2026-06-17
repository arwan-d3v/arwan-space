'use client';

import { type ServiceTemplate } from '@/types/services';
import GlassPanel from '@/app/components/GlassPanel';
import { ExternalLink, Hourglass } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="col-span-full">
      <GlassPanel className="p-12 flex flex-col items-center justify-center text-center bg-white/5 border-white/10">
        <div className="w-16 h-16 bg-gray-200/50 rounded-full flex items-center justify-center mb-4 text-gray-500">
          <Hourglass size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Coming Soon</h3>
        <p className="text-gray-500 max-w-sm">
          We are currently working on exciting templates and services for this category. Check back later!
        </p>
      </GlassPanel>
    </div>
  );
}

export default function ServiceGrid({ items }: { items: ServiceTemplate[] }) {
  if (!items || items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <GlassPanel key={item.id} className="flex flex-col overflow-hidden group hover:-translate-y-1 transition-all duration-300">
          <div className="relative h-48 overflow-hidden bg-gray-100">
            {item.thumbnail_url ? (
              <img
                src={item.thumbnail_url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-medium">
                No Preview
              </div>
            )}
            {item.price && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                {item.price}
              </div>
            )}
            {item.is_template && (
              <div className="absolute top-3 left-3 bg-[#7ec8e3]/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                Template
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {item.tech_stack?.slice(0, 3).map(tech => (
                <span key={tech} className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 bg-white/40 px-2 py-1 rounded-md border border-white/50">
                  {tech}
                </span>
              ))}
            </div>

            {item.demo_url ? (
              <a
                href={item.demo_url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Lihat Demo <ExternalLink size={16} />
              </a>
            ) : (
              <button
                disabled
                className="w-full py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed"
              >
                Demo Not Available
              </button>
            )}
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
