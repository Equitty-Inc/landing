'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TESTIMONIALS = [
  { quote: 'Equitty makes investing effortless. Fast transactions and low fees.', author: 'Oscar M.', title: 'Blockchain Analyst' },
  { quote: 'The platform transformed how I manage my assets.', author: 'Sarah Chen', title: 'Investment Manager' },
  { quote: 'Finally a platform designed for serious investors.', author: 'Marcus Johnson', title: 'Portfolio Director' },
];

export default function Testimonials() {
  const t = useTranslations('HomePage.Testimonials');
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-[0.35em] text-[#00B4C4] uppercase">{t('eyebrow')}</p>
          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-white/70">{t('subtitle')}</p>
        </div>

        <div className="relative rounded-[2rem] border border-white/10 bg-[#08070E]/80 p-10 text-center">
          <p className="text-xl leading-relaxed text-white sm:text-2xl">{testimonial.quote}</p>
          <div className="mt-8 text-sm text-white/60">
            <p className="font-semibold text-white">{testimonial.author}</p>
            <p>{testimonial.title}</p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6">
            <button onClick={prev} aria-label="Previous" className="text-white/70 hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} aria-label="Next" className="text-white/70 hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
