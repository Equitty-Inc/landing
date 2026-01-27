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
    bg-gradient-to-br
    from-cyan-400/10
    via-purple-500/10
    to-fuchsia-500/10
    backdrop-blur-2xl
    border border-white/20
    shadow-2xl
    shadow-[0_0_80px_rgba(168,85,247,0.35)]
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

      <DialogContent className={cn('rounded-3xl text-white', VARIANTS[variant], className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
