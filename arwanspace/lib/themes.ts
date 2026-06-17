import { type ThemeConfig } from '@/types/dashboard';

// Generating 27 dummy themes
export const THEMES: ThemeConfig[] = Array.from({ length: 27 }).map((_, i) => {
  const isDark = i % 2 === 0;
  const layoutIds = ['classic', 'sidebar', 'single-page'];

  return {
    id: `theme-${i + 1}`,
    name: `theme_${i + 1}`,
    display_name: `Theme ${i + 1} ${isDark ? '(Dark)' : '(Light)'}`,
    colors: {
      primary: isDark ? '#3498db' : '#2980b9',
      secondary: isDark ? '#2ecc71' : '#27ae60',
      background: isDark ? '#1a1a1a' : '#f8f9fa',
      text: isDark ? '#f1f1f1' : '#333333',
      accent: '#e74c3c'
    },
    layout_id: layoutIds[i % 3],
    is_active: true,
    sort_order: i
  };
});

// Explicitly define a couple of specific ones to match specs
THEMES[0] = { ...THEMES[0], name: 'modern', display_name: 'Modern Minimal', layout_id: 'classic' };
THEMES[1] = { ...THEMES[1], name: 'aurora', display_name: 'Aurora Sidebar', layout_id: 'sidebar' };
