/* ==========================================================================
 * PageFlow — Earth Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const earthTransition: TransitionDefinition = {
  metadata: {
    name: 'earth',
    displayName: 'Earth',
    description: 'A heavy tectonic upward shift with slight 3D rotation.',
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
    initial: { opacity: 0, y: '30%', rotateX: -15, transformPerspective: 1000 },
    animate: { opacity: 1, y: '0%', rotateX: 0, transformPerspective: 1000 },
    exit: { opacity: 0, y: '-20%', rotateX: 10, transformPerspective: 1000 }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    type: 'spring',
    stiffness: 70,
    damping: 15,
  }),
};

registerTransition('earth', earthTransition);
