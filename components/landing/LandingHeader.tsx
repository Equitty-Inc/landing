'use client';

import { ArrowRight, Menu, TrendingUp, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getContrastingTextColor, getRouteAccent, normalizeRoutePath } from '@/lib/route-accent';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/platform', key: 'platform' },
  { href: '/regulatory', key: 'regulatory' },
  { href: '/updates', key: 'updates' },
] as const;

export default function LandingHeader() {
  const t = useTranslations('SiteNav');
  const pathname = usePathname();
  const routePath = normalizeRoutePath(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const activeAccent = getRouteAccent(pathname);
  const activeTextColor = getContrastingTextColor(activeAccent);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const closeMobileIfDesktop = () => {
      if (mq.matches) setMobileOpen(false);
    };
    closeMobileIfDesktop();
    mq.addEventListener('change', closeMobileIfDesktop);
    return () => mq.removeEventListener('change', closeMobileIfDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) {
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;

      if (currentScrollY <= 24) {
        setIsHeaderVisible(true);
      } else if (isScrollingUp) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  const accentGlow = {
    background:
      'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.28) 0%, rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.09) 42%, transparent 72%)',
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-[rgba(var(--eq-page-accent-rgb,0,180,196),0.12)] bg-[#08070E]/80 backdrop-blur-lg transition-[transform,border-color] duration-300',
        isHeaderVisible || mobileOpen ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16.5 lg:h-17"
        style={accentGlow}
        aria-hidden
      />
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="EQUITTY home"
            className="inline-block"
            style={{
              filter: 'drop-shadow(0 0 18px rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.38))',
            }}
          >
            <Image
              src="/logo-accent.png"
              alt="EQUITTY"
              width={160}
              height={48}
              className="h-auto w-28 object-contain sm:w-36"
              priority
            />
          </Link>
          <nav className="hidden items-center gap-1 rounded-full bg-white/5 p-1 lg:flex">
            {navLinks.map((item) => {
              const isActive = routePath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm transition-colors',
                    isActive ? '' : 'text-white/75 hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full transition-colors duration-300"
                      transition={{ type: 'spring', stiffness: 380, damping: 34, mass: 0.35 }}
                      style={{
                        backgroundColor: 'rgb(var(--eq-page-accent-rgb, 0, 180, 196))',
                        boxShadow: '0 0 18px rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.35)',
                      }}
                    />
                  ) : null}
                  <span className="relative z-10" style={isActive ? { color: activeTextColor } : undefined}>
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">

          {/* OPTION_C: Neon outline + TrendingUp icon */}
          <Button
            asChild
            className="hidden sm:inline-flex rounded-full border border-[rgba(var(--eq-page-accent-rgb,0,180,196),0.65)] bg-[rgba(var(--eq-page-accent-rgb,0,180,196),0.06)] text-white shadow-[0_0_0px_rgba(var(--eq-page-accent-rgb,0,180,196),0.2)] hover:bg-[rgba(var(--eq-page-accent-rgb,0,180,196),0.18)] hover:shadow-[0_0_24px_rgba(var(--eq-page-accent-rgb,0,180,196),0.45)]"
          >
            <Link href="/#newsletter">
              {t('primaryCta')}
              <TrendingUp className="h-4 w-4" />
            </Link>
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--eq-page-accent-rgb,0,180,196),0.55)] lg:hidden"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={cn(
          'overflow-hidden border-t border-white/10 transition-[max-height,opacity] duration-300 lg:hidden',
          mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navLinks.map((item) => {
            const isActive = routePath === item.href;
            return (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/8"
                style={isActive ? { color: activeTextColor, backgroundColor: 'rgb(var(--eq-page-accent-rgb, 0, 180, 196))' } : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <Link
            href="/#newsletter"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex justify-center rounded-xl border border-[rgba(var(--eq-page-accent-rgb,0,180,196),0.38)] bg-[rgba(var(--eq-page-accent-rgb,0,180,196),0.1)] px-4 py-3 text-(--eq-page-accent-contrast,#F8FAFC) text-sm font-semibold shadow-[0_8px_22px_rgba(var(--eq-page-accent-rgb,0,180,196),0.18)] transition hover:bg-[rgba(var(--eq-page-accent-rgb,0,180,196),0.2)]"
          >
            {t('primaryCta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
      {/* <div className="w-full h-px min-h-px mt-3 sm:mt-5 bg-linear-to-r from-transparent via-accent to-transparent opacity-90" style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0, 180, 196, 0.25) 0%, rgba(0, 180, 196, 0.08) 40%, transparent 70%)',
      }} aria-hidden /> */}
    </header>
  );
}
