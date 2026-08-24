'use client';

import type { MouseEvent, ReactNode } from 'react';
import { scrollToSection } from '@/lib/scrollToSection';

type HashLinkProps = {
  id: string;
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  'aria-current'?: 'page' | undefined;
};

function shouldHandleInPage(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export default function HashLink({
  id,
  href,
  className,
  children,
  onNavigate,
  'aria-current': ariaCurrent,
}: HashLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onClick={(event) => {
        if (shouldHandleInPage(event) && scrollToSection(id)) {
          event.preventDefault();
        }
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}
