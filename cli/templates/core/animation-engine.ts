/* ==========================================================================
 * Morphy — Animation Engine
 * Builds Framer Motion transition objects from Morphy config.
 * Pure functions — no React dependency.
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionConfig, TransitionDefinition, TransitionVariants } from './types';
import { resolveEasing } from './utils';

// ---------------------------------------------------------------------------
// Build Variants
// ---------------------------------------------------------------------------

/**
 * Resolves animation variants for a given transition definition + config.
 * If reduced motion is active, returns a no-op variant set.
 */
export function buildVariants(
  definition: TransitionDefinition,
  config: Required<TransitionConfig>,
  reducedMotion: boolean,
): TransitionVariants {
  if (reducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }

  return definition.getVariants(config);
}

// ---------------------------------------------------------------------------
// Build Transition
// ---------------------------------------------------------------------------

/**
 * Produces a Framer Motion `transition` object from a Morphy config.
 * If the definition provides its own `getTransition`, that takes priority.
 */
export function buildTransition(
  definition: TransitionDefinition,
  config: Required<TransitionConfig>,
  reducedMotion: boolean,
): Transition {
  if (reducedMotion) {
    return { duration: 0 };
  }

  // Let the definition override if it wants to
  if (definition.getTransition) {
    return definition.getTransition(config);
  }

  // Default: tween with resolved easing
  const ease = resolveEasing(config.ease);

  return {
    duration: config.duration,
    delay: config.delay,
    ease,
  };
}

// ---------------------------------------------------------------------------
// Performance Hints
// ---------------------------------------------------------------------------

/**
 * Returns CSS `will-change` value for optimal GPU compositing.
 * Transitions should declare which CSS properties they animate.
 */
export function getWillChangeHint(
  definition: TransitionDefinition,
): string {
  const name = definition.metadata.name;

  switch (name) {
    case 'fade':
      return 'opacity';
    case 'slide':
      return 'transform, opacity';
    case 'scale':
      return 'transform, opacity';
    case 'circular-portal':
      return 'clip-path, opacity';
    case 'page-curl':
      return 'transform, opacity';
    default:
      return 'transform, opacity';
  }
}
