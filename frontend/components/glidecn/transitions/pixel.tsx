/* ==========================================================================
 * GlideCN — Pixel Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const pixelTransition: TransitionDefinition = {
  metadata: {
    name: 'pixel',
    displayName: 'Pixel',
    description: 'Retro 8-bit pixelation dissolve',
    category: 'retro',
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
      scale: 1.1,
      filter: "blur(20px) contrast(10) grayscale(100%)",
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px) contrast(1) grayscale(0%)",
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      filter: "blur(20px) contrast(10) grayscale(100%)",
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: "linear",
  }),
};

registerTransition('pixel', pixelTransition);
