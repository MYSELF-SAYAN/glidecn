/* ==========================================================================
 * PageFlow — Dream Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const dreamTransition: TransitionDefinition = {
  metadata: {
    name: 'dream',
    displayName: 'Dream',
    description: 'An ethereal slow fade with heavy blur and brightness.',
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
    initial: { opacity: 0, scale: 1.05, filter: 'blur(20px) brightness(1.5)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' },
    exit: { opacity: 0, scale: 0.95, filter: 'blur(20px) brightness(0.5)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.25, 0.1, 0.25, 1],
  }),
};

registerTransition('dream', dreamTransition);
