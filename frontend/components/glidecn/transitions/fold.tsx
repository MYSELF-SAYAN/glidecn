/* ==========================================================================
 * GlideCN — Fold Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const foldTransition: TransitionDefinition = {
  metadata: {
    name: 'fold',
    displayName: 'Fold',
    description: 'Seamless paper accordion fold',
    category: 'spatial',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.7',
        description: 'Duration of the transition in seconds.',
      }
    ],
  },
  defaultConfig: {
    duration: 0.7,
  },
  getVariants: () => ({
    initial: { 
      opacity: 0, 
      rotateX: 90,
      scaleY: 0,
      transformOrigin: 'top',
      filter: 'brightness(0.5)',
    },
    animate: { 
      opacity: 1, 
      rotateX: 0,
      scaleY: 1,
      transformOrigin: 'top',
      filter: 'brightness(1)',
    },
    exit: { 
      opacity: 0, 
      rotateX: -90,
      scaleY: 0,
      transformOrigin: 'bottom',
      filter: 'brightness(0.5)',
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.33, 1, 0.68, 1],
  }),
};

registerTransition('fold', foldTransition);
