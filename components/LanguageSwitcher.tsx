'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: string) => {
    // Reemplaza el locale inicial: /en/... -> /es/...
    const prefix = `/${locale}`;
    if (pathname.startsWith(prefix)) {
      return pathname.replace(prefix, `/${newLocale}`);
    }
    // fallback
    return `/${newLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  const Item = ({ code }: { code: 'en' | 'es' }) => {
    const isActive = locale === code;

    return (
      <Link
        href={getLocalizedPath(code)}
        scroll={false}
        aria-label={code === 'en' ? 'Switch to English' : 'Cambiar a Español'}
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
  };

  return (
    <div className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
      <Item code="es" />
      <Item code="en" />
    </div>
  );
}
