# 🚀 SUPABASE SETUP CHECKLIST - Phase 1

## Status: WAITING FOR USER ACTION

Ikuti langkah-langkah di bawah ini untuk setup Supabase dan connect ke aplikasi.

---

## ✅ STEP 1: Create Supabase Project

**Website**: https://supabase.com

1. [ ] Click "Start your project"
2. [ ] Sign Up atau Login (pakai Google/GitHub jika ada)
3. [ ] Create a new project
4. [ ] Fill form:
   - Name: `arwan-space`
   - Database password: `[create-strong-password]` (CATAT INI!)
   - Region: `Asia Southeast 1 (Singapore)`
5. [ ] Click "Create new project"
6. [ ] Wait ~2 minutes until project ready

---

## ✅ STEP 2: Get Credentials

Setelah project ready:

1. [ ] Buka project Anda di Supabase
2. [ ] Pergi ke **Settings** (gear icon, kiri bawah)
3. [ ] Klik **API**
4. [ ] Find section **Project Settings**:
   - [ ] Copy **Project URL** (e.g., `https://xxxxxx.supabase.co`)
   - [ ] Copy **anon public** key (row kedua, kunci panjang)
5. [ ] Save credentials ke file temporary

---

## ✅ STEP 3: Update .env.local

Ganti placeholder dengan credentials asli Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
```

---

## ✅ STEP 4: Create Database Tables

Di Supabase Dashboard:

1. [ ] Pergo ke **SQL Editor**
2. [ ] Click **New Query**
3. [ ] Paste SQL untuk tabel `resume` (see JULES_AGENT.md)
4. [ ] Click **Run**
5. [ ] Verify table created di **Table Editor**

---

## ✅ STEP 5: Insert Sample Data

1. [ ] Di SQL Editor, click **New Query**
2. [ ] Paste SQL INSERT data
3. [ ] Click **Run**
4. [ ] Check di Table Editor - data muncul?

---

## ✅ STEP 6: Test Connection

1. [ ] Restart dev server: `Ctrl+C` + `npm run dev`
2. [ ] Buka http://localhost:3000
3. [ ] Check console:
   - If "Supabase fetch error" → credentials salah
   - If resume muncul normal → ✓ SUCCESS!

---

## 📞 NEXT: Reply dengan

Setelah Anda setup Supabase dan dapat credentials, **reply dengan**:

```
✅ Supabase Project URL: https://xxxxx.supabase.co
✅ Supabase Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI...
```

Atau bisa langsung paste key saja, saya akan:
1. Update `.env.local`
2. Create tabel `resume`
3. Insert sample data
4. Test connection
5. Move to Phase 2 ✓

---

**Estimated time**: ~5-10 minutes

**Status**: Waiting for Supabase setup... ⏳
