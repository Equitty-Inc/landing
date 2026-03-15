'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function FinalCta() {
  const t = useTranslations('HomePage.FinalCta');

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0d1323] to-[#05070f] p-10 text-center text-white">
        <h2 className="text-4xl font-semibold sm:text-5xl">{t('title')}</h2>
        <p className="mt-4 text-lg text-white/70">{t('subtitle')}</p>
        <Link href="#waitlist" className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#00B4C4] px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-[#05070E] transition hover:bg-[#26d1df]" legacyBehavior>
          <span>{t('cta')}</span>
        </Link>
      </div>
    </section>
  );
}
