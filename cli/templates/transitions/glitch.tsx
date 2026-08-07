/* ==========================================================================
 * GlideCN — Glitch Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const glitchTransition: TransitionDefinition = {
  metadata: {
    name: 'glitch',
    displayName: 'Glitch',
    description: 'Dynamic cyberpunk chromatic aberration glitch',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.4',
        description: 'Duration of the transition in seconds.',
      }
    ],
  },
  defaultConfig: {
    duration: 0.4,
  },
  getVariants: () => ({
    initial: { 
      opacity: 0, 
      x: -40, 
      skewX: 30, 
      filter: "hue-rotate(90deg) contrast(200%) brightness(150%)",
      clipPath: "polygon(0 20%, 100% 20%, 100% 21%, 0 21%, 0 40%, 100% 40%, 100% 45%, 0 45%, 0 70%, 100% 70%, 100% 71%, 0 71%)"
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      skewX: 0, 
      filter: "hue-rotate(0deg) contrast(100%) brightness(100%)",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 0 100%)"
    },
    exit: { 
      opacity: 0, 
      x: 40, 
      skewX: -30, 
      filter: "hue-rotate(-90deg) contrast(200%) brightness(150%)",
      clipPath: "polygon(0 10%, 100% 10%, 100% 15%, 0 15%, 0 50%, 100% 50%, 100% 51%, 0 51%, 0 80%, 100% 80%, 100% 85%, 0 85%)"
    }
  }),
  getTransition: (config) => ({
    duration: config.duration,
    ease: [1, 0, 0, 1], // Aggressive snap cubic bezier instead of steps
  }),
};

registerTransition('glitch', glitchTransition);
