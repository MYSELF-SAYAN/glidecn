/* ==========================================================================
 * PageFlow — Wind Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const windTransition: TransitionDefinition = {
  metadata: {
    name: 'wind',
    displayName: 'Wind',
    description: 'A swift, skewed horizontal gust.',
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
    initial: { opacity: 0, x: -300, skewX: -20, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: 300, skewX: 20, filter: 'blur(10px)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1], // Swift easeOut
  }),
};

registerTransition('wind', windTransition);
