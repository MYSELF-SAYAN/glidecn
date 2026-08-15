import './globals.css';
import { Inter, JetBrains_Mono, Space_Grotesk, Caveat } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { GlideCNProvider, GlideCN } from '@/components/glidecn';
import { LenisProvider } from '@/components/lenis-provider';
import { Analytics } from "@vercel/analytics/next"
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
  title: {
    default: 'GlideCN — Beautiful Page Transitions for React',
    template: '%s | GlideCN',
  },
  description:
    'An open-source React page transition library with a pluggable architecture, inspired by the developer experience of shadcn/ui.',
  keywords: [
    'react',
    'page transitions',
    'framer motion',
    'next.js',
    'animation',
    'open source',
  ],
};



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <RootProvider>
          <LenisProvider>
            <GlideCNProvider defaultTransition="liquid-morph">
              <GlideCN>
                {children}
              </GlideCN>
              <Analytics />
            </GlideCNProvider>
          </LenisProvider>
        </RootProvider>
      </body>
    </html>
  );
}
