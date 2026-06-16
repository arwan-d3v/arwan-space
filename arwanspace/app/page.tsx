import { createClient } from '@/lib/supabase/server';
import ResumeClient from './components/ResumeClient';
import { ResumeData } from '@/types/resume';

// Dummy data fallback
const dummyResume: ResumeData = {
  id: "dummy-1",
  profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", // Public placeholder
  full_name: "Arwan",
  title: "Fullstack Developer & UI/UX Enthusiast",
  summary: "Passionate about creating beautiful, functional, and user-centric digital experiences. Bridging the gap between design and engineering.",
  experience: [
    {
      id: "exp-1",
      company: "Tech Solutions Inc.",
      role: "Senior Frontend Engineer",
      startDate: "Jan 2021",
      endDate: "Present",
      description: [
        "Led the migration of legacy architecture to Next.js App Router.",
        "Improved Core Web Vitals by 40% through code splitting and lazy loading.",
        "Mentored junior developers and established CI/CD pipelines."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of Technology",
      degree: "B.S. Computer Science",
      startDate: "2016",
      endDate: "2020",
      description: "Graduated with Honors. Focused on Human-Computer Interaction and Distributed Systems."
    }
  ],
  certificates: [],
  skills: [
    {
      id: "skill-1",
      category: "Frontend",
      items: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
      ]
    },
    {
      id: "skill-2",
      category: "Backend & Cloud",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Supabase / PostgreSQL", level: 80 },
        { name: "AWS / Cloudflare R2", level: 75 },
      ]
    }
  ],
  licenses: [],
  references_json: [],
  real_projects: [
    {
      id: "proj-1",
      name: "GlassUI Framework",
      title: "GlassUI Framework",
      description: "A comprehensive open-source CSS framework dedicated exclusively to glassmorphism design principles. Includes pre-built components and utility classes for rapid prototyping.",
      technologies: ["CSS", "React", "TypeScript", "Framer Motion"],
      techStack: ["CSS", "React", "TypeScript", "Framer Motion"],
      imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      mediaUrls: [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931436-c73854d05580?w=800&q=80"
      ],
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder rickroll
      link: "https://glassui.example.com",
      liveUrl: "https://glassui.example.com",
      repoUrl: "https://github.com/example/glassui"
    },
    {
      id: "proj-2",
      name: "FinDash Pro",
      title: "FinDash Pro",
      description: "A real-time financial dashboard displaying cryptocurrency markets, stock indexes, and portfolio tracking with interactive charts and WebSocket integrations.",
      techStack: ["Next.js", "Tailwind CSS", "Recharts", "Supabase"],
      mediaUrls: [
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
      ],
      liveUrl: "https://findash.example.com",
    }
  ],
  current_projects: [],
  hobbies: ["Photography", "Mechanical Keyboards", "Mountain Biking", "Open Source"],
  social_links: {
    email: "hello@arwanspace.com",
    location: "Jakarta, Indonesia",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  },
  updated_at: new Date().toISOString()
};

export default async function Home() {
  const supabase = await createClient();

  let resumeData: ResumeData = dummyResume;

  try {
    const { data, error } = await supabase
      .from('resume')
      .select('*')
      .limit(1)
      .single();

    if (data && !error) {
      resumeData = data as ResumeData;
    } else if (error && error.code !== 'PGRST116') { // Ignore "no rows returned"
        console.warn("Supabase fetch error, using dummy data:", error.message);
    }
  } catch (e) {
      console.warn("Error connecting to Supabase, using dummy data:", e);
  }

  return <ResumeClient resume={resumeData} />;
}
