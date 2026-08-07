/* ==========================================================================
 * GlideCN — Blueprint Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const blueprintTransition: TransitionDefinition = {
  metadata: {
    name: 'blueprint',
    displayName: 'Blueprint',
    description: 'The page turns into a glowing architectural blueprint wireframe',
    category: 'dynamic',
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
  getVariants: () => ({
    initial: { 
      opacity: 0,
      scale: 1.05,
      filter: 'invert(1) sepia(1) saturate(5) hue-rotate(180deg) blur(2px)',
    },
    animate: { 
      opacity: 1,
      scale: 1,
      filter: 'invert(0) sepia(0) saturate(1) hue-rotate(0deg) blur(0px)',
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      filter: 'invert(1) sepia(1) saturate(5) hue-rotate(180deg) blur(2px)',
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: 'anticipate',
  }),
};

registerTransition('blueprint', blueprintTransition);
