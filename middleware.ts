import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register') || request.nextUrl.pathname.startsWith('/verify-email');
  const isApi = request.nextUrl.pathname.startsWith('/api');
  const isPublic = request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.includes('.');

  if (!token && !isAuthPage && !isApi && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
