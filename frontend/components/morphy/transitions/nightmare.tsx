/* ==========================================================================
 * PageFlow — Nightmare Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const nightmareTransition: TransitionDefinition = {
  metadata: {
    name: 'nightmare',
    displayName: 'Nightmare',
    description: 'A dynamic nightmare effect.',
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

    initial: { opacity: 0, scale: 1.1, filter: 'invert(1) grayscale(1) blur(5px)' },
    animate: { opacity: 1, scale: 1, filter: 'invert(0) grayscale(0) blur(0px)' },
    exit: { opacity: 0, scale: 0.9, filter: 'invert(1) grayscale(1) blur(5px)' }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('nightmare', nightmareTransition);
