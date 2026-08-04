/* ==========================================================================
 * PageFlow — Universe Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const universeTransition: TransitionDefinition = {
  metadata: {
    name: 'universe',
    displayName: 'Universe',
    description: 'A massive cosmic vortex spin.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '1.2',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 1.2,
  },
  getVariants: () => ({
    initial: { opacity: 0, scale: 0.01, rotateZ: 180, filter: 'blur(20px) contrast(200%)' },
    animate: { opacity: 1, scale: 1, rotateZ: 0, filter: 'blur(0px) contrast(100%)' },
    exit: { opacity: 0, scale: 5, rotateZ: -180, filter: 'blur(20px) contrast(50%)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.45, 0, 0.15, 1], // Slow start, snap to end
  }),
};

registerTransition('universe', universeTransition);
