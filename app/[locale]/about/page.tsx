import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContentCard, ContentSection } from '@/components/landing/ContentSection';
import PageShell from '@/components/landing/PageShell';
import TeamMemberCard from '@/components/landing/TeamMemberCard';
import { BOARD_SLUGS, TEAM_SLUGS, boardPhotos, teamPhotoPositions, teamPhotoScales, teamPhotos } from '@/lib/team';

type Props = {
  params: Promise<{ locale: string }>;
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
  const team = await getTranslations({ locale, namespace: 'HomePage.Team' });

  return (
    <PageShell>
      <ContentSection className="pt-10 sm:pt-14" title={t('heroTitle')} description={t('heroSubtitle')}>
        <div className="grid gap-4 lg:grid-cols-2">
          <ContentCard>
            <p className="eq-text-small text-eq-brand">{t('missionTitle')}</p>
            <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t('missionText')}</p>
          </ContentCard>
          <ContentCard>
            <p className="eq-text-small text-eq-brand">{t('whyTitle')}</p>
            <p className="mt-3 text-sm leading-relaxed text-eq-muted">{t('whyText')}</p>
          </ContentCard>
        </div>
      </ContentSection>

      <ContentSection id="equipo" title={t('foundingTitle')} headingAs="h2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM_SLUGS.map((slug) => (
            <TeamMemberCard
              key={slug}
              variant="founder"
              name={team(`members.${slug}.name`)}
              role={team(`members.${slug}.role`)}
              bio={team(`members.${slug}.bio`)}
              signal={team(`members.${slug}.signal`)}
              photo={teamPhotos[slug]}
              objectPosition={teamPhotoPositions[slug]}
              imageScale={teamPhotoScales[slug]}
            />
          ))}
        </div>
      </ContentSection>

      <ContentSection title={t('boardTitle')} description={t('boardIntro')} headingAs="h2">
        <div className="grid gap-4 md:grid-cols-2">
          {BOARD_SLUGS.map((slug) => (
            <TeamMemberCard
              key={slug}
              variant="advisor"
              name={team(`advisors.${slug}.name`)}
              role={team(`advisors.${slug}.role`)}
              bio={team(`advisors.${slug}.bio`)}
              photo={boardPhotos[slug]}
              objectPosition={teamPhotoPositions[slug]}
              imageScale={teamPhotoScales[slug]}
            />
          ))}
        </div>
      </ContentSection>
    </PageShell>
  );
}
