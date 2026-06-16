import { createClient } from '@/lib/supabase/server';
import ResumeClient from './components/ResumeClient';
import { ResumeData } from '@/types/resume';

// Dummy data fallback
const dummyResume: ResumeData = {
  id: "dummy-1",
  profile_photo_url: "",
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
        { name: "AWS / Vercel", level: 75 },
      ]
    }
  ],
  licenses: [],
  references_json: [],
  real_projects: [
    {
      id: "proj-1",
      name: "GlassUI Framework",
      description: "A comprehensive open-source CSS framework dedicated exclusively to glassmorphism design principles.",
      technologies: ["CSS", "React", "TypeScript"],
      imageUrl: "", // Left blank for dummy
      link: "https://github.com"
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
