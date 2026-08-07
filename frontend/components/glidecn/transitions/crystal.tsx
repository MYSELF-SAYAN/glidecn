/* ==========================================================================
 * GlideCN — Crystal Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const crystalTransition: TransitionDefinition = {
  metadata: {
    name: 'crystal',
    displayName: 'Crystal',
    description: 'A crystalline structure grows and shatters to reveal the next page',
    category: 'experimental',
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
      scale: 1.2,
      clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      filter: 'brightness(2) contrast(1.5) blur(10px)',
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      clipPath: 'polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%)',
      filter: 'brightness(1) contrast(1) blur(0px)',
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
      filter: 'brightness(2) contrast(2) blur(10px)',
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.17, 0.67, 0.23, 0.99],
  }),
};

registerTransition('crystal', crystalTransition);
