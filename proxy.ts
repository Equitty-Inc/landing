import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
const LOCALE_COOKIE_KEY = 'preferred-locale';

function pickLocaleFromAcceptLanguage(header: string | null): 'es' | 'en' {
  if (!header) return 'en';
  const normalized = header.toLowerCase();
  return normalized.includes('es') ? 'es' : 'en';
}

function getLocaleFromPath(pathname: string): 'es' | 'en' | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const candidate = segments[0];
  return candidate === 'es' || candidate === 'en' ? candidate : null;
}

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const localeFromPath = getLocaleFromPath(pathname);

  // Persist manual locale overrides from URL.
  if (localeFromPath) {
    const response = intlMiddleware(request);
    response.cookies.set(LOCALE_COOKIE_KEY, localeFromPath, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    response.headers.set('X-Robots-Tag', 'index, follow');
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  }

  // First visit locale bootstrap from browser language (Accept-Language).
  if (pathname === '/') {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE_KEY)?.value;
    const resolvedLocale = cookieLocale === 'es' || cookieLocale === 'en'
      ? cookieLocale
      : pickLocaleFromAcceptLanguage(request.headers.get('accept-language'));
    const redirectUrl = new URL(`/${resolvedLocale}${search}`, request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE_KEY, resolvedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    response.headers.set('X-Robots-Tag', process.env.NODE_ENV === 'development' ? 'noindex, nofollow' : 'index, follow');
    return response;
  }

  // Handle internationalization first
  const response = intlMiddleware(request);

  // Add additional security headers
  response.headers.set('X-Robots-Tag', 'index, follow');

  // Prevent search engines from indexing in development
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
