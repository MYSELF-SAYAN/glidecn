'use client';

/* ==========================================================================
 * GlideCN — Next.js App Router Adapter
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

export interface NextAppGlideCNProps {
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
export function GlideCNNextApp({
  children,
  mode = 'wait',
  routeKey: customRouteKey,
  restoreScroll = true,
}: NextAppGlideCNProps) {
  const pathname = usePathname();
  const routeKey = customRouteKey ?? pathname;
  const isPopState = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent browser from automatically jumping scroll during animations
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      isPopState.current = true;
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!restoreScroll || typeof window === 'undefined') return;
    return () => {
      sessionStorage.setItem(`glidecn-scroll-${routeKey}`, window.scrollY.toString());
    };
  }, [routeKey, restoreScroll]);

  const handleExitComplete = () => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) return;

    if (restoreScroll && isPopState.current) {
      const savedScroll = sessionStorage.getItem(`glidecn-scroll-${routeKey}`);
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
    <AnimatePresence mode={mode} initial={true} onExitComplete={handleExitComplete}>
      <FrozenRouter key={routeKey}>{children}</FrozenRouter>
    </AnimatePresence>
  );
}

// Aliases for convenience
export {
  GlideCNNextApp as GlideCN,
  GlideCNNextApp as TransitionManager,
  GlideCNNextApp as NextAppTransitionManager,
};
