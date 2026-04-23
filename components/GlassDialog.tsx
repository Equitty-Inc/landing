'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type GlassVariant = 'pure' | 'glow' | 'aurora';

interface GlassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  variant?: GlassVariant;
  className?: string;
}

const VARIANTS: Record<GlassVariant, string> = {
  pure: `
    bg-white/10
    backdrop-blur-xl
    border border-white/20
    shadow-xl
  `,
  glow: `
    bg-white/10
    backdrop-blur-xl
    border border-white/20
    shadow-2xl
    shadow-[0_0_60px_rgba(255,255,255,0.18)]
  `,
  aurora: `
    bg-[rgba(5,10,20,0.92)]
    bg-gradient-to-br
    from-cyan-400/[0.12]
    via-purple-500/[0.08]
    to-fuchsia-500/[0.1]
    backdrop-blur-2xl
    border border-[rgba(var(--eq-page-accent-rgb,0,180,196),0.35)]
    shadow-2xl
    shadow-[0_0_60px_rgba(var(--eq-page-accent-rgb,0,180,196),0.22)]
    text-white
  `,
};

export function GlassDialog({
  open,
  onOpenChange,
  children,
  variant = 'aurora',
  className,
}: GlassDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm" />

      <DialogContent
        className={cn(
          'rounded-3xl text-white [&_[data-slot=dialog-close]]:text-white/75 [&_[data-slot=dialog-close]]:hover:text-white [&_[data-slot=dialog-close]]:opacity-90',
          VARIANTS[variant],
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
