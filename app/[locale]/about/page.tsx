import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import NewsletterForm from '@/components/landing/NewsletterForm';
import { GlassCard, Section } from '@/components/landing/Section';
import TeamAvatar from '@/components/landing/TeamAvatar';
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

type BoardMember = {
  name: string;
  role: string;
  bio: string;
};

type Advisor = {
  name: string;
  role: string;
  bio?: string;
};

const teamPhotos: Record<string, string> = {
  martin: '/team/martin.png',
  josh: '/team/josh.png',
  mario: '/team/mario.png',
  oscar: '/team/oscar.png',
};

const teamPhotoPositions: Record<string, string> = {
  oscar: 'center 18%',
};

const boardPhotos: Record<string, string> = {
  sigfredo: '/team/sigfredo.jpg',
  joseLuis: '/team/joseLuis.png',
  erick: '/team/erick.jpg',
};

const boardPhotoPositions: Record<string, string> = {};

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

  const team = Object.entries(t.raw('team') as Record<string, TeamMember>);
  const board = Object.entries(t.raw('board') as Record<string, BoardMember>);
  const advisors = Object.entries(t.raw('advisors') as Record<string, Advisor>);
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
              <span className="eq-title-underline">{t('whyTitle')}</span>
            </h3>
            <p className="text-white/80">{t('whyText')}</p>
          </GlassCard>
        </div>
      </Section>

      <Section title={t('foundingTitle')}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(([slug, member]) => (
            <GlassCard
              key={slug}
              className="group/card flex flex-col items-center gap-3 text-center"
            >
              <TeamAvatar
                name={member.name}
                src={teamPhotos[slug]}
                size="md"
                objectPosition={teamPhotoPositions[slug]}
              />
              <h3 className="mt-2 text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
                {member.role}
              </p>
              <p className="text-sm leading-relaxed text-white/80">{member.bio}</p>
              <p className="text-xs leading-relaxed text-white/55">{member.signal}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title={t('boardTitle')} description={t('boardIntro')}>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {board.map(([slug, member]) => (
            <GlassCard
              key={slug}
              className="group/card flex flex-col items-center gap-3 text-center"
            >
              <TeamAvatar
                name={member.name}
                src={boardPhotos[slug]}
                size="sm"
                objectPosition={boardPhotoPositions[slug]}
              />
              <h3 className="mt-1 text-base font-semibold text-white">{member.name}</h3>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
                {member.role}
              </p>
              <p className="text-sm leading-relaxed text-white/75">{member.bio}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title={t('advisorsTitle')}>
        <div className="grid gap-5 sm:grid-cols-2">
          {advisors.map(([slug, advisor]) => (
            <GlassCard key={slug} className="flex flex-col gap-2">
              <h3 className="text-base font-semibold text-white">{advisor.name}</h3>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[rgb(var(--eq-page-accent-rgb,0,180,196))]">
                {advisor.role}
              </p>
              {advisor.bio ? (
                <p className="text-sm leading-relaxed text-white/75">{advisor.bio}</p>
              ) : null}
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section title={t('closingTitle')}>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <NewsletterForm />
          <GlassCard className="flex w-full flex-col gap-4">
            <Button asChild variant="brandGhost">
              <a href={`mailto:${contactEmail}`}>{t('closingSecondary')}</a>
            </Button>
          </GlassCard>
        </div>
      </Section>
    </div>
  );
}
