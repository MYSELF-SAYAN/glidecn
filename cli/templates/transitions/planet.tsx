/* ==========================================================================
 * PageFlow — Planet Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const planetTransition: TransitionDefinition = {
  metadata: {
    name: 'planet',
    displayName: 'Planet',
    description: 'A spherical morph that flattens into the screen.',
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
    initial: { opacity: 0, borderRadius: '50%', scale: 0.2, rotateZ: 90 },
    animate: { opacity: 1, borderRadius: '0%', scale: 1, rotateZ: 0 },
    exit: { opacity: 0, borderRadius: '50%', scale: 2, rotateZ: -90 }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: 'backOut',
  }),
};

registerTransition('planet', planetTransition);
