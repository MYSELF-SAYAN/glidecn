/* ==========================================================================
 * PageFlow — Galaxy Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const galaxyTransition: TransitionDefinition = {
  metadata: {
    name: 'galaxy',
    displayName: 'Galaxy',
    description: 'An infinite Z-axis warp with rotation simulating space travel.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '1.2',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 1.2,
  },
  getVariants: () => ({
    initial: { opacity: 0, scale: 0.1, rotateZ: -45, filter: 'blur(10px) brightness(2)' },
    animate: { opacity: 1, scale: 1, rotateZ: 0, filter: 'blur(0px) brightness(1)' },
    exit: { opacity: 0, scale: 5, rotateZ: 45, filter: 'blur(10px) brightness(0)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.6, 0.05, -0.01, 0.9],
  }),
};

registerTransition('galaxy', galaxyTransition);
