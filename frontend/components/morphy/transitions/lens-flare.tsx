/* ==========================================================================
 * Morphy — Lens Flare Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const lensFlareTransition: TransitionDefinition = {
  metadata: {
    name: 'lens-flare',
    displayName: 'Lens Flare',
    description: 'A cinematic anamorphic lens flare sweeps across blinding the camera',
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
      scaleX: 3,
      scaleY: 0.1,
      filter: 'brightness(3) contrast(2) drop-shadow(0 0 50px #fff)',
    },
    animate: { 
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      filter: 'brightness(1) contrast(1) drop-shadow(0 0 0px #fff)',
    },
    exit: { 
      opacity: 0,
      scaleX: 3,
      scaleY: 0.1,
      filter: 'brightness(3) contrast(2) drop-shadow(0 0 50px #fff)',
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: 'circInOut',
  }),
};

registerTransition('lens-flare', lensFlareTransition);
