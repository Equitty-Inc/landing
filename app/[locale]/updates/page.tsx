import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GlassCard, Section } from '@/components/landing/Section';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Updates' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

const updateCardSlugs = ['regulatory', 'product', 'ecosystem'] as const;

export default async function UpdatesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Updates' });

  return (
    <div className="bg-background text-white">
      <Section className="pt-14 sm:pt-20" title={t('heroTitle')} description={t('heroSubtitle')}>
        {null}
      </Section>

      <Section title={t('introTitle')} description={t('introBody')}>
        <div className="grid gap-5 md:grid-cols-3">
          {updateCardSlugs.map((slug) => (
            <GlassCard key={slug}>
              <p className="eq-focus-cue text-xs uppercase text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
                {t(`cards.${slug}.title`)}
              </p>
              <p className="mt-2 text-sm text-white/80">{t(`cards.${slug}.body`)}</p>
            </GlassCard>
          ))}
        </div>
      </Section>
    </div>
  );
}
