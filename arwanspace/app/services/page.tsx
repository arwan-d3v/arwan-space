import { createClient } from '@/lib/supabase/server';
import ServicesClient from './components/ServicesClient';
import { type ServiceTemplate, type LiveProject, type Testimonial } from '@/types/services';

// Dummy data for fallback and testing empty states
const dummyTemplates: ServiceTemplate[] = [
  {
    id: "tpl-1",
    category: "web-design",
    title: "Corporate Pro Web",
    description: "Template website company profile elegan dengan performa tinggi. Cocok untuk agensi, konsultan, dan startup.",
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tech_stack: ["Next.js", "TailwindCSS", "Framer Motion"],
    demo_url: "https://example.com/demo1",
    price: "Rp 1.500.000",
    is_template: true,
    is_active: true,
    sort_order: 1
  },
  {
    id: "tpl-2",
    category: "invitation",
    title: "Elegant Wedding",
    description: "Undangan digital interaktif dengan fitur RSVP, integrasi Google Maps, dan buku tamu real-time.",
    thumbnail_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    tech_stack: ["React", "CSS Glassmorphism", "Supabase"],
    demo_url: "https://example.com/demo2",
    price: "Rp 500.000",
    is_template: true,
    is_active: true,
    sort_order: 2
  },
  {
    id: "tpl-3",
    category: "portfolio",
    title: "DevFolio Max",
    description: "Template portfolio khusus developer dengan integrasi GitHub, blog MDX, dan animasi page transitions.",
    thumbnail_url: "https://images.unsplash.com/photo-1555066931436-c73854d05580?w=800&q=80",
    tech_stack: ["Next.js", "MDX", "Vercel"],
    demo_url: "https://example.com/demo3",
    price: "Free",
    is_template: true,
    is_active: true,
    sort_order: 3
  },
  {
    id: "tpl-4",
    category: "saas-umkm",
    title: "KasirLite POS",
    description: "Aplikasi Point of Sales ringan berbasis web untuk UMKM. Mendukung laporan harian dan manajemen stok.",
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    tech_stack: ["Vue.js", "Firebase", "PWA"],
    price: "Custom",
    is_template: false,
    is_active: true,
    sort_order: 4
  }
  // Notice we purposely left some categories empty (like 'education', 'finance') to test EmptyState
];

const dummyLiveProjects: LiveProject[] = [];

const dummyTestimonials: Testimonial[] = [
  {
    id: "test-1",
    client_name: "Budi Santoso",
    client_company: "PT Maju Terus",
    client_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    quote: "Pengerjaan website sangat cepat dan hasilnya melebihi ekspektasi. Desain glassmorphism-nya membuat brand kami terlihat premium.",
    rating: 5
  },
  {
    id: "test-2",
    client_name: "Sarah Wijaya",
    client_company: "Wedding Organizer",
    quote: "Template undangan digitalnya sangat mudah dikustomisasi dan responsif di semua perangkat tamu kami.",
    rating: 5
  }
];

export default async function ServicesPage() {
  const supabase = await createClient();

  let templates = dummyTemplates;
  const liveProjects = dummyLiveProjects;
  let testimonials = dummyTestimonials;

  try {
    const { data: dbTemplates, error: tplErr } = await supabase
      .from('service_templates')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (dbTemplates && dbTemplates.length > 0 && !tplErr) {
      templates = dbTemplates as ServiceTemplate[];
    }

    const { data: dbTestimonials, error: testErr } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true);

    if (dbTestimonials && dbTestimonials.length > 0 && !testErr) {
      testimonials = dbTestimonials as Testimonial[];
    }

    // Similarly fetch liveProjects if needed for another section later

  } catch (e) {
    console.warn("Failed to fetch from Supabase, using dummy data:", e);
  }

  return <ServicesClient templates={templates} liveProjects={liveProjects} testimonials={testimonials} />;
}
