import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AsciiNeonBackdrop from '@/components/landing/AsciiNeonBackdrop';
import HeroAsciiArt from '@/components/landing/HeroAsciiArt';
import NewsletterForm from '@/components/landing/NewsletterForm';
import { GlassCard, Section } from '@/components/landing/Section';
import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/ui/typewriter';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const tHome = await getTranslations({ locale, namespace: 'Home' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const tNewsletter = await getTranslations({ locale, namespace: 'Newsletter' });

  const investorBullets = [
    tHome('investorsBulletOne'),
    tHome('investorsBulletTwo'),
    tHome('investorsBulletThree'),
    tHome('investorsBulletFour'),
  ];
  const partnerBullets = [
    tHome('partnersBulletOne'),
    tHome('partnersBulletTwo'),
    tHome('partnersBulletThree'),
    tHome('partnersBulletFour'),
  ];

  return (
    <div className="relative overflow-x-hidden bg-background text-white">
      <AsciiNeonBackdrop />
      <div className="relative z-10">
        <Section className="pt-14 sm:pt-20">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,26rem)] lg:items-center lg:gap-x-16 lg:gap-y-7">
            <h1 className="order-1 text-3xl font-bold leading-tight sm:text-5xl lg:col-start-1 lg:row-start-1 lg:text-6xl">
              <span className="eq-title-underline">{tHome('heroTitlePrefix')}</span>{' '}
              <span className="eq-typewriter-neon">
                <Typewriter
                  words={tHome.raw('heroTitleRotating') as string[]}
                  speed={70}
                  delayBetweenWords={2400}
                  cursorChar="▌"
                />
              </span>
            </h1>
            <p className="order-2 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg lg:col-start-1 lg:row-start-2">
              {tHome('heroSubtitle')}
            </p>
            <div className="order-3 flex justify-center lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:justify-end lg:self-center">
              <HeroAsciiArt />
            </div>
            <div className="order-4 flex flex-wrap gap-3 lg:col-start-1 lg:row-start-3">
              <Button asChild variant="brand" size="lg">
                <Link href="/#newsletter">{tHome('primaryCta')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white/25 bg-white/5 text-white/90 hover:bg-white/10 hover:text-white">
                <Link href="/about">{tHome('secondaryCta')}</Link>
              </Button>
            </div>
          </div>

          <div
            className="mt-10 border-t border-white/5 pt-5 lg:mt-14"
            aria-label={tHome('statusStripLabel')}
          >
            <div className="flex flex-col gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-white/45 md:flex-row md:flex-wrap md:items-center">
              <span className="text-[10px] font-medium tracking-[0.22em] text-white/35">
                {tHome('statusStripLabel')}
              </span>
              {[
                tCommon('platformStatus'),
                tCommon('daspStatus'),
                tCommon('investmentsStatus'),
              ].map((status) => (
                <span key={status} className="flex items-center gap-2">
                  <span
                    className="h-1 w-1 rounded-full bg-white/30"
                    aria-hidden
                  />
                  <span className="normal-case tracking-normal">{status}</span>
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section title={tHome('opportunityTitle')}>
          <div className="space-y-7">
            <p className="text-base leading-relaxed text-white/80">{tHome('opportunityParagraphOne')}</p>
            <p className="text-base leading-relaxed text-white/80">{tHome('opportunityParagraphTwo')}</p>
            <div className="grid gap-5 md:grid-cols-3">
              {[tHome('statsOne'), tHome('statsTwo'), tHome('statsThree')].map((metric) => (
                <GlassCard key={metric}>
                  <p className="financial-figure eq-keyword text-lg font-semibold text-white">{metric}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Section>

        <Section title={tHome('buildingTitle')} description={tHome('buildingSubtitle')}>
          <div className="grid gap-7 lg:grid-cols-2">
            <GlassCard>
              <h3 className="mb-5 text-xl font-semibold">
                <span className="eq-title-underline">{tHome('investorsColumnTitle')}</span>
              </h3>
              <ul className="space-y-4 text-sm text-white/80">
                {investorBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <h3 className="mb-5 text-xl font-semibold">
                <span className="eq-title-underline">{tHome('partnersColumnTitle')}</span>
              </h3>
              <ul className="space-y-4 text-sm text-white/80">
                {partnerBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </Section>

        <Section id="newsletter" title={tNewsletter('title')} description={tNewsletter('description')}>
          <div className="mx-auto max-w-2xl">
            <NewsletterForm />
          </div>
        </Section>
      </div>
    </div>
  );
}
