'use client';

import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type TermsSection = {
  title: string;
  body: string;
};

const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61588660531154';
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/equitty_/';
const X_URL = process.env.NEXT_PUBLIC_X_URL || 'https://x.com/EQUITTY_';
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@equitty_';
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/equitty0';

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 1200 1227" aria-hidden>
      <path
        fill="currentColor"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socials = [
  { href: LINKEDIN_URL, label: 'LinkedIn', icon: Linkedin },
  { href: X_URL, label: 'X (Twitter)', icon: TwitterIcon },
  { href: TIKTOK_URL, label: 'TikTok', icon: TikTokIcon },
  { href: INSTAGRAM_URL, label: 'Instagram', icon: Instagram },
  { href: FACEBOOK_URL, label: 'Facebook', icon: Facebook },
];

export default function LandingFooter() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const termsHeader = t.raw('termsContent.header') as string[];
  const termsSections = t.raw('termsContent.sections') as TermsSection[];
  const termsFooter = t.raw('termsContent.footer') as string;
  const currentLocale = locale === 'es' ? 'es' : 'en';

  const footerAccentLine = {
    background:
      'linear-gradient(90deg, transparent 0%, rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.55) 50%, transparent 100%)',
    boxShadow:
      '0 0 14px rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.42), 0 0 36px rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.16)',
  };

  const footerTopGlow = {
    background:
      'radial-gradient(ellipse 72% 85% at 50% 0%, rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.16) 0%, rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.05) 48%, transparent 72%)',
  };

  return (
    <footer className="relative overflow-hidden bg-background dark:bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-8 h-28 sm:h-32"
        style={footerTopGlow}
        aria-hidden
      />
      <div
        className="relative mx-auto mt-8 h-px w-full max-w-7xl opacity-90"
        style={footerAccentLine}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div
            className="inline-block"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.32))',
            }}
          >
            <Image src="/logo-accent.png" alt="EQUITTY" width={200} height={200} />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-4">
              <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="cursor-pointer text-white/70 transition hover:text-[rgb(var(--eq-page-accent-rgb,0,180,196))] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--eq-page-accent-rgb,0,180,196),0.45)]"
                  >
                    {t('terms')}
                  </button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-[min(96vw,1600px)] w-[min(96vw,1600px)] sm:max-w-[min(74vw,1200px)] sm:w-[min(74vw,1200px)] bg-[#03040b]/90 border border-white/10 shadow-2xl"
                >
                  <DialogHeader>
                    <DialogTitle className="text-white">{t('termsModalTitle')}</DialogTitle>
                    <DialogDescription className="text-white/70">{t('termsModalDescription')}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/80 p-6 text-sm leading-relaxed text-white/80">
                    <div className="space-y-1 text-[13px] uppercase tracking-[0.3em] text-white/60">
                      {termsHeader.map((line, index) => (
                        <p key={`${line}-${index}`}>{line}</p>
                      ))}
                    </div>
                    <div className="mt-4 space-y-6">
                      {termsSections.map((section) => (
                        <article
                          key={section.title}
                          className="space-y-2 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                        >
                          <p className="text-xs uppercase tracking-[0.4em] text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
                            {section.title}
                          </p>
                          <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{section.body}</p>
                        </article>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-white/60">{termsFooter}</p>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-white/70">{t('privacy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/50">{t('languageLabel')}</span>
              <div className="inline-flex items-center rounded-full bg-white/5 p-1">
                <Link
                  href={pathname}
                  locale="es"
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition hover:text-white"
                  style={
                    currentLocale === 'es'
                      ? { backgroundColor: 'rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.25)', color: '#FFFFFF' }
                      : undefined
                  }
                  aria-current={currentLocale === 'es' ? 'page' : undefined}
                >
                  ES
                </Link>
                <Link
                  href={pathname}
                  locale="en"
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition hover:text-white"
                  style={
                    currentLocale === 'en'
                      ? { backgroundColor: 'rgba(var(--eq-page-accent-rgb, 0, 180, 196), 0.25)', color: '#FFFFFF' }
                      : undefined
                  }
                  aria-current={currentLocale === 'en' ? 'page' : undefined}
                >
                  EN
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-[rgb(var(--eq-page-accent-rgb,0,180,196))]"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/50">
          <p>{t('footerDisclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
