'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import HashLink from '@/components/landing/HashLink';
import { cn } from '@/lib/utils';
import { SHOW_WAITLIST } from '@/lib/landingFlags';
import { scrollToTop } from '@/lib/scrollToSection';

const HOME_SECTIONS = ['producto', 'equipo', 'proceso', 'cumplimiento', 'faq'] as const;
type HomeSection = (typeof HOME_SECTIONS)[number];

const NAV = [
  { href: '#producto', key: 'product', section: 'producto' },
  { href: '#equipo', key: 'about', section: 'equipo' },
  { href: '#proceso', key: 'process', section: 'proceso' },
  { href: '#cumplimiento', key: 'regulatory', section: 'cumplimiento', page: 'regulatory' },
  { href: '#faq', key: 'faq', section: 'faq' },
] as const;

function pageSlug(pathname: string, locale: string) {
  const rest = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  return rest;
}

export default function LandingHeader() {
  const t = useTranslations('HomePage.Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const home = `/${locale}`;
  const slug = pageSlug(pathname, locale);
  const isHome = slug === '/';
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<HomeSection | null>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;

      if (openRef.current || y < 24 || Math.abs(delta) > 160) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    function pickSection() {
      const marker = 96;
      let current: HomeSection | null = null;
      for (const id of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }
      setActiveSection(current);
    }

    const sections = HOME_SECTIONS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    pickSection();
    const observer = new IntersectionObserver(pickSection, {
      rootMargin: '-72px 0px 0px 0px',
      threshold: [0, 0.15, 0.35, 0.6, 1],
    });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', pickSection, { passive: true });
    window.addEventListener('hashchange', pickSection);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', pickSection);
      window.removeEventListener('hashchange', pickSection);
    };
  }, [isHome, pathname]);

  function isActive(item: (typeof NAV)[number]) {
    if ('page' in item && (slug === `/${item.page}` || slug.startsWith(`/${item.page}/`))) {
      return true;
    }
    return isHome && 'section' in item && activeSection === item.section;
  }

  function sectionHref(id: string) {
    return isHome ? `#${id}` : `${home}#${id}`;
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full border-b border-white/10 bg-[#09080d]/85 backdrop-blur-md',
          'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className="eq-shell flex h-16 items-center justify-between gap-3 sm:h-[72px] sm:gap-4">
          <Link
            href={home}
            className="flex min-w-0 items-center gap-2.5"
            onClick={(event) => {
              setOpen(false);
              if (
                !isHome ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }
              event.preventDefault();
              scrollToTop();
            }}
          >
            <Image
              src="/equitty_isotipo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <Image
              src="/equitty_logo_white.png"
              alt="EQUITTY"
              width={120}
              height={24}
              className="hidden h-6 w-auto object-contain sm:block"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-4 text-[13px] font-medium xl:flex xl:gap-7 xl:text-sm">
            {NAV.map((item) => {
              const active = isActive(item);
              const className = cn(
                'relative inline-flex items-center py-1 transition-colors',
                active ? 'text-eq-ink' : 'text-eq-muted hover:text-eq-ink',
              );
              const underline = active ? (
                <motion.span
                  layoutId="nav-active-underline"
                  className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-eq-brand shadow-[0_0_12px_rgba(0,180,196,0.95)]"
                  transition={
                    reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }
                  }
                />
              ) : null;

              return (
                <HashLink
                  key={item.href}
                  id={item.section}
                  href={sectionHref(item.section)}
                  className={className}
                  aria-current={active ? 'page' : undefined}
                >
                  {t(item.key)}
                  {underline}
                </HashLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            {SHOW_WAITLIST ? (
              <HashLink
                id="espera"
                href={sectionHref('espera')}
                className="inline-flex rounded-full bg-eq-brand px-2.5 py-2 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(0,180,196,0.35)] transition hover:bg-eq-brand-strong sm:px-4 sm:text-sm"
              >
                {t('cta')}
              </HashLink>
            ) : null}
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-eq-ink xl:hidden"
              onClick={() => {
                setHidden(false);
                setOpen((value) => !value);
              }}
              aria-expanded={open}
              aria-label={open ? t('closeMenu') : t('openMenu')}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="border-t border-white/10 bg-[#09080d]/95 px-4 py-4 backdrop-blur-md xl:hidden">
            <div className="eq-shell grid gap-1">
              {NAV.map((item) => {
                const active = isActive(item);
                const className = cn(
                  'relative rounded-xl px-3 py-3 text-sm font-medium transition',
                  active ? 'text-eq-ink' : 'text-eq-muted hover:bg-white/5 hover:text-eq-ink',
                );
                const underline = active ? (
                  <span className="absolute bottom-2 left-3 right-3 h-px rounded-full bg-eq-brand shadow-[0_0_10px_rgba(0,180,196,0.85)]" />
                ) : null;

                return (
                  <HashLink
                    key={item.href}
                    id={item.section}
                    href={sectionHref(item.section)}
                    className={className}
                    aria-current={active ? 'page' : undefined}
                    onNavigate={() => setOpen(false)}
                  >
                    {t(item.key)}
                    {underline}
                  </HashLink>
                );
              })}
            </div>
          </nav>
        ) : null}
      </header>
      <div className="h-16 sm:h-[72px]" aria-hidden />
    </>
  );
}
