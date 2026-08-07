/* ==========================================================================
 * GlideCN — Paint Drip Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const paintDripTransition: TransitionDefinition = {
  metadata: {
    name: 'paint-drip',
    displayName: 'Paint Drip',
    description: 'Virtual paint drips down the screen, washing away the old page',
    category: 'mask',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.9',
        description: 'Duration of the transition in seconds.',
      }
    ],
  },
  defaultConfig: {
    duration: 0.9,
  },
  getVariants: () => ({
    initial: { 
      opacity: 0,
      y: '-100%',
      filter: 'blur(10px) contrast(1.5)',
      borderBottomLeftRadius: '100% 50%',
      borderBottomRightRadius: '100% 50%',
    },
    animate: { 
      opacity: 1,
      y: '0%',
      filter: 'blur(0px) contrast(1)',
      borderBottomLeftRadius: '0%',
      borderBottomRightRadius: '0%',
    },
    exit: { 
      opacity: 0,
      y: '100%',
      filter: 'blur(10px) contrast(1.5)',
      borderTopLeftRadius: '100% 50%',
      borderTopRightRadius: '100% 50%',
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.76, 0, 0.24, 1],
  }),
};

registerTransition('paint-drip', paintDripTransition);
