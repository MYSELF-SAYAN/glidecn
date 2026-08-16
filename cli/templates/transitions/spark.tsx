/* ==========================================================================
 * PageFlow — Spark Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const sparkTransition: TransitionDefinition = {
  metadata: {
    name: 'spark',
    displayName: 'Spark',
    description: 'A high-velocity scale pop with intense brightness.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.4',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 0.4,
  },
  getVariants: () => ({
    initial: { opacity: 0, scale: 0.05, filter: 'brightness(3)' },
    animate: { opacity: 1, scale: 1, filter: 'brightness(1)' },
    exit: { opacity: 0, scale: 3, filter: 'brightness(3)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.175, 0.885, 0.32, 1.275], // Custom backOut for pop effect
  }),
};

registerTransition('spark', sparkTransition);
