'use client';

import { Landmark, ShieldCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('HomePage.Trust');
  const items = [
    { icon: ShieldCheck, label: t('cnad') },
    { icon: Landmark, label: t('salvador') },
    { icon: Users, label: t('team') },
  ];

  return (
    <section className="border-y border-white/10 bg-eq-paper">
      <div className="eq-shell grid grid-cols-1 gap-4 py-5 min-[480px]:grid-cols-3 min-[480px]:gap-4 sm:gap-6 sm:py-6">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex min-w-0 items-center gap-3 text-sm text-eq-muted">
            <span className="eq-icon-halo flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#7ee7f0]/55 bg-eq-brand/10 text-eq-brand">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 text-pretty font-medium leading-snug text-eq-ink">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
