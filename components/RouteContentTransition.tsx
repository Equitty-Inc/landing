'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function RouteContentTransition({ children }: Props) {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    const el = ref.current;
    if (!el) return;

    // Reset the CSS animation by removing it, forcing a reflow, then restoring it.
    // This is a standard DOM technique to replay a CSS animation without remounting.
    el.style.animationName = 'none';
    void el.offsetHeight;
    el.style.animationName = '';
  }, [pathname]);

  return (
    <main ref={ref} className="flex-1 route-enter">
      {children}
    </main>
  );
}
