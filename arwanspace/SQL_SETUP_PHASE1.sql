-- ==========================================
-- SUPABASE SQL SCRIPT - Create Resume Table
-- ==========================================
-- Jalankan script ini di Supabase SQL Editor
-- Navigation: SQL Editor → New Query → Paste script ini → Run

CREATE TABLE resume (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_photo_url TEXT,
  full_name TEXT NOT NULL,
  title TEXT,
  summary TEXT,
  experience JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  certificates JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  licenses JSONB DEFAULT '[]'::jsonb,
  references_json JSONB DEFAULT '[]'::jsonb,
  real_projects JSONB DEFAULT '[]'::jsonb,
  current_projects JSONB DEFAULT '[]'::jsonb,
  hobbies JSONB DEFAULT '[]'::jsonb,
  social_links JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Insert Sample Data
-- ==========================================
-- Run this AFTER creating the table above

INSERT INTO resume (
  profile_photo_url,
  full_name,
  title,
  summary,
  experience,
  education,
  skills,
  real_projects,
  hobbies,
  social_links
) VALUES (
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'Arwan',
  'Fullstack Developer & UI/UX Enthusiast',
  'Passionate about creating beautiful, functional, and user-centric digital experiences. Bridging the gap between design and engineering.',
  '[
    {
      "id": "exp-1",
      "company": "Tech Solutions Inc.",
      "role": "Senior Frontend Engineer",
      "startDate": "Jan 2021",
      "endDate": "Present",
      "description": [
        "Led the migration of legacy architecture to Next.js App Router.",
        "Improved Core Web Vitals by 40% through code splitting and lazy loading.",
        "Mentored junior developers and established CI/CD pipelines."
      ]
    }
  ]'::jsonb,
  '[
    {
      "id": "edu-1",
      "institution": "University of Technology",
      "degree": "B.S. Computer Science",
      "startDate": "2016",
      "endDate": "2020",
      "description": "Graduated with Honors. Focused on Human-Computer Interaction and Distributed Systems."
    }
  ]'::jsonb,
  '[
    {
      "id": "skill-1",
      "category": "Frontend",
      "items": [
        { "name": "React / Next.js", "level": 95 },
        { "name": "TypeScript", "level": 90 },
        { "name": "Tailwind CSS", "level": 95 }
      ]
    },
    {
      "id": "skill-2",
      "category": "Backend & Cloud",
      "items": [
        { "name": "Node.js", "level": 85 },
        { "name": "Supabase / PostgreSQL", "level": 80 },
        { "name": "AWS / Cloudflare R2", "level": 75 }
      ]
    }
  ]'::jsonb,
  '[
    {
      "id": "proj-1",
      "name": "GlassUI Framework",
      "title": "GlassUI Framework",
      "description": "A comprehensive open-source CSS framework dedicated exclusively to glassmorphism design principles.",
      "technologies": ["CSS", "React", "TypeScript", "Framer Motion"],
      "techStack": ["CSS", "React", "TypeScript", "Framer Motion"],
      "imageUrl": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
      "mediaUrls": [
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931436-c73854d05580?w=800&q=80"
      ],
      "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "link": "https://glassui.example.com",
      "liveUrl": "https://glassui.example.com",
      "repoUrl": "https://github.com/example/glassui"
    },
    {
      "id": "proj-2",
      "name": "FinDash Pro",
      "title": "FinDash Pro",
      "description": "A real-time financial dashboard displaying cryptocurrency markets and portfolio tracking.",
      "techStack": ["Next.js", "Tailwind CSS", "Recharts", "Supabase"],
      "mediaUrls": [
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
      ],
      "liveUrl": "https://findash.example.com"
    }
  ]'::jsonb,
  '["Photography", "Mechanical Keyboards", "Mountain Biking", "Open Source"]'::jsonb,
  '{
    "email": "hello@arwanspace.com",
    "location": "Jakarta, Indonesia",
    "github": "https://github.com",
    "linkedin": "https://linkedin.com",
    "twitter": "https://twitter.com"
  }'::jsonb
);
