'use client';

import LandingFooter from '@/components/landing/LandingFooter';
import LandingHeader from '@/components/landing/LandingHeader';
import UnsubscribeForm from '@/components/UnsubscribeForm';
import { useTranslations } from 'next-intl';

export default function UnsubscribePage() {
  const t = useTranslations('HomePage.Unsubscribe');

  return (
    <div className="bg-background dark:bg-background min-h-screen text-white">
      <LandingHeader />
      <section className="relative flex flex-1 items-center justify-center px-6 pb-12 pt-10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-16 left-24 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute right-20 bottom-16 h-80 w-80 rounded-full bg-[#00B4C4]/15 blur-[110px]" />
        </div>
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-accent/30 backdrop-blur-xl">
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold tracking-[0.35em] text-[#00B4C4] uppercase">{t('eyebrow')}</p>
            <h1 className="text-3xl font-semibold md:text-4xl">{t('title')}</h1>
            <p className="text-base text-white/70">{t('description')}</p>
          </div>
          <div className="mt-8">
            <UnsubscribeForm />
          </div>
        </div>
      </section>
      <LandingFooter />
    </div>
  );
}
