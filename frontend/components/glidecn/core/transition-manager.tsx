'use client';

/* ==========================================================================
 * GlideCN — Transition Manager
 * Orchestrates AnimatePresence and manages enter/exit lifecycle.
 * ========================================================================== */

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouteKey, FrozenRouter } from './router';

// ---------------------------------------------------------------------------
// Transition Manager
// ---------------------------------------------------------------------------

interface TransitionManagerProps {
  children: ReactNode;
  /** AnimatePresence mode — "wait" ensures exit completes before enter */
  mode?: 'wait' | 'sync' | 'popLayout';
  /** Optional custom route key override */
  routeKey?: string;
  /** Enable automatic scroll restoration */
  restoreScroll?: boolean;
}

/**
 * Wraps children with `AnimatePresence` keyed to the current route.
 * When the route changes:
 * 1. The old page plays its `exit` animation (frozen in place).
 * 2. Once exit completes, the new page plays its `initial → animate`.
 */
export function TransitionManager({
  children,
  mode = 'wait',
  routeKey: customRouteKey,
  restoreScroll = true,
}: TransitionManagerProps) {
  const nextPathname = useRouteKey();
  const routeKey = customRouteKey ?? nextPathname;
  const isPopState = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    // Save scroll position for the current route before it unmounts
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
