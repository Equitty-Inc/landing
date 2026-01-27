import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { alexandria, newBlack } from '@/lib/fonts';
import { Toaster } from '@/components/ui/sonner';
import VideoBackground from '@/components/VideoBackground';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://equitty.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
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
          url: '/Equitty_logo_blue_background.png',
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
      images: ['/Equitty_logo_blue_background.png'],
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
    <html lang={locale} className="bg-[#050A14]">
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
        <link rel="preload" href="/background.mp4" as="video" type="video/mp4" />
        <link rel="dns-prefetch" href="//vercel.com" />
      </head>
      <body className={`${alexandria.variable} ${newBlack.variable} min-h-dvh bg-[#050A14] antialiased`}>
      {/* <VideoBackground key="video-bg" /> */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className: 'w-[calc(100vw-1rem)] max-w-none mx-auto',
          }}
        />
      </body>
    </html>
  );
}
