import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check token cookie (set at login)
  const token = request.cookies.get('taskflow_token')?.value

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isProtectedRoute = pathname.startsWith('/tasks')

  // No server-side token reading from localStorage is possible.
  // We use a cookie strategy as fallback. The real guard is client-side in AuthContext.
  if (isProtectedRoute && !token) {
    // Allow through — client-side auth will redirect if truly unauthenticated
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
