'use client';

/* ==========================================================================
 * GlideCN — React Router Adapter (v6 / v7 / Vite / Remix)
 * Seamless page transitions for React Router applications.
 * ========================================================================== */

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export interface ReactRouterGlideCNProps {
  children: ReactNode;
  /** Pass location.pathname or location.key from useLocation() */
  locationKey?: string;
  /** AnimatePresence mode: "wait" ensures exit animation completes before enter */
  mode?: 'wait' | 'sync' | 'popLayout';
  /** Optional className for the transition wrapper */
  className?: string;
  /** Enable automatic scroll restoration */
  restoreScroll?: boolean;
}

/**
 * Transition manager for React Router (v6/v7) and Vite SPAs.
 *
 * @example
 * ```tsx
 * import { GlideCNReactRouter } from '@/components/glidecn/adapters/react-router';
 * import { useLocation, Routes, Route } from 'react-router-dom';
 *
 * function App() {
 *   const location = useLocation();
 *   return (
 *     <GlideCNReactRouter locationKey={location.pathname}>
 *       <Routes location={location} key={location.pathname}>
 *         <Route path="/" element={<Page><Home /></Page>} />
 *         <Route path="/about" element={<Page><About /></Page>} />
 *       </Routes>
 *     </GlideCNReactRouter>
 *   );
 * }
 * ```
 */
export function GlideCNReactRouter({
  children,
  locationKey,
  mode = 'wait',
  className = 'w-full flex-1 flex flex-col',
  restoreScroll = true,
}: ReactRouterGlideCNProps) {
  const activeKey =
    locationKey ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
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
  GlideCNReactRouter as GlideCN,
  GlideCNReactRouter as TransitionManager,
  GlideCNReactRouter as ReactRouterTransitionManager,
};
