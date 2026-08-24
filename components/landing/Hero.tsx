'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import ComingSoonBadge from '@/components/landing/ComingSoonBadge';
import HashLink from '@/components/landing/HashLink';
import HeroLogoMark from '@/components/landing/HeroLogoMark';
import WaitlistForm from '@/components/HeroSection/WaitlistForm';
import ProductFrame from '@/components/landing/ProductFrame';
import { SHOW_PLATFORM_SHOTS, SHOW_WAITLIST } from '@/lib/landingFlags';

export default function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative overflow-hidden bg-eq-canvas pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <div className="eq-shell relative grid items-start gap-8 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:items-center xl:gap-12">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {SHOW_WAITLIST ? <ComingSoonBadge label={t('badge')} variant="waitlist" /> : null}
            <ComingSoonBadge label={t('applicationPendingBadge')} variant="regulatory" />
          </div>
          <p className="eq-text-small mt-5 text-eq-brand sm:mt-6">{t('kicker')}</p>
          <h1 className="mt-3 text-[1.75rem] leading-[1.12] tracking-tight text-eq-ink sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem]">
            {t('hero_title')}{' '}
            <span className="text-gradient hero-neon-word">{t('hero_title_highlight')}</span>
          </h1>
          <p className="eq-text-body mt-4 max-w-lg text-sm text-eq-muted sm:mt-5 sm:text-base">{t('subhead')}</p>
          {SHOW_WAITLIST ? (
            <div id="espera" className="mt-6 scroll-mt-24 sm:mt-8">
              <Suspense fallback={<div className="h-[320px] rounded-2xl border border-eq-brand/20 bg-white/5" />}>
                <WaitlistForm tone="dark" />
              </Suspense>
            </div>
          ) : (
            <div className="hero-cta-glass mt-6 inline-flex flex-wrap gap-3 p-2 sm:mt-8">
              <HashLink
                id="cumplimiento"
                href="#cumplimiento"
                className="eq-neon-cta eq-neon-cta--crystal inline-flex h-11 items-center justify-center rounded-full bg-eq-brand px-5 text-sm font-semibold text-white transition hover:bg-eq-brand-strong"
              >
                {t('heroSecondaryCta')}
              </HashLink>
              <HashLink
                id="equipo"
                href="#equipo"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-eq-ink backdrop-blur-md transition hover:border-eq-brand/50 hover:text-white"
              >
                {t('heroTertiaryCta')}
              </HashLink>
            </div>
          )}
        </div>

        <div className="relative order-first min-w-0 xl:order-none">
          {SHOW_PLATFORM_SHOTS ? (
            <ProductFrame
              src="/product/marketplace-home.webp"
              alt={t('productShotAlt')}
              priority
              className="hero-product-frame"
            />
          ) : (
            <HeroLogoMark
              className="mx-auto w-full max-w-[400px] xl:mr-0"
              label={t('heroArtAlt')}
            />
          )}
        </div>
      </div>
    </section>
  );
}
