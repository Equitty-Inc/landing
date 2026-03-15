'use client';

import WaitlistForm from '@/components/HeroSection/WaitlistForm';
import LandingFooter from '@/components/landing/LandingFooter';
import LandingHeader from '@/components/landing/LandingHeader';
// import StatsSection from '@/components/landing/StatsSection';
// import FeatureHighlight from '@/components/landing/FeatureHighlight';
// import Benefits from '@/components/landing/Benefits';
// import HowItWorks from '@/components/landing/HowItWorks';
// import Testimonials from '@/components/landing/Testimonials';
// import Faq from '@/components/landing/Faq';
import { sileo } from 'sileo';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const glowRef = useRef<HTMLDivElement>(null);
  const [typedHighlight, setTypedHighlight] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const highlightText = t('hero_title_highlight');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      sileo.success({
        title: t('Toast.welcomeTitle'),
        description: t('Toast.welcomeDescription'),
        position: 'top-right',
        duration: 5000,
        styles: {
          title: 'text-white font-semibold!',
          description: 'text-white/80!',
          badge: 'bg-[#00B4C4]/20 border border-[#00B4C4]/40!',
          button: 'bg-white/15 hover:bg-[#00B4C4]/30!',
        },
      });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [t]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${event.clientX}px`;
      glowRef.current.style.top = `${event.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let charTimer: ReturnType<typeof setTimeout>;
    let resetTimer: ReturnType<typeof setTimeout>;
    let active = true;

    const type = () => {
      if (!active) return;
      setTypedHighlight(highlightText.slice(0, currentIndex));
      if (currentIndex >= highlightText.length) {
        setIsTypingComplete(true);
        resetTimer = window.setTimeout(() => {
          if (!active) return;
          currentIndex = 0;
          setTypedHighlight('');
          setIsTypingComplete(false);
          type();
        }, 3000);
        return;
      }

      currentIndex += 1;
      charTimer = window.setTimeout(type, 120);
    };

    type();

    return () => {
      active = false;
      if (charTimer) window.clearTimeout(charTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [highlightText]);

  return (
    <div className="bg-background dark:bg-background min-h-0 overflow-hidden flex flex-col text-white">
      <div className="dark flex-1 min-h-0 flex flex-col">
        <LandingHeader />

        <div
          ref={glowRef}
          className="fixed z-50 hidden h-8 w-8 rounded-full pointer-events-none lg:block"
          style={{ transform: 'translate(-50%, -50%)', animation: 'glowPulse 2s ease-in-out infinite' }}
        >
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-accent/0 via-accent/30 to-accent/0 blur-xl" />
        </div>

        <section
          className="relative flex h-full max-h-full min-h-0 items-center justify-center overflow-hidden px-6 pt-10 pb-8"
          style={{ animation: 'heroEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-16 left-24 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
            <div className="absolute right-20 bottom-16 h-80 w-80 rounded-full bg-[#00B4C4]/15 blur-[110px]" />
          </div>

          <div className="relative mx-auto grid h-full max-h-full min-h-[85vh] w-full max-w-7xl grid-cols-1 items-center gap-8 overflow-hidden px-2 sm:px-0 lg:min-h-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
            <div className="absolute inset-0 z-0 order-1 flex h-full min-h-[85vh] items-center justify-center pointer-events-none lg:relative lg:z-auto lg:order-2">
              <div className="relative h-full w-full max-w-sm opacity-60 lg:opacity-100">
                <div
                  className="relative mt-12 flex h-full min-h-[60vh] items-center justify-center"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coin-sO3Ncez14Alp6pSHNMcEkTE8VRf9qU.png"
                    alt="Digital assets visualization"
                    className="w-full h-auto object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)] max-h-[50vh] lg:max-h-none"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 order-2 flex w-full min-w-0 min-h-0 flex-col items-center justify-center overflow-y-auto overflow-x-hidden py-8 text-center lg:order-1 lg:items-start lg:justify-start lg:py-0 lg:text-left">
              <div className="flex w-full shrink-0 flex-col items-center space-y-1 lg:items-start">
                {t('badge') ? (
                  <div
                    className="reveal-up inline-flex rounded-full border border-[#00B4C4]/30 bg-[#00B4C4]/10 px-3 py-1 backdrop-blur-sm"
                    style={{ animationDelay: '60ms' }}
                  >
                    <span className="text-[10px] font-bold tracking-widest text-[#00B4C4] uppercase">{t('badge')}</span>
                  </div>
                ) : null}

                <h1 className="mt-6 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-7xl">
                  <span className="reveal-up block" style={{ animationDelay: '120ms' }}>
                    {t('hero_title')}
                  </span>
                  <span className="reveal-up block text-accent" style={{ animationDelay: '200ms' }}>
                    <span className="whitespace-nowrap">
                      {typedHighlight}
                      <span
                        className="ml-1 inline-block h-12 w-1 bg-accent align-text-top"
                        style={{ animation: isTypingComplete ? 'none' : 'blink 0.7s infinite' }}
                      />
                    </span>
                  </span>
                </h1>
              </div>

              <p className="mx-auto max-w-lg pt-2 text-base leading-relaxed text-white/85 sm:pt-4 sm:text-lg lg:mx-0 lg:text-xl">
                {t('subhead')}
              </p>

              <div id="waitlist" className="mx-auto w-full max-w-md pt-6 lg:mx-0">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
        {/* Hidden sections temporarily */}
        {/* <StatsSection /> */}
        {/* <FeatureHighlight /> */}
        {/* <Benefits /> */}
        {/* <HowItWorks /> */}
        {/* <Testimonials /> */}
        {/* <Faq /> */}
        <div
          className="w-full h-px min-h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-90"
          style={{ boxShadow: '0 0 12px 1px rgba(0, 180, 196, 0.4), 0 0 24px 2px rgba(0, 180, 196, 0.2)' }}
          aria-hidden
        />
        <LandingFooter />
      </div>
    </div>
  );
}
