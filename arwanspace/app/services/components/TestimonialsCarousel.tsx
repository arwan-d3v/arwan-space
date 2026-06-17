'use client';

import { type Testimonial } from '@/types/services';
import GlassPanel from '@/app/components/GlassPanel';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((t) => (
        <GlassPanel key={t.id} className="p-6 relative">
          <Quote size={40} className="absolute top-4 right-4 text-gray-300 opacity-50" />

          <div className="flex items-center gap-4 mb-4">
            {t.client_photo_url ? (
              <img
                src={t.client_photo_url}
                alt={t.client_name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/50"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7ec8e3] to-[#f7a072] flex items-center justify-center text-white font-bold text-xl border-2 border-white/50">
                {t.client_name.charAt(0)}
              </div>
            )}

            <div>
              <h4 className="text-gray-800 font-bold">{t.client_name}</h4>
              {t.client_company && <p className="text-sm text-gray-500">{t.client_company}</p>}
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-700 italic leading-relaxed">
            &quot;{t.quote}&quot;
          </p>
        </GlassPanel>
      ))}
    </div>
  );
}
