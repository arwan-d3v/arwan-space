# 🛠️ Local Debugging Guide - Arwan-Space

## ✅ Setup Status
- **Repository**: Cloned dari GitHub ✓
- **Dependencies**: Installed (496 packages) ✓
- **Environment**: `.env.local` configured ✓
- **Dev Server**: Running on `http://localhost:3000` ✓

---

## 🚀 Quick Start

### 1. **Access Application**
```
http://localhost:3000
```

### 2. **Start Debugging in VS Code**
Press `F5` to open Debug menu, then select:
- **"Next.js Debug"** - Server-side debugging only
- **"Next.js Full Stack"** - Server + Browser debugging

### 3. **Set Breakpoints**
Click on line numbers in editor to set breakpoints. Code will pause at breakpoint when executed.

---

## 📊 Project Stack
- **Framework**: Next.js 16.2.9 (with Turbopack)
- **Runtime**: React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (Auth + PostgreSQL)
- **Storage**: Cloudflare R2
- **Telemetry**: Firebase (KiroiX only)

---

## 🔍 Debugging Methods

### Method 1: Browser DevTools
```
Press F12 in browser → Inspect Network, Console, Elements
```

### Method 2: VS Code Server Debugging
```
1. Press F5
2. Select "Next.js Debug"
3. Set breakpoints with line number clicks
4. Use Debug Console to evaluate expressions
```

### Method 3: Console Logging
```typescript
// In component or API route
console.log('Debug info:', data);
console.warn('Warning:', error);
```

### Method 4: Next.js Logs in Terminal
```
Real-time request logs appear in terminal
GET / 200 in 8.7s (next.js: 1184ms, proxy.ts: 218ms, application-code: 7.3s)
```

---

## ⚙️ Environment Variables

Located in `.env.local`:

### Firebase (Telemetry)
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
```

### Cloudflare R2 (Media Storage)
```
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
NEXT_PUBLIC_R2_BUCKET_NAME=official-arwan-assets
```

### Supabase (Auth + Database)
```
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
```

### Development
```
NODE_ENV=development
MOCK_ROLE=superadmin
```

---

## 🐛 Troubleshooting

### Issue: "Supabase fetch error, using dummy data"
**Cause**: Supabase credentials are placeholders  
**Solution**: Replace with real credentials or use dummy data (already handled)  
**Status**: ✅ Handled with fallback

### Issue: Port 3000 already in use
**Solution**:
```powershell
Get-Process -Name node | Stop-Process -Force
# or
taskkill /F /IM node.exe
```

### Issue: Hot reload not working
**Solution**:
1. Save file again (Ctrl+S)
2. Check if file is being watched in `.vscode/settings.json`
3. Restart dev server: Press Ctrl+C and run `npm run dev` again

---

## 📁 Project Structure

```
arwanspace/
├── app/                    # Next.js 16 App Router
│   ├── page.tsx           # Home page (Resume)
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard
│   ├── admin/             # Protected admin routes
│   └── components/        # Reusable components
├── lib/
│   └── supabase/          # Supabase client setup
├── public/                # Static assets
├── styles/                # Global styles
├── proxy.ts               # Middleware for auth
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript config
└── .vscode/
    ├── launch.json        # Debug configurations
    └── settings.json      # Editor settings
```

---

## 📝 Common Tasks

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix --force  # to fix
```

---

## 🎯 Next Steps

1. **Setup Supabase** (Optional)
   - Create account at supabase.com
   - Add real credentials to `.env.local`
   - Run migrations if needed

2. **Configure Firebase** (Optional)
   - Setup Firebase project
   - Add credentials to `.env.local`

3. **Test Routes**
   - `/` - Home (Resume)
   - `/login` - Login page
   - `/dashboard` - Protected dashboard (needs login)
   - `/admin` - Protected admin (needs superadmin role)

---

## 💡 Tips & Tricks

- **Hot reload**: Saves automatically refresh the page
- **Auto-import**: TypeScript auto-imports available from `@/` aliases
- **Error overlay**: Errors display as overlay in browser (can be dismissed)
- **Source maps**: Enabled in dev mode for better debugging

---

**Terminal**: Keep the dev server running in this terminal for development  
**VS Code**: Press F5 to start debugging with configured launch configurations
