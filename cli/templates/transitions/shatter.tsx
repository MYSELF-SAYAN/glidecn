/* ==========================================================================
 * GlideCN — Shatter Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const shatterTransition: TransitionDefinition = {
  metadata: {
    name: 'shatter',
    displayName: 'Shatter',
    description: 'A dynamic shatter effect.',
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
  getVariants: () => ({
    initial: { 
      opacity: 0, 
      scale: 1.5, 
      rotateZ: 45, 
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.5)) blur(5px)' 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateZ: 0, 
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      filter: 'drop-shadow(0 0 0px rgba(255,255,255,0)) blur(0px)' 
    },
    exit: { 
      opacity: 0, 
      scale: 2, 
      rotateZ: -45, 
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.5)) blur(5px)' 
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [0.17, 0.67, 0.83, 0.67],
  }),
};

registerTransition('shatter', shatterTransition);
