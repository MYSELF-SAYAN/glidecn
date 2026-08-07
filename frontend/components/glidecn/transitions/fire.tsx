/* ==========================================================================
 * PageFlow — Fire Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const fireTransition: TransitionDefinition = {
  metadata: {
    name: 'fire',
    displayName: 'Fire',
    description: 'A dynamic fire effect.',
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

    initial: { opacity: 0, y: 50, scaleY: 1.5, filter: 'brightness(2) sepia(1) hue-rotate(-30deg) blur(5px)' },
    animate: { opacity: 1, y: 0, scaleY: 1, filter: 'brightness(1) sepia(0) hue-rotate(0deg) blur(0px)' },
    exit: { opacity: 0, y: -50, scaleY: 1.5, filter: 'brightness(2) sepia(1) hue-rotate(-30deg) blur(5px)' }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('fire', fireTransition);
