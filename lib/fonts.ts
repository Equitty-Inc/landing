import localFont from 'next/font/local';

export const alexandria = localFont({
  src: [
    {
      path: '../public/fonts/Alexandria/Alexandria-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Alexandria/Alexandria-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Alexandria/Alexandria-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Alexandria/Alexandria-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-alexandria',
  display: 'swap',
});

export const newBlack = localFont({
  src: [
    {
      path: '../public/fonts/Newblack/NewBlackTypeface-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Newblack/NewBlackTypeface-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Newblack/NewBlackTypeface-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Newblack/NewBlackTypeface-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Newblack/NewBlackTypeface-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-new-black',
  display: 'swap',
});
