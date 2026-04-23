'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { cn } from '@/lib/utils';

const toasterStyle = {
  '--normal-bg': 'rgba(26, 25, 40, 0.97)',
  '--normal-text': '#ffffff',
  '--normal-border': 'rgba(255, 255, 255, 0.14)',
  '--success-bg':
    'linear-gradient(135deg, rgb(0, 180, 196) 0%, rgb(0, 106, 214) 100%)',
  '--success-border': 'rgba(255, 255, 255, 0.35)',
  '--success-text': '#ffffff',
  '--error-bg':
    'linear-gradient(135deg, rgb(244, 63, 94) 0%, rgb(220, 38, 38) 100%)',
  '--error-border': 'rgba(255, 255, 255, 0.35)',
  '--error-text': '#ffffff',
  '--border-radius': 'var(--radius)',
} as React.CSSProperties;

const Toaster = ({ className, style, ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();
  const theme: ToasterProps['theme'] = resolvedTheme === 'light' ? 'light' : 'dark';

  return (
    <Sonner
      {...props}
      theme={theme}
      className={cn('toaster group', className)}
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{ ...toasterStyle, ...style }}
    />
  );
};

export { Toaster };
