/* ==========================================================================
 * PageFlow — Smoke Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const smokeTransition: TransitionDefinition = {
  metadata: {
    name: 'smoke',
    displayName: 'Smoke',
    description: 'An upward drifting blur that dissipates.',
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
    initial: { opacity: 0, y: 50, scale: 0.95, filter: 'blur(20px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -50, scale: 1.05, filter: 'blur(20px)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.25, 1, 0.5, 1],
  }),
};

registerTransition('smoke', smokeTransition);
