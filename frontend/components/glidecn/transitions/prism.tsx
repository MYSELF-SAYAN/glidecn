/* ==========================================================================
 * PageFlow — Prism Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const prismTransition: TransitionDefinition = {
  metadata: {
    name: 'prism',
    displayName: 'Prism',
    description: 'Chromatic blur and severe hue shift.',
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
    initial: { opacity: 0, filter: 'hue-rotate(-90deg) brightness(1.5) blur(10px)', scale: 1.1 },
    animate: { opacity: 1, filter: 'hue-rotate(0deg) brightness(1) blur(0px)', scale: 1 },
    exit: { opacity: 0, filter: 'hue-rotate(90deg) brightness(0.5) blur(10px)', scale: 0.9 }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: 'circOut',
  }),
};

registerTransition('prism', prismTransition);
