'use client';

import { TrendingUp, Users, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

const ITEMS = [
  { icon: Zap, value: '24/7', descriptionKey: 'Stats.trading' },
  { icon: TrendingUp, value: '7%+', descriptionKey: 'Stats.yield' },
  { icon: Users, value: '10K+', descriptionKey: 'Stats.waitlist' },
];

export default function StatsSection() {
  const t = useTranslations('HomePage');

  return (
    <section className="bg-white/[0.02] border-y border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8 lg:flex-row lg:items-stretch">
        {ITEMS.map(({ icon: Icon, value, descriptionKey }) => (
          <article key={value} className="flex-1 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-black/40 to-black/10 p-8 text-center">
            <Icon className="mx-auto mb-4 h-8 w-8 text-[#00B4C4]/80" />
            <p className="text-4xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm uppercase tracking-widest text-white/70">{t(`Stats.${descriptionKey.split('.').pop()}`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
