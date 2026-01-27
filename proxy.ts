import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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
