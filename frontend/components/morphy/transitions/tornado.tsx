/* ==========================================================================
 * PageFlow — Tornado Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const tornadoTransition: TransitionDefinition = {
  metadata: {
    name: 'tornado',
    displayName: 'Tornado',
    description: 'A dynamic tornado effect.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.6',
        description: 'Duration of the transition in seconds.',
      }
    ],
  },
  defaultConfig: {
    duration: 0.6,
  },
  getVariants: (config) => ({

    initial: { opacity: 0, scale: 0.2, rotate: 1080, x: -100, y: -100 },
    animate: { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 },
    exit: { opacity: 0, scale: 1.5, rotate: -1080, x: 100, y: 100 }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('tornado', tornadoTransition);
