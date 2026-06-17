'use client';

import { useState } from 'react';
import { type ServiceCategory, type ServiceTemplate, type LiveProject, type Testimonial } from '@/types/services';
import BackgroundParallax from '@/app/components/BackgroundParallax';
import GlassPanel from '@/app/components/GlassPanel';
import CategoryNav from './CategoryNav';
import ServiceGrid from './ServiceGrid';
import TestimonialsCarousel from './TestimonialsCarousel';
import AIChatPanel from './AIChatPanel';
import HybridBooking from './HybridBooking';

interface ServicesClientProps {
  templates: ServiceTemplate[];
  liveProjects: LiveProject[];
  testimonials: Testimonial[];
}

const CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'Semua Layanan' },
  { id: 'web-design', label: 'Web Design' },
  { id: 'invitation', label: 'Online Invitation' },
  { id: 'portfolio', label: 'Personal Portfolio' },
  { id: 'saas-umkm', label: 'SaaS UMKM' },
  { id: 'education', label: 'Aplikasi Edukasi' },
  { id: 'finance', label: 'Aplikasi Keuangan' },
  { id: 'home-tools', label: 'Home Tools' },
  { id: 'consultation', label: 'Konsultasi' },
];

export default function ServicesClient({ templates, liveProjects, testimonials }: ServicesClientProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  // Filter templates
  const filteredTemplates = activeCategory === 'all'
    ? templates
    : templates.filter(t => t.category === activeCategory);

  // You can also filter liveProjects here if you display them separately
  // const filteredLiveProjects = activeCategory === 'all'
  //  ? liveProjects
  //  : liveProjects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen relative p-4 md:p-8 overflow-hidden">
      <BackgroundParallax />

      <main className="max-w-7xl mx-auto relative z-10 space-y-16 pb-20 pt-8">

        {/* Hero Section */}
        <section className="text-center">
          <GlassPanel className="p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">Layanan & Solusi Digital</h1>
            <p className="text-xl text-slate-300">Dari template siap pakai hingga aplikasi kustom untuk bisnis Anda.</p>
          </GlassPanel>
        </section>

        {/* Category Navigation */}
        <CategoryNav
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Grid Templates / Services */}
        <section className="min-h-[400px]">
          <ServiceGrid items={filteredTemplates} />
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="pt-8">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 pl-4 border-l-4 border-yellow-400">Apa Kata Klien Kami</h2>
            <TestimonialsCarousel testimonials={testimonials} />
          </section>
        )}

        {/* AI & Booking Section */}
        <section className="pt-16 pb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Hubungi Kami</h2>
            <p className="text-slate-300">Tanya AI Companion kami atau jadwalkan sesi konsultasi langsung.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: AI Companion */}
            <AIChatPanel />

            {/* Right: Hybrid Booking */}
            <HybridBooking />
          </div>
        </section>

      </main>
    </div>
  );
}
