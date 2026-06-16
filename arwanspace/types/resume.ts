export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Skill {
  id: string;
  category: string;
  items: { name: string; level: number }[];
}

export interface License {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Reference {
  id: string;
  name: string;
  role: string;
  company: string;
  contact: string;
}

export interface Project {
  id: string;
  name: string;           // Keeping name for backward compatibility with older DBs if any, but mapping to title
  title?: string;
  description: string;
  technologies?: string[];// Keeping for backward compatibility
  techStack?: string[];
  imageUrl?: string;      // Keeping for backward compatibility
  mediaUrls?: string[];
  embedUrl?: string;
  link?: string;          // Keeping for backward compatibility
  liveUrl?: string;
  repoUrl?: string;
}

export interface ResumeData {
  id: string;
  profile_photo_url: string | null;
  full_name: string;
  title: string | null;
  summary: string | null;
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  skills: Skill[];
  licenses: License[];
  references_json: Reference[];
  real_projects: Project[];
  current_projects: Project[];
  hobbies: string[];
  social_links: Record<string, string>;
  updated_at: string;
}
