'use client';

import WaitlistForm from '@/components/HeroSection/WaitlistForm';
import ComingSoonBadge from '@/components/landing/ComingSoonBadge';
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
    let charTimer: number | undefined;
    let resetTimer: number | undefined;
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

          <div className="relative mx-auto w-full max-w-7xl px-2 sm:px-0">
            <ComingSoonBadge label={t('badge')} />
            <div className="grid h-full min-h-[85vh] items-center lg:min-h-0 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-12">
              <div className="order-2 row-start-1 col-start-1 lg:order-1 lg:row-auto lg:col-auto relative z-20 flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
                <div className="flex w-full flex-col items-center space-y-0.5 sm:space-y-1 lg:items-start">
                  <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
                    {t('hero_title')}
                  </h1>
                  <div className="flex h-24 min-h-[5.5rem] w-full items-center justify-center lg:justify-start">
                    <div className="inline-flex items-center gap-2 text-4xl font-bold text-accent sm:text-5xl lg:text-7xl">
                      <span className="whitespace-nowrap block">{typedHighlight}</span>
                      <span
                        className="inline-flex items-center justify-center rounded-sm bg-accent"
                        style={{
                          width: 3,
                          height: 80,
                          animation: isTypingComplete ? 'none' : 'blink 0.7s infinite',
                        }}
                      >
                        <span className="block h-full w-full" />
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-2 max-w-lg text-base leading-relaxed text-white/85 sm:mt-4 sm:text-lg lg:text-xl">
                  {t('subhead')}
                </p>

                <div className="mt-6 w-full max-w-md">
                  <WaitlistForm />
                </div>
              </div>

              <div className="order-1 row-start-1 col-start-1 lg:order-2 lg:row-auto lg:col-auto relative z-0 flex h-full min-h-[85vh] items-center justify-center pointer-events-none">
                <div className="relative w-full max-w-sm opacity-25 lg:opacity-100">
                  <div
                    className="relative h-full min-h-[60vh] lg:min-h-0 flex items-center justify-center"
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
