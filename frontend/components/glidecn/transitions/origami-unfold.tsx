/* ==========================================================================
 * PageFlow — Origami Unfold Transition
 * A 3D unfolding effect similar to paper origami.
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const origamiUnfoldTransition: TransitionDefinition = {
  metadata: {
    name: 'origami-unfold',
    displayName: 'Origami Unfold',
    description: 'A 3D paper folding and unfolding effect.',
    category: 'paper',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
        description: 'Duration of the unfold animation.',
      },
    ],
  },

  defaultConfig: {
    duration: 0.8,
    ease: [0.6, -0.05, 0.01, 0.99], // snappy 3D ease
  },

  getVariants: () => {
    return {
      initial: {
        rotateX: 90,
        rotateY: -45,
        scale: 0.8,
        opacity: 0,
        transformOrigin: 'bottom',
      },
      animate: {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        transformOrigin: 'center',
      },
      exit: {
        rotateX: -90,
        rotateY: 45,
        scale: 0.8,
        opacity: 0,
        transformOrigin: 'top',
      },
    };
  },

  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: config.ease as any,
  }),
};

// ---------------------------------------------------------------------------
// Auto-register
// ---------------------------------------------------------------------------

registerTransition('origami-unfold', origamiUnfoldTransition);
