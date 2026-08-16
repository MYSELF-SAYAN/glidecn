/* ==========================================================================
 * PageFlow — Ice Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const iceTransition: TransitionDefinition = {
  metadata: {
    name: 'ice',
    displayName: 'Ice',
    description: 'A crystalline freeze using a sharp diamond clip-path.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 0.8,
  },
  getVariants: () => ({
    initial: { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', filter: 'brightness(2)' },
    animate: { clipPath: 'polygon(50% -50%, 150% 50%, 50% 150%, -50% 50%)', filter: 'brightness(1)' },
    exit: { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', filter: 'brightness(0.5)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.7, 0, 0.3, 1],
  }),
};

registerTransition('ice', iceTransition);
