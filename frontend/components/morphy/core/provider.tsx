'use client';

/* ==========================================================================
 * Morphy — Provider
 * Top-level wrapper that composes context, registry, and transition manager.
 * ========================================================================== */

import { useMemo, type ReactNode } from 'react';
import type { MorphyProviderProps } from './types';
import { TransitionContextProvider } from './transition-context';
import { DEFAULT_TRANSITION_NAME } from '../constants';
import { prefersReducedMotion } from './utils';

// Ensure all built-in transitions are registered on import
import '../transitions/fade';
import '../transitions/slide';
import '../transitions/scale';
import '../transitions/circular-portal';
import '../transitions/page-curl';
import '../transitions/cube';
import '../transitions/flip';
import '../transitions/fold';
import '../transitions/ink-spread';
import '../transitions/shutter-iris';
import '../transitions/bounce';
import '../transitions/dissolve';
import '../transitions/ghost';
import '../transitions/glass';
import '../transitions/glitch';
import '../transitions/liquid-morph';
import '../transitions/mirror';
import '../transitions/neon';
import '../transitions/origami-unfold';
import '../transitions/pixel';
import '../transitions/ripple';
import '../transitions/shadow';
import '../transitions/slash';
import '../transitions/spin';
import '../transitions/squeeze';
import '../transitions/stretch';
import '../transitions/swipe';
import '../transitions/tv-turn-off';
import '../transitions/vortex';
import '../transitions/wave';
import '../transitions/wobble';
import '../transitions/wormhole';
import '../transitions/zoom';

// ---------------------------------------------------------------------------
// MorphyProvider
// ---------------------------------------------------------------------------

/**
 * The root provider for Morphy. Wrap your app or layout with this.
 *
 * @example
 * ```tsx
 * <MorphyProvider defaultTransition="cube">
 *   {children}
 * </MorphyProvider>
 * ```
 */
export function MorphyProvider({
  children,
  defaultTransition = DEFAULT_TRANSITION_NAME,
  defaultConfig = {},
  reducedMotion,
}: MorphyProviderProps) {
  const isReducedMotion = useMemo(() => {
    if (reducedMotion !== undefined) return reducedMotion;
    return prefersReducedMotion();
  }, [reducedMotion]);

  return (
    <TransitionContextProvider
      defaultTransition={defaultTransition}
      defaultConfig={defaultConfig}
      reducedMotion={isReducedMotion}
    >
      {children}
    </TransitionContextProvider>
  );
}

export const PageFlowProvider = MorphyProvider;
