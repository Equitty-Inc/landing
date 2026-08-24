'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Landmark, Layers3, ShieldCheck, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NeonIcon from '@/components/landing/NeonIcon';
import SectionHeading from '@/components/landing/SectionHeading';

const STEPS = [
  { key: 'step1', icon: Landmark, accent: 'cyan' },
  { key: 'step2', icon: Users, accent: 'violet' },
  { key: 'step3', icon: Layers3, accent: 'amber' },
  { key: 'step4', icon: ShieldCheck, accent: 'emerald' },
] as const;

export default function HowItWorks() {
  const t = useTranslations('HomePage.HowItWorks');
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.82', 'end 0.45'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const lineWidth = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <section id="proceso" className="scroll-mt-20 bg-eq-canvas py-16 sm:scroll-mt-24 sm:py-20 lg:py-28">
      <div className="eq-shell">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

        <div ref={trackRef} className="relative mt-10 sm:mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 bottom-6 left-6 z-0 w-0.5 -translate-x-1/2 overflow-hidden bg-white/10 lg:hidden"
          >
            <motion.div
              className="h-full origin-top bg-eq-brand shadow-[0_0_14px_rgba(0,180,196,0.8)]"
              style={{ scaleY: reduceMotion ? 1 : progress }}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 right-[calc((100%-3.75rem)/8)] left-[calc((100%-3.75rem)/8)] z-0 hidden h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/10 lg:block"
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-eq-brand shadow-[0_0_16px_rgba(0,180,196,0.85)]"
              style={{ width: reduceMotion ? '100%' : lineWidth }}
            />
          </div>

          <ol className="relative z-10 grid list-none gap-8 p-0 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.key}
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-x-4 lg:grid-cols-1 lg:gap-x-0"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex justify-center lg:mb-5">
                  <NeonIcon icon={step.icon} accent={step.accent} />
                </div>
                <article className="eq-glass-panel p-5 sm:p-6">
                  <p className="financial-figure text-2xl text-eq-brand sm:text-3xl">{`0${index + 1}`}</p>
                  <h3 className="mt-3 text-lg font-semibold text-eq-ink sm:mt-4 sm:text-xl">{t(`${step.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-eq-muted sm:mt-3">{t(`${step.key}.description`)}</p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
