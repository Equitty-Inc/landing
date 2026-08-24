'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import HashLink from '@/components/landing/HashLink';
import ProductFrame from '@/components/landing/ProductFrame';
import { SHOW_PLATFORM_SHOTS, SHOW_WAITLIST } from '@/lib/landingFlags';

export default function FinalCta() {
  const t = useTranslations('HomePage.FinalCta');

  return (
    <section className="border-t border-white/10 bg-[#0c0c16] py-16 text-[#f6f3ee] sm:py-20 lg:py-24">
      <div className="eq-shell grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div>
          <p className="eq-text-small text-eq-brand">{t('eyebrow')}</p>
          <h2 className="mt-3 text-2xl tracking-tight sm:text-4xl lg:text-[2.75rem]">{t('title')}</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d7cfc7]">{t('subtitle')}</p>
          {SHOW_WAITLIST ? (
            <HashLink
              id="espera"
              href="#espera"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-eq-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(0,180,196,0.4)] transition hover:bg-eq-brand-strong sm:mt-8 sm:w-auto"
            >
              {t('cta')}
            </HashLink>
          ) : (
            <HashLink
              id="cumplimiento"
              href="#cumplimiento"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-eq-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(0,180,196,0.4)] transition hover:bg-eq-brand-strong sm:mt-8 sm:w-auto"
            >
              {t('secondaryCta')}
            </HashLink>
          )}
        </div>
        {SHOW_PLATFORM_SHOTS ? (
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[28px] bg-[#00b4c4]/20 blur-3xl" />
            <ProductFrame src="/product/marketplace-grid.webp" alt={t('shotAlt')} url="equitty.app/marketplace" />
            <div className="mt-4 flex items-center gap-2 text-xs text-[#d7cfc7]">
              <Image src="/equitty_isotipo.png" alt="" width={16} height={16} className="h-4 w-4" />
              {t('caption')}
            </div>
          </div>
        ) : (
          <div className="eq-glass-neon p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-[#d7cfc7]">
              <Image src="/equitty_isotipo.png" alt="" width={16} height={16} className="h-4 w-4" />
              {t('caption')}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#d7cfc7]">{t('closedNote')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
