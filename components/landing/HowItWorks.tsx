'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('HomePage.HowItWorks');
  const stepKeys = ['step1', 'step2', 'step3', 'step4'] as const;

  return (
    <section className="bg-white/[0.02] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.35em] text-[#00B4C4] uppercase">{t('eyebrow')}</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {stepKeys.map((key, index) => (
            <article key={key} className="relative rounded-[1.8rem] border border-white/10 bg-[#0f1a2a]/80 p-8">
              <div className="text-4xl font-semibold text-[#00B4C4]/70">{`0${index + 1}`}</div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{t(`${key}.title`)}</h3>
              <p className="mt-3 text-white/65">{t(`${key}.description`)}</p>
              {index < 3 && (
                <div className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#00B4C4]/40 bg-[#00B4C4]/10 text-[#00B4C4] lg:flex">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
