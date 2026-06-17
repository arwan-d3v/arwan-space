# 📝 STEP-BY-STEP SQL Setup di Supabase

## 📋 CHECKLIST YANG PERLU ANDA LAKUKAN

Anda HARUS menjalankan 2 SQL queries di Supabase untuk membuat tabel `resume`.

Kalau belum, aplikasi akan terus menampilkan: **"Supabase fetch error, using dummy data"**

---

## 🎯 LANGKAH DEMI LANGKAH

### LANGKAH 1: Buka Supabase Dashboard

1. **Login** ke https://supabase.com
2. Klik project **arwan-d3v's** atau project Anda
3. Tunggu sampai dashboard loaded

---

### LANGKAH 2: Buka SQL Editor

Di sidebar kiri, cari ikon **{}>_** (atau teks "SQL Editor")

Klik untuk membuka SQL Editor

---

### LANGKAH 3: Jalankan QUERY 1 (CREATE TABLE)

1. Klik tombol hijau **+ New Query** (di atas editor)
2. Klik di text area (tempat menulis SQL)
3. **DELETE semua text** yang sudah ada (kalau ada)
4. **COPY-PASTE** SQL di bawah ini **EXACTLY**:

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
```

5. Tekan **Ctrl+Enter** atau klik tombol **RUN** (icon ▶ biru)
6. Tunggu sampai selesai (harus muncul "Success" atau tanda hijau ✓)

---

### LANGKAH 4: Jalankan QUERY 2 (INSERT DATA)

1. Klik **+ New Query** lagi (tombol hijau)
2. **DELETE semua text**
3. **COPY-PASTE** SQL di bawah ini:

```sql
INSERT INTO resume (profile_photo_url, full_name, title, summary, experience, education, skills, real_projects, hobbies, social_links) 
VALUES (
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'Arwan',
  'Fullstack Developer & UI/UX Enthusiast',
  'Passionate about creating beautiful, functional, and user-centric digital experiences.',
  '[{"id":"exp-1","company":"Tech Solutions Inc.","role":"Senior Frontend Engineer","startDate":"Jan 2021","endDate":"Present","description":["Led the migration of legacy architecture to Next.js App Router.","Improved Core Web Vitals by 40%."]}]'::jsonb,
  '[{"id":"edu-1","institution":"University of Technology","degree":"B.S. Computer Science","startDate":"2016","endDate":"2020","description":"Graduated with Honors."}]'::jsonb,
  '[{"id":"skill-1","category":"Frontend","items":[{"name":"React / Next.js","level":95},{"name":"TypeScript","level":90},{"name":"Tailwind CSS","level":95}]},{"id":"skill-2","category":"Backend","items":[{"name":"Node.js","level":85},{"name":"Supabase / PostgreSQL","level":80}]}]'::jsonb,
  '[{"id":"proj-1","name":"GlassUI Framework","description":"A comprehensive open-source CSS framework.","technologies":["CSS","React"],"link":"https://github.com"}]'::jsonb,
  '["Photography","Mechanical Keyboards","Open Source"]'::jsonb,
  '{"email":"hello@arwanspace.com","location":"Jakarta, Indonesia","github":"https://github.com","linkedin":"https://linkedin.com"}'::jsonb
);
```

4. Tekan **Ctrl+Enter** atau klik **RUN**
5. Tunggu "Success" ✓

---

### LANGKAH 5: Verifikasi Data

1. Di sidebar, cari **Table Editor** (icon tabel)
2. Klik untuk membuka
3. Di daftar table, cari dan klik **resume**
4. Harus muncul **1 row** dengan data:
   - full_name: "Arwan"
   - title: "Fullstack Developer & UI/UX Enthusiast"
   - email: "hello@arwanspace.com"

Jika muncul → **✅ SUCCESS!**

---

## 🎯 SETELAH SELESAI

Reply saja dengan: **"✅ SQL setup complete"** atau **"✅ Data inserted"**

Maka saya akan:
1. Reload dev server
2. Test Supabase connection
3. **Phase 1 akan SELESAI** 🎉

---

## 🆘 JIKA ERROR

### Error: "relation "resume" already exists"
→ Tabel sudah ada, skip Query 1, langsung ke Query 2

### Error: "Invalid insert"
→ Check di Table Editor jika table `resume` sudah ada
→ Kalau ada, langsung insert data (Query 2)

### Error: "syntax error"
→ Paste SQL lagi dengan hati-hati, jangan ada yang terpotong

---

## ⏱️ WAKTU PERKIRAAN

- Query 1: ~5 detik
- Query 2: ~2 detik
- Verifikasi: ~1 menit
- **Total: ~2 menit**

---

**Mulai sekarang!** 🚀
