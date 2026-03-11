import { NextResponse } from 'next/server';
 
let locales = ['en', 'es']
 
function getLocale(request) { 
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameLocale) return pathnameLocale
  
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0]
    if (locales.includes(preferredLocale)) {
      return preferredLocale
    }
  }
  
  return 'es'
}
 
export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  
  // Skip if it's a file request
  if (pathname.includes('.') && !pathname.startsWith('/api')) {
    return NextResponse.next()
  }
 
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // Handle root path specially
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }
    
    // For other paths, add locale prefix
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon|robots|sitemap|manifest|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|css|js|json)).*)',
  ],
}