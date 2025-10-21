import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });
    const { data: { session } } = await supabase.auth.getSession();

    // Protected routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        return NextResponse.redirect(new URL('/get-started?mode=login', request.url));
      }
    }

    // If user is signed in and tries to access auth pages, redirect to dashboard
    const isAuthRoute = request.nextUrl.pathname.startsWith('/get-started');
    if (isAuthRoute && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // For admin routes, check if user has admin role
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!session) {
        const redirectUrl = new URL('/get-started', request.url);
        redirectUrl.searchParams.set('mode', 'login');
        redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', session.user.id)
        .maybeSingle();
      if (!adminUser) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

 
