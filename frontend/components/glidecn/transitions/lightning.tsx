/* ==========================================================================
 * PageFlow — Lightning Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const lightningTransition: TransitionDefinition = {
  metadata: {
    name: 'lightning',
    displayName: 'Lightning',
    description: 'A high-voltage strobe flash.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.3',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 0.3,
  },
  getVariants: () => ({
    initial: { opacity: 0, filter: 'brightness(2)' },
    animate: { opacity: [0, 1, 0, 1, 0, 1], filter: 'brightness(1)' },
    exit: { opacity: [1, 0, 1, 0, 1, 0], filter: 'brightness(2)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: 'linear',
  }),
};

registerTransition('lightning', lightningTransition);
