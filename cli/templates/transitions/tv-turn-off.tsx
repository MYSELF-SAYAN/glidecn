/* ==========================================================================
 * PageFlow — TV Turn Off Transition
 * Emulates an old CRT television turning off.
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const tvTurnOffTransition: TransitionDefinition = {
  metadata: {
    name: 'tv-turn-off',
    displayName: 'CRT TV Turn Off',
    description: 'Emulates an old CRT television collapsing into a horizontal line and fading out.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.6',
        description: 'Duration of the effect in seconds.',
      },
    ],
  },

  defaultConfig: {
    duration: 0.6,
    ease: 'easeIn',
  },

  getVariants: () => {
    return {
      initial: {
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        filter: 'brightness(1)',
      },
      animate: {
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        filter: 'brightness(1)',
      },
      exit: {
        scaleX: [1, 1, 0],
        scaleY: [1, 0.01, 0],
        opacity: [1, 1, 0],
        filter: ['brightness(1)', 'brightness(2)', 'brightness(0)'],
      },
    };
  },

  getTransition: (config): Transition => ({
    duration: config.duration,
    times: [0, 0.4, 1],
    ease: config.ease as any,
  }),
};

// ---------------------------------------------------------------------------
// Auto-register
// ---------------------------------------------------------------------------

registerTransition('tv-turn-off', tvTurnOffTransition);
