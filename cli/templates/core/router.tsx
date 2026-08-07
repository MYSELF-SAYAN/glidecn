'use client';

/* ==========================================================================
 * GlideCN — Core Router Utilities
 * Framework-agnostic route key detection and universal router passthrough.
 * ========================================================================== */

import { useState, useEffect, type ReactNode } from 'react';

/**
 * Returns the current browser pathname in vanilla React / SPAs.
 * Triggers re-renders on popstate navigation events.
 */
export function useRouteKey(): string {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return pathname;
}

/**
 * Universal container for AnimatePresence children.
 */
export function FrozenRouter({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
