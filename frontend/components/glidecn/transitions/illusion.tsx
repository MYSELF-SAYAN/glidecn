/* ==========================================================================
 * PageFlow — Illusion Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const illusionTransition: TransitionDefinition = {
  metadata: {
    name: 'illusion',
    displayName: 'Illusion',
    description: 'A bizarre perspective warp with extreme skew.',
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
    initial: { opacity: 0, skewX: 30, skewY: 15, scale: 0.5, filter: 'blur(10px)' },
    animate: { opacity: 1, skewX: 0, skewY: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, skewX: -30, skewY: -15, scale: 1.5, filter: 'blur(10px)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.34, 1.56, 0.64, 1],
  }),
};

registerTransition('illusion', illusionTransition);
