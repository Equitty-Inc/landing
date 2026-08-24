export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
  if (typeof document === 'undefined') return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : behavior, block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
  return true;
}

export function scrollToTop() {
  if (typeof window === 'undefined') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  window.history.replaceState(null, '', window.location.pathname);
}
