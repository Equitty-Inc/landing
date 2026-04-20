import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import NewsletterForm from '@/components/landing/NewsletterForm';
import { GlassCard, Section } from '@/components/landing/Section';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ locale: string }>;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  signal: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return {
    title: `EQUITTY | ${t('heroTitle')}`,
    description: t('heroSubtitle'),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  const teamEntries = t.raw('team') as Record<string, TeamMember>;
  const team = Object.values(teamEntries);
  const board = [
    t('board.sigfredo'),
    t('board.joseLuis'),
    t('board.erick'),
  ];
  const advisors = [t('advisors.nicolas'), t('advisors.ricardo')];
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@equitty.com';

  return (
    <div className="bg-background text-white">
      <Section className="pt-14 sm:pt-20" title={t('heroTitle')} description={t('heroSubtitle')}>
        <div className="grid gap-7 lg:grid-cols-2">
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold">
              <span className="eq-title-underline">{t('missionTitle')}</span>
            </h3>
            <p className="text-white/80">{t('missionText')}</p>
          </GlassCard>
          <GlassCard>
            <h3 className="mb-4 text-lg font-semibold">
              <span className="eq-title-underline">{t('missionTitle')}</span>
            </h3>
            <p className="text-white/80">{t('whyText')}</p>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('foundingTitle')}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <GlassCard key={member.name} className="space-y-4">
              <div className="h-36 rounded-xl border border-white/10 bg-linear-to-br from-white/5 to-white/0" />
              <h3 className="eq-title-underline text-lg font-semibold">{member.name}</h3>
              <p className="text-sm uppercase tracking-[0.2em] text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
                {member.role}
              </p>
              <p className="text-sm text-white/80">{member.bio}</p>
              <p className="text-xs text-white/60">{member.signal}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title={t('boardTitle')} description={t('boardIntro')}>
        <div className="grid gap-5 md:grid-cols-3">
          {board.map((member) => (
            <GlassCard key={member}>
              <p className="eq-keyword text-sm text-white/80">{member}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title={t('advisorsTitle')}>
        <div className="grid gap-5 md:grid-cols-2">
          {advisors.map((advisor) => (
            <GlassCard key={advisor}>
              <p className="eq-keyword text-sm text-white/80">{advisor}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title={t('closingTitle')}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <NewsletterForm />
          <GlassCard className="flex flex-col justify-center gap-4">
            <Button asChild variant="brandGhost">
              <a href={`mailto:${contactEmail}`}>{t('closingSecondary')}</a>
            </Button>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
