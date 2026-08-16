/* ==========================================================================
 * PageFlow — Star Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const starTransition: TransitionDefinition = {
  metadata: {
    name: 'star',
    displayName: 'Star',
    description: 'A spinning, bright shuriken-like entrance.',
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
    initial: { opacity: 0, scale: 0.1, rotateZ: 180, filter: 'brightness(3) blur(10px)' },
    animate: { opacity: 1, scale: 1, rotateZ: 0, filter: 'brightness(1) blur(0px)' },
    exit: { opacity: 0, scale: 3, rotateZ: -180, filter: 'brightness(0) blur(10px)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.175, 0.885, 0.32, 1.275], // Pop and spin
  }),
};

registerTransition('star', starTransition);
