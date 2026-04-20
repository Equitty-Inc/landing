'use client';

import UnsubscribeForm from '@/components/UnsubscribeForm';
import { useTranslations } from 'next-intl';

export default function UnsubscribePage() {
  const t = useTranslations('HomePage.Unsubscribe');

  return (
    <div className="bg-background dark:bg-background min-h-full text-white">
      <section className="relative flex flex-1 items-center justify-center px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-24 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute right-20 bottom-16 h-80 w-80 rounded-full bg-[#00B4C4]/15 blur-[110px]" />
        </div>
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-accent/30 backdrop-blur-xl sm:p-12">
          <div className="space-y-5 text-center">
            <p className="eq-focus-cue justify-center text-xs font-semibold uppercase text-[#00B4C4]">
              {t('eyebrow')}
            </p>
            <h1 className="eq-title-underline text-2xl font-semibold sm:text-3xl md:text-4xl">{t('title')}</h1>
            <p className="text-sm text-white/70 sm:text-base">{t('description')}</p>
          </div>
          <div className="mt-10">
            <UnsubscribeForm />
          </div>
        </div>
      </section>
    </div>
  );
}
