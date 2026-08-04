/* ==========================================================================
 * PageFlow — Water Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const waterTransition: TransitionDefinition = {
  metadata: {
    name: 'water',
    displayName: 'Water',
    description: 'A fluid, blurry rise from the depths.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.9',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 0.9,
  },
  getVariants: () => ({
    initial: { opacity: 0, y: 150, filter: 'blur(20px) hue-rotate(90deg)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px) hue-rotate(0deg)' },
    exit: { opacity: 0, y: -150, filter: 'blur(20px) hue-rotate(-90deg)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.25, 1, 0.5, 1], // Smooth fluid motion
  }),
};

registerTransition('water', waterTransition);
