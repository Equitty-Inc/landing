'use client';

import Image from 'next/image';
import Footer from '@/components/HeroSection/Footer';
import WaitlistForm from '@/components/HeroSection/WaitlistForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { EquittyLogo } from '@/components/Logo';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-transparent text-white">
      {/* NAV fijo */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#050A14]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="group hover:scale-105 transition-transform duration-300"
          >
            <EquittyLogo className="h-6 text-white group-hover:drop-shadow-[0_0_15px_rgba(0,180,196,0.6)]" />
          </button>

          {/* Aquí luego estilizamos LanguageSwitcher para que sea tipo pill */}
          <LanguageSwitcher />
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative flex flex-1 items-center justify-center px-6 pb-12 pt-24">
        {/* isotipo glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <Image
            src="/equitty_isotipo.png"
            alt=""
            width={700}
            height={700}
            className="w-[70vw] max-w-[500px] animate-pulse-glow md:w-[45vw]"
            priority
          />
        </div>

        <div className="z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block rounded-full border border-[#00B4C4]/30 bg-[#00B4C4]/10 px-3 py-1 backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-widest text-[#00B4C4] uppercase">
                ●  {t('badge')}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl leading-[1.05]">
              <span className="block text-white">{t('hero_title')}</span>
              <span className="block text-white">{t('hero_title_mid')}</span>

              <span className="block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {t('hero_title_highlight')}
              </span>

                          <span className="block bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {t('hero_title_end')}
              </span>
            </h1>

            <p className="max-w-lg text-lg font-light leading-relaxed text-gray-400 mx-auto lg:mx-0">
              {t('subhead')}
            </p>
          </div>

          {/* Right (card) */}
          <div className="mx-auto w-full max-w-[420px] lg:ml-auto">
            <div className="glass-panel rounded-2xl border-t border-white/10 p-8">
              {/* Mantienes el form existente (ya inserta en DB) */}
              <WaitlistForm />

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
