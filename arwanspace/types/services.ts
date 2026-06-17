export type ServiceCategory =
  | 'web-design'
  | 'invitation'
  | 'portfolio'
  | 'saas-umkm'
  | 'education'
  | 'finance'
  | 'home-tools'
  | 'consultation'
  | 'all'; // Used for frontend filtering

export interface ServiceTemplate {
  id: string;
  category: ServiceCategory;
  title: string;
  description: string;
  thumbnail_url: string;
  tech_stack: string[];
  demo_url?: string;
  price?: string;
  is_template: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface LiveProject {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  thumbnail_url: string;
  live_url?: string;
  repo_url?: string;
  media_urls?: string[];
  is_active: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_photo_url?: string;
  client_company?: string;
  quote: string;
  rating: number; // 1 to 5
  project_id?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  telegram_username?: string;
  message: string;
  source: 'form' | 'ai-companion';
  is_read?: boolean;
}
