import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GlassCard, Section } from '@/components/landing/Section';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Platform' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Platform' });
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@equitty.com';

  const steps = [
    { title: t('discoverTitle'), body: t('discoverText') },
    { title: t('investTitle'), body: t('investText') },
    { title: t('earnTitle'), body: t('earnText') },
    { title: t('exitTitle'), body: t('exitText') },
  ];

  return (
    <div className="bg-background text-white">
      <Section className="pt-14 sm:pt-20" title={t('heroTitle')} description={t('heroSubtitle')}>
        <GlassCard>
          <h2 className="mb-4 text-2xl font-semibold">
            <span className="eq-title-underline">{t('problemTitle')}</span>
          </h2>
          <p className="text-white/80">{t('problemBody')}</p>
          <p className="mt-4 text-white/80">{t('problemBodyTwo')}</p>
        </GlassCard>
      </Section>

      <Section title={t('journeyTitle')}>
        <div className="grid gap-5 lg:grid-cols-4">
          {steps.map((step) => (
            <GlassCard key={step.title} className="space-y-4">
              <p className="eq-focus-cue text-sm font-semibold text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
                {step.title}
              </p>
              <p className="text-sm text-white/80">{step.body}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="mt-7">
          <p className="text-sm text-white/70">{t('disclaimer')}</p>
        </GlassCard>
      </Section>

      <Section>
        <GlassCard className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="eq-title-underline text-lg font-medium">{t('listingCta')}</p>
          <Button asChild variant="brand">
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </Button>
        </GlassCard>
      </Section>
    </div>
  );
}
