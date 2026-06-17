import React from 'react';
import { type ThemeConfig, type CVProject } from '@/types/dashboard';

interface LayoutProps {
  cvData: any; // Ideally mapped to ResumeData from types/resume.ts
  theme: ThemeConfig;
}

export function ClassicLayout({ cvData, theme }: LayoutProps) {
  const { colors } = theme;
  return (
    <div style={{ backgroundColor: colors.background, color: colors.text, minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        <header style={{ borderBottom: `4px solid ${colors.primary}`, paddingBottom: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 0.5rem 0', color: colors.primary }}>{cvData.full_name}</h1>
          <h2 style={{ fontSize: '1.5rem', margin: '0', color: colors.secondary }}>{cvData.title}</h2>
          <p style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>{cvData.summary}</p>
        </header>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ color: colors.accent, borderBottom: `1px solid ${colors.secondary}`, paddingBottom: '0.5rem' }}>Experience</h3>
          {cvData.experience?.map((exp: any, i: number) => (
            <div key={i} style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ margin: '0', fontWeight: 'bold' }}>{exp.role}</h4>
                <span style={{ fontSize: '0.9rem', color: colors.secondary }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <h5 style={{ margin: '0.2rem 0 0.5rem 0', fontWeight: 'normal' }}>{exp.company}</h5>
              <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                {exp.description?.map((d: string, j: number) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export function SidebarLayout({ cvData, theme }: LayoutProps) {
  const { colors } = theme;
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.background, color: colors.text, fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '300px', backgroundColor: colors.primary, color: '#fff', padding: '3rem 2rem' }}>
        {cvData.profile_photo_url && (
          <img src={cvData.profile_photo_url} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '2rem', objectFit: 'cover' }} />
        )}
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{cvData.full_name}</h1>
        <h2 style={{ fontSize: '1.2rem', margin: '0 0 2rem 0', opacity: 0.8 }}>{cvData.title}</h2>

        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Contact</h3>
        <p style={{ fontSize: '0.9rem' }}>{cvData.social_links?.email}</p>
        <p style={{ fontSize: '0.9rem' }}>{cvData.social_links?.location}</p>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 4rem' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ color: colors.accent, fontSize: '1.5rem', marginBottom: '1rem' }}>About Me</h3>
          <p style={{ lineHeight: 1.6 }}>{cvData.summary}</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ color: colors.accent, fontSize: '1.5rem', marginBottom: '1rem' }}>Experience</h3>
          {cvData.experience?.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: '2rem' }}>
              <h4 style={{ margin: '0', fontSize: '1.2rem', color: colors.secondary }}>{exp.role}</h4>
              <h5 style={{ margin: '0.2rem 0 0.5rem 0', fontWeight: 'bold' }}>{exp.company} <span style={{ fontWeight: 'normal', fontSize: '0.9rem', color: 'gray' }}>| {exp.startDate} - {exp.endDate}</span></h5>
              <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                {exp.description?.map((d: string, j: number) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export function RenderLayout({ cvData, theme }: LayoutProps) {
  switch (theme.layout_id) {
    case 'sidebar':
      return <SidebarLayout cvData={cvData} theme={theme} />;
    case 'classic':
    default:
      return <ClassicLayout cvData={cvData} theme={theme} />;
  }
}
