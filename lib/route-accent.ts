export const ROUTE_ACCENT_MAP = {
  '/': '#00b4c4',
  '/about': '#4c8d99',
  '/platform': '#006ad6',
  '/regulatory': '#306598',
  '/updates': '#00b4c4',
  '/unsubscribe': '#4c8d99',
} as const;

export function normalizeRoutePath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  const withoutLocale = segments.slice(1);
  if (withoutLocale.length === 0) return '/';
  return `/${withoutLocale[0]}`;
}

export function getRouteAccent(pathname: string): string {
  const routePath = normalizeRoutePath(pathname);
  return ROUTE_ACCENT_MAP[routePath as keyof typeof ROUTE_ACCENT_MAP] ?? ROUTE_ACCENT_MAP['/'];
}

export function hexToRgbString(hex: string): string {
  const normalized = hex.replace('#', '');
  const bigint = Number.parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function parseHexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const bigint = Number.parseInt(normalized, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function srgbToLinear(channel: number): number {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function getContrastingTextColor(hex: string): '#050A14' | '#F8FAFC' {
  const [r, g, b] = parseHexToRgb(hex);
  const luminance = 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  return luminance > 0.5 ? '#050A14' : '#F8FAFC';
}
