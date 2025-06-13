import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/'
  
  // Define paths that are completely public (accessible without token)
  const isAuthPath = path === '/login' || path === '/signup'
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value || ''
  
  console.log('Middleware - Path:', path, 'Token exists:', !!token)

  // If user has token and tries to access auth pages (login/signup), redirect to profile
  if (isAuthPath && token) {
    console.log('Redirecting authenticated user from auth pages to profile')
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  // If user doesn't have token and tries to access protected routes, redirect to login
  if (!isPublicPath && !token) {
    console.log('Redirecting unauthenticated user to login')
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  
  // Allow the request to continue
  return NextResponse.next()
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}
