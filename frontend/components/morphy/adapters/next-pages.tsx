'use client';

/* ==========================================================================
 * Morphy — Next.js Pages Router Adapter (`pages/_app.tsx`)
 * Seamless page transitions for Next.js Pages Router projects.
 * ========================================================================== */

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export interface NextPagesMorphyProps {
  children: ReactNode;
  /** Pass router.asPath or router.route from next/router in _app.tsx */
  routerPath?: string;
  /** AnimatePresence mode: "wait" ensures exit completes before enter */
  mode?: 'wait' | 'sync' | 'popLayout';
  /** Optional className */
  className?: string;
  /** Enable automatic scroll restoration */
  restoreScroll?: boolean;
}

/**
 * Transition manager for Next.js Pages Router (`pages/_app.tsx`).
 *
 * @example
 * ```tsx
 * import { MorphyNextPages } from '@/components/morphy/adapters/next-pages';
 * import type { AppProps } from 'next/app';
 *
 * export default function MyApp({ Component, pageProps, router }: AppProps) {
 *   return (
 *     <MorphyNextPages routerPath={router.asPath}>
 *       <Component {...pageProps} key={router.asPath} />
 *     </MorphyNextPages>
 *   );
 * }
 * ```
 */
export function MorphyNextPages({
  children,
  routerPath,
  mode = 'wait',
  className = 'w-full flex-1 flex flex-col',
  restoreScroll = true,
}: NextPagesMorphyProps) {
  const activeKey =
    routerPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

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
export { MorphyNextPages as NextPagesTransitionManager };
