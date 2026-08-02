'use client';

/* ==========================================================================
 * Morphy — Next.js App Router Adapter
 * Uses the FrozenRouter pattern to prevent white flashes and preserve exit animations.
 * ========================================================================== */

import {
  useContext,
  useRef,
  useEffect,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AnimatePresence } from 'framer-motion';

export interface NextAppMorphyProps {
  children: ReactNode;
  /** AnimatePresence mode: "wait" ensures exit completes before enter */
  mode?: 'wait' | 'sync' | 'popLayout';
  /** Optional custom route key override */
  routeKey?: string;
  /** Enable automatic scroll restoration */
  restoreScroll?: boolean;
}

/**
 * Freezes the Next.js router context so that `AnimatePresence` can
 * keep the exiting page rendered while the exit animation plays.
 */
export function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

/**
 * Transition manager specifically engineered for Next.js App Router (`app/layout.tsx`).
 */
export function MorphyNextApp({
  children,
  mode = 'wait',
  routeKey: customRouteKey,
  restoreScroll = true,
}: NextAppMorphyProps) {
  const pathname = usePathname();
  const routeKey = customRouteKey ?? pathname;

  useEffect(() => {
    if (!restoreScroll || typeof window === 'undefined') return;
    return () => {
      sessionStorage.setItem(`morphy-scroll-${routeKey}`, window.scrollY.toString());
    };
  }, [routeKey, restoreScroll]);

  const handleExitComplete = () => {
    if (!restoreScroll || typeof window === 'undefined') return;
    if (window.location.hash) return;

    const savedScroll = sessionStorage.getItem(`morphy-scroll-${routeKey}`);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence mode={mode} initial={false} onExitComplete={handleExitComplete}>
      <FrozenRouter key={routeKey}>{children}</FrozenRouter>
    </AnimatePresence>
  );
}

// Alias for convenience
export { MorphyNextApp as NextAppTransitionManager };
