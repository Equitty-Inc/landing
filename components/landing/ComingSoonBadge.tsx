import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type ComingSoonBadgeProps = {
  label: string;
  variant?: 'waitlist' | 'regulatory';
};

export default function ComingSoonBadge({ label, variant = 'waitlist' }: ComingSoonBadgeProps) {
  const isWaitlist = variant === 'waitlist';

  return (
    <span
      className={cn(
        'inline-flex max-w-full shrink-0 items-center gap-2 rounded-full px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase sm:px-3 sm:text-xs',
        isWaitlist
          ? 'border border-eq-brand/50 bg-eq-brand/15 text-eq-brand shadow-[0_0_18px_rgba(0,180,196,0.28)]'
          : 'eq-badge-gold border border-amber-200/70 bg-amber-400/15 text-amber-100',
      )}
    >
      {isWaitlist ? (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inset-0 animate-ping rounded-full bg-eq-brand/80" />
          <span className="relative h-2 w-2 rounded-full bg-eq-brand" />
        </span>
      ) : (
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
      )}
      <span className="truncate">{label}</span>
    </span>
  );
}
