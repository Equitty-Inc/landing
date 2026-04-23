'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type TeamAvatarProps = {
  name: string;
  src?: string;
  size?: 'md' | 'sm';
  objectPosition?: string;
};

const sizeClasses = {
  md: 'h-40 w-40 sm:h-48 sm:w-48',
  sm: 'h-24 w-24 sm:h-28 sm:w-28',
} as const;

const sizePixels = {
  md: 192,
  sm: 112,
} as const;

const initialsTextClasses = {
  md: 'text-3xl sm:text-4xl',
  sm: 'text-xl sm:text-2xl',
} as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export default function TeamAvatar({ name, src, size = 'md', objectPosition = 'center' }: TeamAvatarProps) {
  const [errored, setErrored] = useState(false);
  const initials = getInitials(name);
  const dimension = sizePixels[size];
  const showImage = Boolean(src) && !errored;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full border border-white/10 bg-linear-to-br from-white/8 to-white/0 shadow-[0_0_0_1px_rgba(var(--eq-page-accent-rgb,0,180,196),0.08)]',
        sizeClasses[size],
      )}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={name}
          width={dimension}
          height={dimension}
          sizes={`(min-width: 640px) ${dimension}px, ${Math.round(dimension * 0.8)}px`}
          onError={() => setErrored(true)}
          style={{ objectPosition }}
          className="h-full w-full object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover/card:grayscale-0 group-hover/card:scale-[1.04]"
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
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 transition-shadow duration-500 group-hover/card:shadow-[inset_0_0_0_1px_rgba(var(--eq-page-accent-rgb,0,180,196),0.45)]"
        aria-hidden
      />
    </div>
  );
}
