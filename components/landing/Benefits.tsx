'use client';

import { useTranslations } from 'next-intl';

const BENEFIT_KEYS = ['item1', 'item2', 'item3', 'item4'] as const;

export default function Benefits() {
  const t = useTranslations('HomePage.Benefits');

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#00B4C4]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-white/70">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {BENEFIT_KEYS.map((key) => (
            <article
              key={key}
              className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition hover:border-[#00B4C4]/40"
            >
              <h3 className="text-2xl font-semibold text-white">{t(`${key}.title`)}</h3>
              <p className="mt-3 text-white/70">{t(`${key}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
