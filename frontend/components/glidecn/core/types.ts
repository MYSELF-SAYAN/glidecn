/* ==========================================================================
 * GlideCN — Core Types
 * All TypeScript definitions for the transition engine.
 * ========================================================================== */

import type { ComponentType, ReactNode } from 'react';
import type { Transition, Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Direction
// ---------------------------------------------------------------------------

/** Directional transitions (slide, etc.) */
export type TransitionDirection = 'left' | 'right' | 'up' | 'down';

// ---------------------------------------------------------------------------
// Easing
// ---------------------------------------------------------------------------

/** Named easing presets or a raw cubic-bezier tuple */
export type EasingPreset =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'spring'
  | [number, number, number, number]
  | string;

// ---------------------------------------------------------------------------
// Animation State
// ---------------------------------------------------------------------------

/** Lifecycle state of a page transition */
export type AnimationState = 'idle' | 'entering' | 'exiting' | 'complete';

// ---------------------------------------------------------------------------
// Transition Category
// ---------------------------------------------------------------------------

/** Used for documentation / UI grouping */
export type TransitionCategory = 'flow' | 'portal' | 'paper' | 'mask' | 'spatial' | 'dynamic' | 'experimental' | 'retro';

// ---------------------------------------------------------------------------
// Transition Config
// ---------------------------------------------------------------------------

/** User-facing configuration for a single transition */
export interface TransitionConfig {
  /** Duration in seconds (default: 0.4) */
  duration?: number;

  /** Delay before animation starts, in seconds */
  delay?: number;

  /** Easing function */
  ease?: EasingPreset;

  /** Direction for directional transitions */
  direction?: TransitionDirection;

  /** Stagger children delay in seconds */
  stagger?: number;

  /** Arbitrary custom data passed to the transition */
  custom?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Transition Prop Schema (for documentation)
// ---------------------------------------------------------------------------

/** Describes a single prop for auto-generated docs */
export interface TransitionPropSchema {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

// ---------------------------------------------------------------------------
// Transition Metadata
// ---------------------------------------------------------------------------

/** Metadata powering docs, showcase cards, and registry listing */
export interface TransitionMetadata {
  /** Machine-readable name (e.g. "fade", "slide-left") */
  name: string;

  /** Human-readable display name */
  displayName: string;

  /** One-liner description */
  description: string;

  /** Grouping category */
  category: TransitionCategory;

  /** Props this transition accepts */
  props: TransitionPropSchema[];
}

// ---------------------------------------------------------------------------
// Transition Variants (Framer Motion)
// ---------------------------------------------------------------------------

/** The animation variants a transition must provide */
export interface TransitionVariants {
  /** State before the page enters */
  initial: Variants['initial'];

  /** Active / visible state */
  animate: Variants['animate'];

  /** State when the page exits */
  exit: Variants['exit'];
}

// ---------------------------------------------------------------------------
// Transition Component Props
// ---------------------------------------------------------------------------

/** Props passed to every transition component */
export interface TransitionComponentProps {
  children: ReactNode;
  config: Required<TransitionConfig>;
  state: AnimationState;
}

// ---------------------------------------------------------------------------
// Transition Definition
// ---------------------------------------------------------------------------

/** Everything needed to register a transition with the engine */
export interface TransitionDefinition {
  /** Metadata for docs + UI */
  metadata: TransitionMetadata;

  /** Default configuration values */
  defaultConfig: TransitionConfig;

  /**
   * Returns Framer Motion variants for this transition.
   * Receives the resolved config so variants can adapt to direction, etc.
   */
  getVariants: (config: Required<TransitionConfig>) => TransitionVariants;

  /**
   * Optional Framer Motion `transition` object override.
   * If not provided the engine builds one from config.
   */
  getTransition?: (config: Required<TransitionConfig>) => Transition;
}

// ---------------------------------------------------------------------------
// GlideCN Context
// ---------------------------------------------------------------------------

/** Values exposed via React context */
export interface GlideCNContextValue {
  /** Currently active transition name */
  currentTransition: string;

  /** Resolved transition definition */
  transitionDefinition: TransitionDefinition | null;

  /** Merged config (defaults + overrides) */
  config: Required<TransitionConfig>;

  /** Current animation lifecycle state */
  animationState: AnimationState;

  /** Whether reduced motion is active */
  reducedMotion: boolean;

  /** Set the active transition by name */
  setTransition: (name: string) => void;

  /** Override config for the current transition */
  setConfig: (config: TransitionConfig) => void;
}

// ---------------------------------------------------------------------------
// Page Props
// ---------------------------------------------------------------------------

/** Props for the <Page> component */
export interface PageProps {
  children: ReactNode;

  /** Transition name (must be registered) */
  transition?: string;

  /** Override duration */
  duration?: number;

  /** Override delay */
  delay?: number;

  /** Override easing */
  ease?: EasingPreset;

  /** Override direction */
  direction?: TransitionDirection;

  /** Override stagger */
  stagger?: number;

  /** Arbitrary custom config */
  custom?: Record<string, unknown>;

  /** Additional CSS class */
  className?: string;

  /** Inline styles */
  style?: import('react').CSSProperties;
}

// ---------------------------------------------------------------------------
// Provider Props
// ---------------------------------------------------------------------------

/** Props for the <GlideCNProvider> */
export interface GlideCNProviderProps {
  children: ReactNode;

  /** Fallback transition if none specified on <Page> */
  defaultTransition?: string;

  /** Global config overrides */
  defaultConfig?: TransitionConfig;

  /** Force reduced motion on/off (auto-detects by default) */
  reducedMotion?: boolean;
}
