/* ==========================================================================
 * PageFlow — Swirl Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const swirlTransition: TransitionDefinition = {
  metadata: {
    name: 'swirl',
    displayName: 'Swirl',
    description: 'A dynamic swirl effect.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.6',
        description: 'Duration of the transition in seconds.',
      }
    ],
  },
  defaultConfig: {
    duration: 0.6,
  },
  getVariants: (config) => ({

    initial: { opacity: 0, scale: 0.5, rotate: 360, filter: 'blur(8px)' },
    animate: { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.5, rotate: -360, filter: 'blur(8px)' }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('swirl', swirlTransition);
