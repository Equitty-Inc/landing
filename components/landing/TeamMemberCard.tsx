'use client';

import TeamAvatar from '@/components/landing/TeamAvatar';
import { cn } from '@/lib/utils';

type TeamMemberCardProps = {
  name: string;
  role: string;
  bio: string;
  signal?: string;
  photo?: string;
  objectPosition?: string;
  imageScale?: number;
  variant?: 'founder' | 'advisor';
};

export default function TeamMemberCard({
  name,
  role,
  bio,
  signal,
  photo,
  objectPosition,
  imageScale,
  variant = 'founder',
}: TeamMemberCardProps) {
  const isFounder = variant === 'founder';

  return (
    <article
      className={cn(
        'group/card marketplace-card h-full',
        isFounder
          ? 'flex flex-col items-center px-5 py-6 sm:px-6 sm:py-7'
          : 'flex items-start p-3 sm:p-4',
      )}
    >
      <TeamAvatar
        name={name}
        src={photo}
        size={isFounder ? 'founder' : 'square'}
        objectPosition={objectPosition}
        imageScale={imageScale}
      />
      <div
        className={cn(
          'min-w-0',
          isFounder ? 'mt-5 w-full' : 'flex-1 px-3 py-0.5 sm:px-4 sm:py-1',
        )}
      >
        <div className={cn('flex flex-col gap-1', isFounder && 'items-center text-center')}>
          <h4
            className={cn(
              'font-semibold text-eq-ink',
              isFounder ? 'text-lg sm:text-xl' : 'text-sm sm:text-base',
            )}
          >
            {name}
          </h4>
          <p className="eq-text-small text-eq-brand">{role}</p>
        </div>
        <p
          className={cn(
            'mt-3 text-sm leading-relaxed text-eq-muted',
            isFounder && 'text-pretty sm:text-center',
          )}
        >
          {bio}
        </p>
        {signal ? (
          <p className={cn('mt-2 text-xs leading-relaxed text-white/40', isFounder && 'sm:text-center')}>
            {signal}
          </p>
        ) : null}
      </div>
    </article>
  );
}
