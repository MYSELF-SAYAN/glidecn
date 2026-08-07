/* ==========================================================================
 * PageFlow — Space Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const spaceTransition: TransitionDefinition = {
  metadata: {
    name: 'space',
    displayName: 'Space',
    description: 'A deep void drop along the Z-axis.',
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
    initial: { opacity: 0, z: -2000, filter: 'brightness(0)', transformPerspective: 1000 },
    animate: { opacity: 1, z: 0, filter: 'brightness(1)', transformPerspective: 1000 },
    exit: { opacity: 0, z: 2000, filter: 'brightness(0)', transformPerspective: 1000 }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.32, 0.72, 0, 1],
  }),
};

registerTransition('space', spaceTransition);
