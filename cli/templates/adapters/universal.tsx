'use client';

/* ==========================================================================
 * GlideCN — Universal / Framework-Agnostic Adapter
 * Works seamlessly with TanStack Router, Wouter, Astro, or any React SPA.
 * Requires ZERO Next.js dependencies.
 * ========================================================================== */

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export interface UniversalGlideCNProps {
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

export function GlideCNUniversal({
  children,
  routeKey,
  mode = 'wait',
  className = 'w-full flex-1 flex flex-col',
  restoreScroll = true,
}: UniversalGlideCNProps) {
  // Auto-detect browser path if routeKey is not explicitly passed
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return routeKey ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  });

  const activeKey = routeKey ?? currentPath;

  const isPopState = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (routeKey !== undefined) {
      setCurrentPath(routeKey);
      return;
    }

    const handlePopState = () => {
      isPopState.current = true;
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [routeKey]);

  useEffect(() => {
    if (!restoreScroll || typeof window === 'undefined') return;
    return () => {
      sessionStorage.setItem(`glidecn-scroll-${activeKey}`, window.scrollY.toString());
    };
  }, [activeKey, restoreScroll]);

  const handleExitComplete = () => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) return;

    if (restoreScroll && isPopState.current) {
      const savedScroll = sessionStorage.getItem(`glidecn-scroll-${activeKey}`);
      if (savedScroll) {
        window.scrollTo({ top: parseInt(savedScroll, 10), left: 0, behavior: 'instant' as ScrollBehavior });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
      isPopState.current = false;
    } else {
      // Normal link navigation: always start from top (y = 0)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
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

// Aliases for convenience
export {
  GlideCNUniversal as GlideCN,
  GlideCNUniversal as TransitionManager,
  GlideCNUniversal as UniversalTransitionManager,
};
