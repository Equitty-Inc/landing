import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  eyebrow,
  description,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('px-4 py-14 sm:px-6 sm:py-20 lg:py-24', className)}>
      <div className={cn('mx-auto w-full max-w-7xl', containerClassName)}>
        {eyebrow || title || description ? (
          <header className="mb-10 space-y-4 sm:mb-12 sm:space-y-5">
            {eyebrow ? (
              <p className="eq-focus-cue text-xs font-semibold uppercase text-[rgb(var(--eq-page-accent-rgb,0,180,196))] sm:text-[0.78rem]">
                {eyebrow}
              </p>
            ) : null}
            {title ? <h2 className="eq-title-underline text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">{title}</h2> : null}
            {description ? <p className="max-w-4xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">{description}</p> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}

type GlassCardProps = {
  className?: string;
  children: ReactNode;
  tone?: GlassCardTone;
  icon?: ReactNode;
  hover?: boolean;
};

type GlassCardTone = 'page' | 'primary' | 'blue' | 'violet' | 'emerald' | 'amber' | 'orange' | 'rose';

const glassCardToneRgbMap: Record<GlassCardTone, string> = {
  page: 'var(--eq-page-accent-rgb, 0, 180, 196)',
  primary: '0, 180, 196',
  blue: '59, 130, 246',
  violet: '139, 92, 246',
  emerald: '16, 185, 129',
  amber: '245, 158, 11',
  orange: '249, 115, 22',
  rose: '244, 63, 94',
};

const glassCardToneIconClassMap: Record<GlassCardTone, string> = {
  page: 'border-[rgba(var(--eq-page-accent-rgb,0,180,196),0.25)] bg-[rgba(var(--eq-page-accent-rgb,0,180,196),0.1)] text-[rgb(var(--eq-page-accent-rgb,0,180,196))]',
  primary: 'border-primary/25 bg-primary/10 text-primary',
  blue: 'border-blue-500/25 bg-blue-500/10 text-blue-300',
  violet: 'border-violet-500/25 bg-violet-500/10 text-violet-300',
  emerald: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  amber: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  orange: 'border-orange-500/25 bg-orange-500/10 text-orange-300',
  rose: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
};

export function GlassCard({ className, children, tone = 'page', icon, hover = true }: GlassCardProps) {
  const accentRgb = glassCardToneRgbMap[tone];

  return (
    <article
      className={cn('glass-surface p-5 sm:p-7', hover && 'glass-hover', className)}
      style={{ '--glass-accent-rgb': accentRgb } as CSSProperties}
    >
      {icon ? (
        <div
          className={cn(
            'mb-4 inline-flex items-center justify-center rounded-sm border p-2.5',
            glassCardToneIconClassMap[tone],
          )}
        >
          {icon}
        </div>
      ) : null}
      {children}
    </article>
  );
}
