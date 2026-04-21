import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import NewsletterForm from '@/components/landing/NewsletterForm';
import { GlassCard, Section } from '@/components/landing/Section';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

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

export default async function UpdatesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Updates' });

  return (
    <div className="bg-background text-white">
      <Section className="pt-14 sm:pt-20" title={t('heroTitle')} description={t('heroSubtitle')}>
        <Button asChild variant="brand" size="lg">
          <Link href="/#newsletter">{t('primaryCta')}</Link>
        </Button>
      </Section>

      <Section title={t('introTitle')} description={t('introBody')}>
        <div className="grid gap-5 md:grid-cols-3">
          <GlassCard>
            <p className="eq-focus-cue text-xs uppercase text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
              Regulatory
            </p>
            <p className="mt-2 text-sm text-white/80">Upcoming CNAD process updates and compliance milestones.</p>
          </GlassCard>
          <GlassCard>
            <p className="eq-focus-cue text-xs uppercase text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
              Product
            </p>
            <p className="mt-2 text-sm text-white/80">Platform architecture, security, and onboarding development progress.</p>
          </GlassCard>
          <GlassCard>
            <p className="eq-focus-cue text-xs uppercase text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
              Ecosystem
            </p>
            <p className="mt-2 text-sm text-white/80">Partnerships, market signals, and regional tokenization insights.</p>
          </GlassCard>
        </div>
      </Section>

      <Section id="newsletter" title={t('primaryCta')}>
        <div className="mx-auto max-w-2xl">
          <NewsletterForm />
        </div>
      </Section>
    </div>
  );
}
