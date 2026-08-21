'use client';

/* ==========================================================================
 * GlideCN — Next.js Pages Router Adapter (`pages/_app.tsx`)
 * Seamless page transitions for Next.js Pages Router projects.
 * ========================================================================== */

import { useEffect, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export interface NextPagesGlideCNProps {
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
 * import { GlideCNNextPages } from '@/components/glidecn/adapters/next-pages';
 * import type { AppProps } from 'next/app';
 *
 * export default function MyApp({ Component, pageProps, router }: AppProps) {
 *   return (
 *     <GlideCNNextPages routerPath={router.asPath}>
 *       <Component {...pageProps} key={router.asPath} />
 *     </GlideCNNextPages>
 *   );
 * }
 * ```
 */
export function GlideCNNextPages({
  children,
  routerPath,
  mode = 'wait',
  className = 'w-full flex-1 flex flex-col',
  restoreScroll = true,
}: NextPagesGlideCNProps) {
  const activeKey =
    routerPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
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
  GlideCNNextPages as GlideCN,
  GlideCNNextPages as TransitionManager,
  GlideCNNextPages as NextPagesTransitionManager,
};
