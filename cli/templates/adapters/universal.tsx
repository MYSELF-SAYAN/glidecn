'use client';

/* ==========================================================================
 * Morphy — Universal / Framework-Agnostic Adapter
 * Works seamlessly with TanStack Router, Wouter, Astro, or any React SPA.
 * Requires ZERO Next.js dependencies.
 * ========================================================================== */

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export interface UniversalMorphyProps {
  children: ReactNode;
  /** Unique key representing current route/view (e.g. pathname or route ID) */
  routeKey?: string;
  /** AnimatePresence mode: "wait" ensures exit animation completes before enter */
  mode?: 'wait' | 'sync' | 'popLayout';
  /** Optional className for the transition container */
  className?: string;
  /** Enable automatic scroll restoration */
  restoreScroll?: boolean;
}

export function MorphyUniversal({
  children,
  routeKey,
  mode = 'wait',
  className = 'w-full flex-1 flex flex-col',
  restoreScroll = true,
}: UniversalMorphyProps) {
  // Auto-detect browser path if routeKey is not explicitly passed
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return routeKey ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  });

  const activeKey = routeKey ?? currentPath;

  useEffect(() => {
    if (routeKey !== undefined) {
      setCurrentPath(routeKey);
      return;
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [routeKey]);

  useEffect(() => {
    if (!restoreScroll || typeof window === 'undefined') return;
    return () => {
      sessionStorage.setItem(`morphy-scroll-${activeKey}`, window.scrollY.toString());
    };
  }, [activeKey, restoreScroll]);

  const handleExitComplete = () => {
    if (!restoreScroll || typeof window === 'undefined') return;
    if (window.location.hash) return;

    const savedScroll = sessionStorage.getItem(`morphy-scroll-${activeKey}`);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence mode={mode} initial={false} onExitComplete={handleExitComplete}>
      <div key={activeKey} className={className}>
        {children}
      </div>
    </AnimatePresence>
  );
}

// Alias for convenience
export { MorphyUniversal as UniversalTransitionManager };
