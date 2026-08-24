import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { alexandria, newBlack } from '@/lib/fonts';
import { SileoToaster } from '@/components/SileoToaster';
import { Toaster } from '@/components/ui/sonner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09080d',
};

const BASE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://equitty.vercel.app')
).replace(/\/$/, '');

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(BASE_URL),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords')
      .split(',')
      .map((k: string) => k.trim()),
    authors: [{ name: 'Equitty Team' }],
    robots: 'index, follow',
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      siteName: 'Equitty',
      url: `${BASE_URL}/${locale}`,
          images: [
            {
              url: '/equitty_isotipo.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@equitty',
      images: ['/equitty_isotipo.png'],
    },
    alternates: {
      languages: {
        en: '/en',
        es: '/es',
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className="dark bg-eq-canvas">
      <head>
        <link
          rel="preload"
          href="/fonts/Alexandria/Alexandria-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Newblack/NewBlackTypeface-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body className={`${alexandria.variable} ${newBlack.variable} min-h-dvh bg-eq-canvas font-sans antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <SileoToaster />
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            className: 'w-[calc(100vw-1rem)] max-w-none mx-auto',
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
