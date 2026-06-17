import { RenderLayout } from '@/lib/layouts';
import { THEMES } from '@/lib/themes';
import { notFound } from 'next/navigation';

// In a real app, fetch cv_project by public_slug from Supabase
export default async function PublicResumePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // MOCK: simulate fetching data
  const cvData = {
    full_name: "Mock User",
    title: "Senior Product Designer",
    summary: "Dedicated product designer with 5+ years of experience creating digital experiences that delight users.",
    experience: [
      { role: "Lead Designer", company: "TechFlow Inc.", startDate: "2020", endDate: "Present", description: ["Led the redesign of the core app.", "Managed a team of 3 designers."] }
    ],
    social_links: { email: "mock@example.com", location: "San Francisco, CA" }
  };

  // Find theme based on slug to demonstrate different layouts (mocking DB theme_id association)
  let theme = THEMES[0]; // classic
  if (slug === 'johndoe') theme = THEMES[1]; // sidebar

  if (!theme) return notFound();

  return <RenderLayout cvData={cvData} theme={theme} />;
}
