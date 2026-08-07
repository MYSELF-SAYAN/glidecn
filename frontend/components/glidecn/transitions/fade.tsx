/* ==========================================================================
 * PageFlow — Fade Transition
 * Simple opacity transition. The most basic and widely-used effect.
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const fadeTransition: TransitionDefinition = {
  metadata: {
    name: 'fade',
    displayName: 'Fade',
    description: 'Smooth opacity transition',
    category: 'flow',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.4',
        description: 'Duration of the fade in seconds.',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay before the fade starts.',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '"easeInOut"',
        description: 'Easing function for the opacity curve.',
      },
    ],
  },

  defaultConfig: {
    duration: 0.4,
    ease: 'easeInOut',
  },

  getVariants: (_config) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }),
};

// ---------------------------------------------------------------------------
// Auto-register
// ---------------------------------------------------------------------------

registerTransition('fade', fadeTransition);
