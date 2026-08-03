/* ==========================================================================
 * PageFlow — Twirl Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const twirlTransition: TransitionDefinition = {
  metadata: {
    name: 'twirl',
    displayName: 'Twirl',
    description: 'A dynamic twirl effect.',
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

    initial: { opacity: 0, scale: 1.2, rotateY: 360, rotateX: 180 },
    animate: { opacity: 1, scale: 1, rotateY: 0, rotateX: 0 },
    exit: { opacity: 0, scale: 0.8, rotateY: -360, rotateX: -180 }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('twirl', twirlTransition);
