/* ==========================================================================
 * Morphy — Utility Functions
 * Helpers for config merging, easing resolution, and motion detection.
 * ========================================================================== */

import type { TransitionConfig, EasingPreset } from './types';
import { DEFAULT_TRANSITION_CONFIG, EASING_MAP } from '../constants';

// ---------------------------------------------------------------------------
// Config Merging
// ---------------------------------------------------------------------------

/**
 * Deep-merges a partial config onto the defaults, producing a fully
 * resolved config object. Custom objects are shallow-merged.
 */
export function mergeConfig(
  overrides: TransitionConfig = {},
  base: Required<TransitionConfig> = DEFAULT_TRANSITION_CONFIG,
): Required<TransitionConfig> {
  return {
    duration: overrides.duration ?? base.duration,
    delay: overrides.delay ?? base.delay,
    ease: overrides.ease ?? base.ease,
    direction: overrides.direction ?? base.direction,
    stagger: overrides.stagger ?? base.stagger,
    custom: { ...base.custom, ...overrides.custom },
  };
}

// ---------------------------------------------------------------------------
// Easing Resolution
// ---------------------------------------------------------------------------

/**
 * Converts a named easing preset or tuple into a cubic-bezier array
 * that Framer Motion understands.
 */
export function resolveEasing(
  ease: EasingPreset,
): [number, number, number, number] {
  if (Array.isArray(ease)) return ease;
  return EASING_MAP[ease] ?? EASING_MAP.easeInOut;
}

// ---------------------------------------------------------------------------
// Reduced Motion Detection
// ---------------------------------------------------------------------------

/**
 * Returns `true` when the user has enabled `prefers-reduced-motion`.
 * Falls back to `false` on the server.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ---------------------------------------------------------------------------
// Math Utilities
// ---------------------------------------------------------------------------

/** Clamps a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation between a and b */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

// ---------------------------------------------------------------------------
// Direction Helpers
// ---------------------------------------------------------------------------

/**
 * Returns x/y offset values for a given direction.
 * Used by slide and similar transitions.
 */
export function getDirectionOffset(
  direction: TransitionConfig['direction'],
  distance: number = 100,
): { x: number; y: number } {
  switch (direction) {
    case 'left':
      return { x: -distance, y: 0 };
    case 'right':
      return { x: distance, y: 0 };
    case 'up':
      return { x: 0, y: -distance };
    case 'down':
      return { x: 0, y: distance };
    default:
      return { x: -distance, y: 0 };
  }
}
