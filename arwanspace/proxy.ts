import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const path = request.nextUrl.pathname;

  // Protect /dashboard and /admin routes
  if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Role verification logic
    // In a real app, query the profiles table.
    // For local dev, we mock based on email
    let role = 'public';
    const email = session.user.email || '';
    if (email.includes('superadmin')) role = 'superadmin';
    else if (email.includes('company')) role = 'company';
    else if (email.includes('pro')) role = 'pro';
    else if (email.includes('student')) role = 'student';
    // If we have a local env var overriding it
    if (process.env.MOCK_ROLE) role = process.env.MOCK_ROLE;

    // Admin protection
    if (path.startsWith('/admin') && role !== 'superadmin') {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
