'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/landing/SectionHeading';
import TeamMemberCard from '@/components/landing/TeamMemberCard';
import {
  BOARD_SLUGS,
  TEAM_SLUGS,
  boardPhotos,
  teamPhotoPositions,
  teamPhotoScales,
  teamPhotos,
} from '@/lib/team';

export default function Team() {
  const t = useTranslations('HomePage.Team');

  return (
    <section id="equipo" className="scroll-mt-20 bg-eq-paper py-16 sm:scroll-mt-24 sm:py-20 lg:py-24">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div className="mt-8 grid gap-4 border-y border-white/8 py-6 lg:grid-cols-2 lg:gap-8 lg:py-7">
          <article>
            <p className="eq-text-small text-eq-brand">{t('missionTitle')}</p>
            <p className="mt-2 text-sm leading-relaxed text-eq-muted">{t('missionText')}</p>
          </article>
          <article>
            <p className="eq-text-small text-eq-brand">{t('whyTitle')}</p>
            <p className="mt-2 text-sm leading-relaxed text-eq-muted">{t('whyText')}</p>
          </article>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl tracking-tight text-eq-ink sm:text-2xl">{t('foundingTitle')}</h3>
            <p className="mt-1 max-w-xl text-sm text-eq-muted">{t('foundingIntro')}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM_SLUGS.map((slug) => (
            <TeamMemberCard
              key={slug}
              variant="founder"
              name={t(`members.${slug}.name`)}
              role={t(`members.${slug}.role`)}
              bio={t(`members.${slug}.bio`)}
              signal={t(`members.${slug}.signal`)}
              photo={teamPhotos[slug]}
              objectPosition={teamPhotoPositions[slug]}
              imageScale={teamPhotoScales[slug]}
            />
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl tracking-tight text-eq-ink sm:text-2xl">{t('boardTitle')}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-eq-muted">{t('boardIntro')}</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {BOARD_SLUGS.map((slug) => (
            <TeamMemberCard
              key={slug}
              variant="advisor"
              name={t(`advisors.${slug}.name`)}
              role={t(`advisors.${slug}.role`)}
              bio={t(`advisors.${slug}.bio`)}
              photo={boardPhotos[slug]}
              objectPosition={teamPhotoPositions[slug]}
              imageScale={teamPhotoScales[slug]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
