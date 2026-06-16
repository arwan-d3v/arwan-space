# Jules Agent Progress Log – Arwan'space

## Sesi 1 - Setup Milestone 1: Halaman Resume

### Tugas yang Dikerjakan:
- [x] Setup proyek Next.js + TailwindCSS + Framer Motion + Supabase SSR.
- [x] Konfigurasi environment variables lokal (`.env.local`).
- [x] Implementasi TypeScript Interfaces untuk skema JSONB.
- [x] Styling Vanilla CSS untuk Glassmorphism di `styles/glassmorphism.css`.
- [x] Pembuatan komponen `GlassPanel.tsx`.
- [x] Pembuatan `LoadingScreen.tsx` dengan minimal loading 2 detik dan integrasi pre-loading asset.
- [x] Pembuatan komponen navigasi: `MiniNavLeft.tsx` (menggunakan Intersection Observer) & `BottomNavMerged.tsx` (muncul di bawah scroll).
- [x] Pembuatan komponen Parallax: `BackgroundParallax.tsx`.
- [x] Struktur dan rendering halaman utama via Server Component `page.tsx` dengan _fallback_ ke dummy data jika Supabase belum terkoneksi.

### Catatan Penting & Panduan Manual untuk Anda:

Agar halaman tampil sempurna, ada beberapa langkah manual yang harus Anda lakukan:

1. **Aset Awan Parallax**:
   Saya telah mengatur `BackgroundParallax.tsx` untuk mencari gambar di path berikut:
   - `/public/assets/clouds/cloud1.png`
   - `/public/assets/clouds/cloud2.png`
   - `/public/assets/clouds/cloud3.png`
   Silakan buat folder tersebut dan masukkan gambar PNG berlatar transparan. Jika belum ada, sistem akan menampilkan bentuk _blur_ bundar sebagai _placeholder_.

2. **Supabase Database**:
   Anda harus menghubungkan URL dan Anon Key asli Anda ke dalam `.env.local`. Setelah itu, jalankan SQL query berikut di SQL Editor Supabase Anda untuk membuat tabel dan data awalnya:

```sql
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

-- Contoh Insert Data
INSERT INTO resume (
  full_name, title, summary,
  experience, education, skills, real_projects, hobbies, social_links
) VALUES (
  'Arwan',
  'Fullstack Developer & UI/UX Enthusiast',
  'Passionate about creating beautiful, functional, and user-centric digital experiences.',
  '[{"id": "exp-1", "role": "Senior Frontend Engineer", "company": "Tech Solutions Inc.", "startDate": "Jan 2021", "endDate": "Present", "description": ["Led the migration of legacy architecture to Next.js App Router.", "Improved Core Web Vitals."]}]'::jsonb,
  '[{"id": "edu-1", "degree": "B.S. Computer Science", "institution": "University of Technology", "startDate": "2016", "endDate": "2020", "description": "Graduated with Honors."}]'::jsonb,
  '[{"id": "skill-1", "category": "Frontend", "items": [{"name": "React / Next.js", "level": 95}, {"name": "Tailwind CSS", "level": 95}]}]'::jsonb,
  '[{"id": "proj-1", "name": "GlassUI", "description": "A comprehensive open-source CSS framework.", "technologies": ["CSS", "React"], "imageUrl": "", "link": "https://github.com"}]'::jsonb,
  '["Photography", "Mechanical Keyboards", "Open Source"]'::jsonb,
  '{"email": "hello@arwanspace.com", "location": "Jakarta, Indonesia", "github": "https://github.com", "linkedin": "https://linkedin.com"}'::jsonb
);
```

### Keputusan/Kendala:
- Memilih **Vanilla CSS untuk struktur dasar glassmorphism** agar performa lebih ringan dan browser caching lebih optimal.
- Menggunakan **Framer Motion khusus pada `LoadingScreen`** agar animasi progress bar linear dan opacity transisi di akhir lebih mulus.
- Waktu *loading* diatur menjadi **kombinasi asset loading + minimum threshold 2 detik**, jadi animasinya dipastikan tidak sekadar berkedip.
- Komponen dibongkar per-section agar file tidak terlalu besar dan _maintenance_ lebih mudah ke depannya.

### Rekomendasi Lanjutan:
1. Ganti *placeholder* aset cloud di path yang ditentukan agar Background Parallax terlihat lebih hidup.
2. Setelah integrasi DB berhasil, kita bisa bergeser ke Milestone 2 (halaman Login dengan sistem SSO & Public Dashboard).
