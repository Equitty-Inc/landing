'use client';

import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NEON_GLOW_STYLE = {
  boxShadow: '0 0 12px 1px rgba(0, 180, 196, 0.4), 0 0 24px 2px rgba(0, 180, 196, 0.2)',
};

export default function LandingHeader() {
  return (
    <header className="relative flex h-fit w-full flex-col items-center justify-center pt-6 pb-4 sm:pt-8 sm:pb-6">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-17 sm:h-21"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0, 180, 196, 0.25) 0%, rgba(0, 180, 196, 0.08) 40%, transparent 70%)',
        }}
        aria-hidden
      />
      <div className="absolute top-4 left-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 flex items-center justify-center">
        <Image
          src="/logo-accent.png"
          alt="EQUITY"
          width={160}
          height={48}
          className="h-auto w-32 object-contain drop-shadow-[0_0_20px_rgba(0,180,196,0.3)] sm:w-40"
          priority
        />
      </div>
      <div className="w-full h-px min-h-px mt-4 sm:mt-5 bg-linear-to-r from-transparent via-accent to-transparent opacity-90" style={NEON_GLOW_STYLE} aria-hidden />
    </header>
  );
}
