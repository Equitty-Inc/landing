'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, Eye, Scale, ShieldCheck } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import ComingSoonBadge from '@/components/landing/ComingSoonBadge';
import HashLink from '@/components/landing/HashLink';
import NeonIcon from '@/components/landing/NeonIcon';
import SectionHeading from '@/components/landing/SectionHeading';
import { SHOW_WAITLIST } from '@/lib/landingFlags';

const PILLARS = [
  { key: 'license', icon: Scale, accent: 'amber' },
  { key: 'structure', icon: Building2, accent: 'cyan' },
  { key: 'protection', icon: ShieldCheck, accent: 'emerald' },
  { key: 'transparency', icon: Eye, accent: 'violet' },
] as const;

const LAUNCH_TILES = ['timing', 'who', 'next'] as const;

export default function Compliance() {
  const t = useTranslations('Regulatory');
  const tHome = useTranslations('HomePage');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section id="cumplimiento" className="relative scroll-mt-20 overflow-hidden bg-eq-canvas py-16 sm:scroll-mt-24 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-8%] h-56 w-56 rounded-full bg-eq-brand/12 blur-3xl" />

      <div className="eq-shell relative">
        <div className="flex flex-wrap items-center gap-2">
          <ComingSoonBadge label={tHome('applicationPendingBadge')} variant="regulatory" />
          <ComingSoonBadge label={t('statusDasp')} variant="waitlist" />
        </div>

        <div className="mt-6">
          <SectionHeading eyebrow={t('eyebrow')} title={t('heroTitle')} subtitle={t('heroSubtitle')} />
        </div>

        <ol className="mt-10 grid list-none gap-4 p-0 sm:mt-12 md:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <motion.li
              key={pillar.key}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <article className="eq-glass-panel h-full p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <NeonIcon icon={pillar.icon} accent={pillar.accent} size="sm" />
                  <p className="financial-figure text-xl text-eq-brand sm:text-2xl">{`0${index + 1}`}</p>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-eq-ink sm:text-xl">
                  {t(`pillars.${pillar.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-eq-muted">{t(`pillars.${pillar.key}.text`)}</p>
              </article>
            </motion.li>
          ))}
        </ol>

        <article className="eq-glass-neon mt-6 p-5 sm:mt-8 sm:p-7">
          <p className="eq-text-small text-eq-brand">{t('launchEyebrow')}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-eq-ink sm:text-2xl">{t('launchTitle')}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-eq-muted sm:text-base">{t('launchLead')}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {LAUNCH_TILES.map((key) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="eq-text-small text-eq-brand">{t(`launchTiles.${key}.label`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-eq-ink">{t(`launchTiles.${key}.text`)}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-relaxed text-white/45">{t('launchNote')}</p>

          {SHOW_WAITLIST ? (
            <HashLink
              id="espera"
              href="#espera"
              className="eq-neon-cta mt-6 inline-flex h-11 items-center justify-center rounded-full bg-eq-brand px-5 text-sm font-semibold text-white transition hover:bg-eq-brand-strong"
            >
              {t('cta')}
            </HashLink>
          ) : (
            <Link
              href={`/${locale}/about`}
              className="eq-neon-cta mt-6 inline-flex h-11 items-center justify-center rounded-full bg-eq-brand px-5 text-sm font-semibold text-white transition hover:bg-eq-brand-strong"
            >
              {t('secondaryCta')}
            </Link>
          )}
        </article>
      </div>
    </section>
  );
}
