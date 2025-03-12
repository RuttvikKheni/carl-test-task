import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log("🚀 Middleware executing...");
  console.log("Request Path:", req.nextUrl.pathname);

  const token = req.cookies.get('token')?.value || req.headers.get('authorization');
  console.log("Token:", token);

  const isDashboardRoute = req.nextUrl.pathname === '/'; // ✅ Restrict "/"
  const isAuthRoute = ['/login', '/signup'].includes(req.nextUrl.pathname); // ✅ Handle login & signup

  // ❌ If no token & trying to access "/"
  if (!token && isDashboardRoute) {
    console.log("❌ No token found. Redirecting to /login...");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ✅ If token exists & user tries to access "/login" or "/signup"
  if (token && isAuthRoute) {
    console.log("✅ Token found. Redirecting to / (dashboard)...");
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log("✅ Request allowed...");
  return NextResponse.next();
}

// ✅ Apply middleware to "/", "/login", and "/signup"
export const config = {
  matcher: ['/', '/login', '/signup'],
};
