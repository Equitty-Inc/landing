'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getContrastingTextColor, getRouteAccent, hexToRgbString } from '@/lib/route-accent';

export default function RouteAccentProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const accent = getRouteAccent(pathname);
    const accentRgb = hexToRgbString(accent);
    const accentContrast = getContrastingTextColor(accent);

    document.documentElement.style.setProperty('--eq-page-accent', accent);
    document.documentElement.style.setProperty('--eq-page-accent-rgb', accentRgb);
    document.documentElement.style.setProperty('--eq-page-accent-contrast', accentContrast);
  }, [pathname]);

  return null;
}
