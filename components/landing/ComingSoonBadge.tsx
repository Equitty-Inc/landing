type ComingSoonBadgeProps = {
  label: string;
};

export default function ComingSoonBadge({ label }: ComingSoonBadgeProps) {
  return (
    <div className="relative mx-auto mb-6 flex w-full justify-center lg:mb-8 lg:justify-start">
      <span
        className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent shadow-[0_0_20px_rgba(0,180,196,0.22)] sm:text-base"
        style={{ animation: 'glowPulse 2.8s ease-in-out infinite' }}
      >
        {label}
      </span>
    </div>
  );
}
