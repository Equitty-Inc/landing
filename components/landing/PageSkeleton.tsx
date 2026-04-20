type PageSkeletonProps = {
  compact?: boolean;
};

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-white/8 ${className}`} aria-hidden />;
}

export default function PageSkeleton({ compact = false }: PageSkeletonProps) {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <SkeletonBlock className="h-4 w-28 rounded-full" />
        <SkeletonBlock className="h-10 w-full max-w-3xl" />
        <SkeletonBlock className="h-5 w-full max-w-4xl" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonBlock className="h-36" />
          <SkeletonBlock className="h-36" />
          {compact ? null : <SkeletonBlock className="h-36" />}
        </div>
        <SkeletonBlock className="h-48 w-full" />
      </div>
    </div>
  );
}
