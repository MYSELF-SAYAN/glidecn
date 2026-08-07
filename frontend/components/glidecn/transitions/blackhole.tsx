/* ==========================================================================
 * PageFlow — Blackhole Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const blackholeTransition: TransitionDefinition = {
  metadata: {
    name: 'blackhole',
    displayName: 'Blackhole',
    description: 'A dynamic blackhole effect.',
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

    initial: { opacity: 0, scale: 0, rotate: -720, filter: 'brightness(0) blur(20px)' },
    animate: { opacity: 1, scale: 1, rotate: 0, filter: 'brightness(1) blur(0px)' },
    exit: { opacity: 0, scale: 0, rotate: 720, filter: 'brightness(0) blur(20px)' }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('blackhole', blackholeTransition);
