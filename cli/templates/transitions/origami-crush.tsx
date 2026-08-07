/* ==========================================================================
 * GlideCN — Origami Crush Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const origamiCrushTransition: TransitionDefinition = {
  metadata: {
    name: 'origami-crush',
    displayName: 'Origami Crush',
    description: 'The page crumples up into a tiny paper ball and is thrown away',
    category: 'paper',
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
      scale: 0,
      rotateX: 180,
      rotateY: 180,
      rotateZ: 45,
      borderRadius: '50%',
      filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.5))',
    },
    animate: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      borderRadius: '0%',
      filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
    },
    exit: { 
      opacity: 0,
      scale: 0,
      rotateX: -180,
      rotateY: -180,
      rotateZ: -45,
      borderRadius: '50%',
      filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.5))',
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: 'backInOut',
  }),
};

registerTransition('origami-crush', origamiCrushTransition);
