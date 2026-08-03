/* ==========================================================================
 * PageFlow — Kaleidoscope Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const kaleidoscopeTransition: TransitionDefinition = {
  metadata: {
    name: 'kaleidoscope',
    displayName: 'Kaleidoscope',
    description: 'A dynamic kaleidoscope effect.',
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

    initial: { opacity: 0, scale: 2, rotateZ: 90, filter: 'hue-rotate(90deg) contrast(1.5)' },
    animate: { opacity: 1, scale: 1, rotateZ: 0, filter: 'hue-rotate(0deg) contrast(1)' },
    exit: { opacity: 0, scale: 0.5, rotateZ: -90, filter: 'hue-rotate(-90deg) contrast(1.5)' }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('kaleidoscope', kaleidoscopeTransition);
