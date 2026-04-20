import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GlassCard, Section } from '@/components/landing/Section';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Regulatory' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

export default async function RegulatoryPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Regulatory' });

  const pillars = [
    { title: t('pillarOneTitle'), body: t('pillarOneText') },
    { title: t('pillarTwoTitle'), body: t('pillarTwoText') },
    { title: t('pillarThreeTitle'), body: t('pillarThreeText') },
    { title: t('pillarFourTitle'), body: t('pillarFourText') },
  ];

  return (
    <div className="bg-background text-white">
      <Section className="pt-14 sm:pt-20" title={t('heroTitle')} description={t('heroSubtitle')}>
        <div />
      </Section>
      <Section title={t('architectureTitle')}>
        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar) => (
            <GlassCard key={pillar.title} className="space-y-4">
              <h3 className="text-lg font-semibold">
                <span className="eq-title-underline">{pillar.title}</span>
              </h3>
              <p className="text-sm text-white/80">{pillar.body}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
      <Section title={t('launchTitle')}>
        <GlassCard className="space-y-3">
          <p className="eq-focus-cue text-xs font-semibold uppercase text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
            {t('launchTitle')}
          </p>
          <p className="text-sm leading-relaxed text-white/80">{t('launchBody')}</p>
        </GlassCard>
      </Section>
    </div>
  );
}
