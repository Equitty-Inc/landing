'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type TeamAvatarProps = {
  name: string;
  src?: string;
  size?: 'md' | 'sm' | 'xs' | 'square' | 'founder';
  objectPosition?: string;
  /** Zooms object-cover framing for headshot-style crops (1 = default). */
  imageScale?: number;
  className?: string;
};

const sizeClasses = {
  md: 'h-40 w-40 rounded-2xl sm:h-48 sm:w-48',
  sm: 'h-20 w-20 rounded-2xl sm:h-24 sm:w-24',
  xs: 'h-16 w-16 rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]',
  square: 'h-28 w-28 shrink-0 rounded-xl sm:h-32 sm:w-32',
  founder: 'h-52 w-52 shrink-0 rounded-2xl sm:h-48 sm:w-48 xl:h-40 xl:w-40',
} as const;

const sizePixels = {
  md: 192,
  sm: 96,
  xs: 72,
  square: 128,
  founder: 208,
} as const;

const initialsTextClasses = {
  md: 'text-3xl sm:text-4xl',
  sm: 'text-xl sm:text-2xl',
  xs: 'text-base sm:text-lg',
  square: 'text-2xl',
  founder: 'text-3xl sm:text-4xl',
} as const;

const sizeSrcSet = {
  md: '192px',
  sm: '96px',
  xs: '72px',
  square: '(min-width: 640px) 128px, 112px',
  founder: '(min-width: 1280px) 160px, (min-width: 640px) 192px, 208px',
} as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TeamAvatar({
  name,
  src,
  size = 'md',
  objectPosition = 'center',
  imageScale = 1,
  className,
}: TeamAvatarProps) {
  const [errored, setErrored] = useState(false);
  const initials = getInitials(name);
  const dimension = sizePixels[size];
  const showImage = Boolean(src) && !errored;
  const photoScale = Number.isFinite(imageScale) && imageScale > 0 ? imageScale : 1;

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-white/10 bg-linear-to-br from-white/8 to-white/0 shadow-[0_0_0_1px_rgba(var(--eq-page-accent-rgb,0,180,196),0.08)]',
        sizeClasses[size],
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={name}
          width={dimension}
          height={dimension}
          sizes={sizeSrcSet[size]}
          onError={() => setErrored(true)}
          style={
            {
              objectPosition,
              '--team-photo-scale': String(photoScale),
            } as CSSProperties
          }
          className="h-full w-full origin-center object-cover transition-[filter,transform] duration-500 ease-out [transform:scale(var(--team-photo-scale,1))] group-hover/card:[transform:scale(calc(var(--team-photo-scale,1)*1.04))]"
        />
      ) : (
        <div
          className={cn(
            'flex h-full w-full items-center justify-center font-semibold tracking-wide text-white/55 transition-colors duration-500 group-hover/card:text-[rgb(var(--eq-page-accent-rgb,0,180,196))]',
            initialsTextClasses[size],
          )}
          aria-hidden
        >
          {initials}
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 transition-shadow duration-500 group-hover/card:shadow-[inset_0_0_0_1px_rgba(var(--eq-page-accent-rgb,0,180,196),0.45)]"
        aria-hidden
      />
    </div>
  );
}
