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

  useEffect(() => {
    if (!restoreScroll || typeof window === 'undefined') return;
    // Save scroll position for the current route before it unmounts
    return () => {
      sessionStorage.setItem(`scroll-${routeKey}`, window.scrollY.toString());
    };
  }, [routeKey, restoreScroll]);

  const handleExitComplete = () => {
    if (!restoreScroll || typeof window === 'undefined') return;
    if (window.location.hash) return;
    
    const savedScroll = sessionStorage.getItem(`scroll-${routeKey}`);
    if (savedScroll) {
      // Restore scroll position for back navigation
      window.scrollTo(0, parseInt(savedScroll, 10));
    } else {
      // New page navigation, scroll to top
      window.scrollTo(0, 0);
    }
  };

  return (
    <AnimatePresence mode={mode} initial={true} onExitComplete={handleExitComplete}>
      <FrozenRouter key={routeKey}>{children}</FrozenRouter>
    </AnimatePresence>
  );
}
