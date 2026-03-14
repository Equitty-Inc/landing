'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LocaleCode = 'en' | 'es';

function LanguageItem({
  code,
  locale,
  href,
}: {
  code: LocaleCode;
  locale: string;
  href: string;
}) {
  const isActive = locale === code;

  return (
    <Link
      href={href}
      scroll={false}
      aria-label={code === 'en' ? 'Switch to English' : 'Cambiar a Espanol'}
      aria-current={isActive ? 'page' : undefined}
      className={`relative z-10 rounded-full px-3 py-1 text-[11px] font-bold tracking-widest transition-colors ${
        isActive ? 'text-[#050A14]' : 'text-slate-400 hover:text-white'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeLang"
          className="absolute inset-0 rounded-full bg-[#00B4C4] shadow-[0_0_10px_rgba(0,180,196,0.35)]"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        />
      )}
      <span className="relative z-10 uppercase">{code}</span>
    </Link>
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: LocaleCode) => {
    const prefix = `/${locale}`;
    if (pathname.startsWith(prefix)) {
      return pathname.replace(prefix, `/${newLocale}`);
    }

    return `/${newLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  return (
    <div className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
      <LanguageItem code="es" locale={locale} href={getLocalizedPath('es')} />
      <LanguageItem code="en" locale={locale} href={getLocalizedPath('en')} />
    </div>
  );
}
