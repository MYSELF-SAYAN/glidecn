'use client';

/* ==========================================================================
 * Morphy — React Router Adapter (v6 / v7 / Vite / Remix)
 * Seamless page transitions for React Router applications.
 * ========================================================================== */

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export interface ReactRouterMorphyProps {
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
 * import { MorphyReactRouter } from '@/components/morphy/adapters/react-router';
 * import { useLocation, Routes, Route } from 'react-router-dom';
 *
 * function App() {
 *   const location = useLocation();
 *   return (
 *     <MorphyReactRouter locationKey={location.pathname}>
 *       <Routes location={location} key={location.pathname}>
 *         <Route path="/" element={<Page><Home /></Page>} />
 *         <Route path="/about" element={<Page><About /></Page>} />
 *       </Routes>
 *     </MorphyReactRouter>
 *   );
 * }
 * ```
 */
export function MorphyReactRouter({
  children,
  locationKey,
  mode = 'wait',
  className = 'w-full flex-1 flex flex-col',
  restoreScroll = true,
}: ReactRouterMorphyProps) {
  const activeKey =
    locationKey ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

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
export { MorphyReactRouter as ReactRouterTransitionManager };
