/* ==========================================================================
 * PageFlow — Reality Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const realityTransition: TransitionDefinition = {
  metadata: {
    name: 'reality',
    displayName: 'Reality',
    description: 'A 3D dimension tear that flips space inside out.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '1.0',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 1.0,
  },
  getVariants: () => ({
    initial: { opacity: 0, rotateZ: 180, rotateY: 180, scale: 0.1, transformPerspective: 1000 },
    animate: { opacity: 1, rotateZ: 0, rotateY: 0, scale: 1, transformPerspective: 1000 },
    exit: { opacity: 0, rotateZ: -180, rotateY: -180, scale: 5, transformPerspective: 1000 }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.6, -0.28, 0.735, 0.045], // Anticipation snap
  }),
};

registerTransition('reality', realityTransition);
