'use client';

import { useTranslations } from 'next-intl';

export default function FeatureHighlight() {
  const t = useTranslations('HomePage.FeatureHighlight');

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="relative mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-br from-[#00B4C4]/10 to-[#0a7a8a]/20 p-12 text-center text-white">
        <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#00B4C4]">
          {t('eyebrow')}
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{t('title')}</h2>
        <p className="mt-6 text-lg leading-relaxed text-white/75">{t('subtitle')}</p>
      </div>
    </section>
  );
}
