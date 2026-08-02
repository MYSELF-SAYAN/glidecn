/* ==========================================================================
 * PageFlow — Dimension Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const dimensionTransition: TransitionDefinition = {
  metadata: {
    name: 'dimension',
    displayName: 'Dimension',
    description: 'A dynamic dimension effect.',
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

    initial: { opacity: 0, scale: 0.5, rotateX: 90, z: -500 },
    animate: { opacity: 1, scale: 1, rotateX: 0, z: 0 },
    exit: { opacity: 0, scale: 1.5, rotateX: -90, z: 500 }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('dimension', dimensionTransition);
