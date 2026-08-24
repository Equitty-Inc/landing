'use client';

import { BarChart3, Building2, Layers3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NeonIcon from '@/components/landing/NeonIcon';
import ProductFrame from '@/components/landing/ProductFrame';
import SectionHeading from '@/components/landing/SectionHeading';
import { SHOW_PLATFORM_SHOTS } from '@/lib/landingFlags';

const POINTS = [
  { key: 'point1', icon: Building2, accent: 'cyan' },
  { key: 'point2', icon: BarChart3, accent: 'violet' },
  { key: 'point3', icon: Layers3, accent: 'emerald' },
] as const;

export default function ProductPreview() {
  const t = useTranslations('HomePage.Product');

  return (
    <section id="producto" className="scroll-mt-20 bg-eq-canvas py-16 sm:scroll-mt-24 sm:py-20 lg:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
          {POINTS.map((point) => (
            <article key={point.key} className="eq-glass-panel p-5">
              <NeonIcon icon={point.icon} accent={point.accent} size="sm" />
              <p className="eq-text-small mt-4 text-eq-brand">{t(`${point.key}.label`)}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-eq-ink sm:text-xl">
                {t(`${point.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-eq-muted">{t(`${point.key}.description`)}</p>
            </article>
          ))}
        </div>
        {SHOW_PLATFORM_SHOTS ? (
          <div className="mt-8 sm:mt-12">
            <ProductFrame src="/product/property-cards.webp" alt={t('cardsAlt')} url="equitty.app/marketplace" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
