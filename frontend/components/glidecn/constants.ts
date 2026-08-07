/* ==========================================================================
 * GlideCN — Constants
 * Default values, easing presets, and configuration constants.
 * ========================================================================== */

import type { TransitionConfig, EasingPreset } from './core/types';

// ---------------------------------------------------------------------------
// Default Transition Config
// ---------------------------------------------------------------------------

export const DEFAULT_TRANSITION_CONFIG: Required<TransitionConfig> = {
  duration: 0.4,
  delay: 0,
  ease: 'easeInOut',
  direction: 'left',
  stagger: 0,
  custom: {},
};

// ---------------------------------------------------------------------------
// Easing Presets
// ---------------------------------------------------------------------------

/** Maps named easing presets to cubic-bezier values */
export const EASING_MAP: Record<string, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.22, 1, 0.36, 1],
};

// ---------------------------------------------------------------------------
// Default Transition Name
// ---------------------------------------------------------------------------

export const DEFAULT_TRANSITION_NAME = 'fade';

// ---------------------------------------------------------------------------
// Z-Index Layers
// ---------------------------------------------------------------------------

export const Z_INDEX = {
  /** Page currently exiting */
  exiting: 1,
  /** Page currently entering */
  entering: 2,
  /** Overlay / mask layer */
  overlay: 10,
} as const;

// ---------------------------------------------------------------------------
// Category Labels
// ---------------------------------------------------------------------------

export const CATEGORY_LABELS: Record<string, string> = {
  flow: 'Flow',
  portal: 'Portal',
  paper: 'Paper',
  mask: 'Mask',
  spatial: 'Spatial',
  dynamic: 'Dynamic',
  experimental: 'Experimental',
};

// ---------------------------------------------------------------------------
// Reduced Motion Fallback
// ---------------------------------------------------------------------------

/** When `prefers-reduced-motion` is active, use these values */
export const REDUCED_MOTION_CONFIG: Required<TransitionConfig> = {
  duration: 0,
  delay: 0,
  ease: 'linear',
  direction: 'left',
  stagger: 0,
  custom: {},
};

// ---------------------------------------------------------------------------
// Supported Easing Names
// ---------------------------------------------------------------------------

export const EASING_PRESETS: EasingPreset[] = [
  'linear',
  'easeIn',
  'easeOut',
  'easeInOut',
  'spring',
];
