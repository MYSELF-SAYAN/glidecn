/* ==========================================================================
 * Morphy — Wave Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const waveTransition: TransitionDefinition = {
  metadata: {
    name: 'wave',
    displayName: 'Wave',
    description: 'Sine wave distortion',
    category: 'flow',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
        description: 'Duration of the transition in seconds.',
      }
    ],
  },
  defaultConfig: {
    duration: 0.8,
  },
  getVariants: () => ({
    initial: { 
      opacity: 0, 
      y: '100%',
      skewY: 15,
      scaleY: 1.2,
      filter: 'blur(10px)',
    },
    animate: { 
      opacity: 1, 
      y: '0%',
      skewY: 0,
      scaleY: 1,
      filter: 'blur(0px)',
    },
    exit: { 
      opacity: 0, 
      y: '-100%',
      skewY: -15,
      scaleY: 1.2,
      filter: 'blur(10px)',
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.45, 0, 0.55, 1],
  }),
};

registerTransition('wave', waveTransition);
