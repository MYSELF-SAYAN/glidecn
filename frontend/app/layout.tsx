import './globals.css';
import { Inter, JetBrains_Mono, Space_Grotesk, Caveat } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { GlideCNProvider } from '@/components/glidecn';
import { LenisProvider } from '@/components/lenis-provider';
import { Analytics } from "@vercel/analytics/next"
import { JsonLd } from '@/components/json-ld';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-cursive',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://glidecn.vercel.app'),
  title: {
    default: 'GlideCN — Cinematic Page Transitions for React & Next.js',
    template: '%s | GlideCN',
  },
  description:
    'GlideCN: 68+ GPU-accelerated page transitions for React, Next.js, and Vite. Zero layout shift, shadcn/ui style code ownership. Add cinematic route animations in seconds.',
  keywords: [
    'glidecn',
    'react page transitions',
    'next.js page transitions',
    'react route animations',
    'framer motion transitions',
    'page transition library',
    'shadcn page transitions',
    'react animation library',
    'next.js route animation',
    'view transitions api react',
    'cinematic page transitions',
    'zero layout shift',
    'vite page transitions',
  ],
  authors: [{ name: 'Sayan', url: 'https://x.com/itz_sayan_03' }],
  creator: 'GlideCN',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://glidecn.vercel.app',
    siteName: 'GlideCN',
    title: 'GlideCN — Cinematic Page Transitions for React & Next.js',
    description:
      '68+ GPU-accelerated page transitions with zero layout shift. shadcn/ui style code ownership. Works with Next.js, Vite, React Router.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GlideCN — Cinematic Page Transitions for React',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlideCN — Cinematic Page Transitions for React & Next.js',
    description:
      '68+ GPU-accelerated page transitions with zero layout shift. Works with Next.js, Vite, React Router.',
    creator: '@itz_sayan_03',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://glidecn.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  verification:{
    google:"aJlv5m0r45Zv_SexyuDcdbNz-11YuQHutURMOR7mFv8"
  }
};



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <JsonLd />
        <RootProvider>
          <LenisProvider>
            <GlideCNProvider defaultTransition="fade">
              {children}
              <Analytics />
            </GlideCNProvider>
          </LenisProvider>
        </RootProvider>
      </body>
    </html>
  );
}
