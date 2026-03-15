'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Faq() {
  const t = useTranslations('HomePage.Faq');
  const [openIndex, setOpenIndex] = useState(-1);
  const faqKeys = ['item1', 'item2', 'item3', 'item4'] as const;

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-[0.35em] text-[#00B4C4] uppercase">{t('eyebrow')}</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-white/70">{t('subtitle')}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {faqKeys.map((key, index) => {
            const open = openIndex === index;
            return (
              <article key={key} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-white">{t(`${key}.question`)}</span>
                  {open ? <Minus className="h-5 w-5 text-[#00B4C4]" /> : <Plus className="h-5 w-5 text-[#00B4C4]" />}
                </button>
                {open && <div className="border-t border-white/10 px-6 py-5 text-white/65">{t(`${key}.answer`)}</div>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
