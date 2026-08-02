'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      prevent: (node) => {
        if (!node) return false;
        // Never hijack scrolling for any element or parent that is scrollable, sidebar, code blocks, or marked with data-lenis-prevent
        const element = node as HTMLElement;
        return (
          element.hasAttribute?.('data-lenis-prevent') ||
          Boolean(element.closest?.('[data-lenis-prevent]')) ||
          Boolean(element.closest?.('aside')) ||
          Boolean(element.closest?.('.custom-scrollbar')) ||
          Boolean(element.closest?.('[data-scrollable]')) ||
          Boolean(element.closest?.('pre')) ||
          Boolean(element.closest?.('code'))
        );
      },
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
