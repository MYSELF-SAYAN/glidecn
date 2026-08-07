/* ==========================================================================
 * PageFlow — Laser Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const laserTransition: TransitionDefinition = {
  metadata: {
    name: 'laser',
    displayName: 'Laser',
    description: 'An optic slit unmasking violently snapping open.',
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
    initial: { clipPath: 'inset(50% 0 50% 0)', filter: 'brightness(3)' },
    animate: { clipPath: 'inset(0% 0 0% 0)', filter: 'brightness(1)' },
    exit: { clipPath: 'inset(0 50% 0 50%)', filter: 'brightness(3)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [1, 0, 0, 1], // Very aggressive snap
  }),
};

registerTransition('laser', laserTransition);
