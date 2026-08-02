'use client';

import Link from 'next/link';
import { MorphyNextApp as Morphy } from '@/components/morphy/adapters/next-app';
import { usePathname } from 'next/navigation';
import { FloatingNavbar } from '@/components/landing/floating-navbar';
import { PlaygroundTransitionStudio } from '@/components/playground/transition-studio';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPage1 = pathname.includes('page-1') || pathname === '/playground';
  const otherPage = isPage1 ? '/playground/page-2' : '/playground/page-1';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] relative selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f]">
      
      <FloatingNavbar />

      {/* Main Transition Container */}
      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        <Morphy>
          {children}
        </Morphy>
      </main>

      {/* Floating Transition Studio HUD */}
      <PlaygroundTransitionStudio />

    </div>
  );
}
