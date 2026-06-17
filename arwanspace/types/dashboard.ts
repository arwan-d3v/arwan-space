export type UserRole = 'public' | 'student' | 'pro' | 'company' | 'superadmin';

export interface Profile {
  id: string; // references auth.users(id)
  role: UserRole;
  full_name?: string;
  telegram_username?: string;
  created_at: string;
}

export interface Plan {
  id: string;
  name: 'student' | 'pro' | 'company';
  display_name: string;
  price_monthly: number;
  price_yearly: number;
  features: {
    max_cv: number; // -1 means unlimited
    themes: number;
    layouts: number;
    color_options: number;
    custom_domain: boolean;
    team_members: number;
    stats: string;
    support: string;
  };
  is_active: boolean;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'expired' | 'trialing';
  billing_cycle: 'monthly' | 'yearly';
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  created_at: string;
}

export interface CVProject {
  id: string;
  user_id: string;
  title: string;
  data: any; // Using JSON structure defined in types/resume.ts
  theme_id: string;
  layout_id: string;
  color_scheme?: Record<string, string>;
  public_slug?: string;
  custom_domain?: string;
  is_published: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  display_name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  layout_id: string;
  preview_image_url?: string;
  is_active: boolean;
  sort_order: number;
}
