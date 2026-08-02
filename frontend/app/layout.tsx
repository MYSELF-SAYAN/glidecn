import './globals.css';
import { Inter, JetBrains_Mono, Space_Grotesk, Caveat } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { MorphyProvider } from '@/components/morphy';
import { LenisProvider } from '@/components/lenis-provider';

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
    default: 'Morphy — Beautiful Page Transitions for React',
    template: '%s | MorphyJS',
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
            <MorphyProvider defaultTransition="fade">
              {children}
            </MorphyProvider>
          </LenisProvider>
        </RootProvider>
      </body>
    </html>
  );
}
