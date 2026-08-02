/* ==========================================================================
 * PageFlow — Water Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const waterTransition: TransitionDefinition = {
  metadata: {
    name: 'water',
    displayName: 'Water',
    description: 'A dynamic water effect.',
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

    initial: { opacity: 0, y: -20, scaleY: 0.9, filter: 'hue-rotate(180deg) blur(4px) contrast(1.2)' },
    animate: { opacity: 1, y: 0, scaleY: 1, filter: 'hue-rotate(0deg) blur(0px) contrast(1)' },
    exit: { opacity: 0, y: 20, scaleY: 1.1, filter: 'hue-rotate(180deg) blur(4px) contrast(1.2)' }
      
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('water', waterTransition);
