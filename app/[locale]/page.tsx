'use client';

import Image from 'next/image';
import Footer from '@/components/HeroSection/Footer';
import WaitlistForm from '@/components/HeroSection/WaitlistForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { EquittyLogo } from '@/components/Logo';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');

  const lineA = t('hero_title_highlight'); // Real-World
  const lineB = t('hero_title_end');       // Assets
  const full = `${t('hero_title_highlight')} ${t('hero_title_end')}`;

  const [typed, setTyped] = useState('');

  useEffect(() => {
    let alive = true;
    let charTimer: number | undefined;
    let cycleTimer: number | undefined;

    const CYCLE_MS = 8000;

    // Más lento + “humano/teclado”
    const TYPE_MIN = 110;
    const TYPE_MAX = 190;
    const PAUSE_NEWLINE = 450;
    const PAUSE_AFTER_DASH = 220;

    const nextDelay = (ch: string) => {
      if (ch === '\n') return PAUSE_NEWLINE;
      if (ch === '-') return PAUSE_AFTER_DASH;
      if (ch === ' ') return 90 + Math.random() * 60;
      return TYPE_MIN + Math.random() * (TYPE_MAX - TYPE_MIN);
    };

    const run = () => {
      const start = performance.now();
      let i = 1;

      const step = () => {
        if (!alive) return;

        setTyped(full.slice(0, i));

        if (i >= full.length) {
          const spent = performance.now() - start;
          const rest = Math.max(1200, CYCLE_MS - spent);
          cycleTimer = window.setTimeout(() => {
            if (!alive) return;
            setTyped('');
            // arranca el siguiente ciclo
            charTimer = window.setTimeout(run, 250);
          }, rest);
          return;
        }

        const ch = full[i - 1] ?? '';
        i += 1;
        charTimer = window.setTimeout(step, nextDelay(ch));
      };

      // pequeño delay inicial
      charTimer = window.setTimeout(step, 220);
    };

    run();

    return () => {
      alive = false;
      if (charTimer) window.clearTimeout(charTimer);
      if (cycleTimer) window.clearTimeout(cycleTimer);
    };
  }, [full]);


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
       <div className="hero-backdrop hero-scanlines" />
        {/* <div className="hero-shape-3d" aria-hidden="true">
          <div className="hero-tri hero-tri--a" />
          <div className="hero-tri hero-tri--b" />
        </div>*/}
        {/* isotipo glow */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <Image
            src="/equitty_isotipo.png"
            alt=""
            width={700}
            height={700}
            className="w-[70vw] max-w-[500px] animate-pulse-glow md:w-[45vw] opacity-60"
            priority
          />
        </div>

        <div className="z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center lg:grid-cols-2 ">
          {/* Left */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block rounded-full border border-[#00B4C4]/30 bg-[#00B4C4]/10 px-3 py-1 backdrop-blur-sm reveal-up" style={{ animationDelay: '60ms' }}>
              <span className="text-[10px] font-bold tracking-widest text-[#00B4C4] uppercase">
                ● {t('badge')}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-6xl leading-[1.05]">
              <span className="block text-white reveal-up" style={{ animationDelay: '120ms' }}>
                {t('hero_title')}
              </span>

              <span className="block text-white reveal-up" style={{ animationDelay: '200ms' }}>
                {t('hero_title_mid')}
              </span>

              <div className="relative block">
                {/* reserva altura de UNA sola línea */}
                <span className="invisible block whitespace-nowrap">
                  {full}
                </span>

                {/* typed encima */}
                <span className="absolute inset-0 block whitespace-nowrap text-gradient-animated type-glow">
                    {typed}
                  <span className="type-caret" aria-hidden="true" />
                </span>
              </div>
            </h1>

            <p className="max-w-lg text-lg font-light leading-relaxed text-gray-400 mx-auto lg:mx-0 reveal-up" style={{ animationDelay: '420ms' }}>
              {t('subhead')}
            </p>
          </div>

          {/* Right (card) */}
          <div className="mx-auto w-full max-w-[420px] lg:ml-auto reveal-up" style={{ animationDelay: '260ms' }}>
            <div className="glass-panel rounded-2xl border-t border-white/10 p-8">
              <WaitlistForm />
            </div>
          </div>
        </div>
      </main>


      <Footer />
    </div>
  );
}
