'use client';

import { MorphyNextApp as Morphy } from '@/components/morphy/adapters/next-app';
import { FloatingNavbar } from '@/components/landing/floating-navbar';
import { PlaygroundTransitionStudio } from '@/components/playground/transition-studio';
import { SiteFooter } from '@/components/site-footer';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] relative selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f]">
      
      <FloatingNavbar />

      {/* Main Transition Container */}
      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        <Morphy>
          {children}
        </Morphy>
      </main>

      <SiteFooter />

      {/* Floating Transition Studio HUD */}
      <PlaygroundTransitionStudio />

    </div>
  );
}
