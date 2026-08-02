/* ==========================================================================
 * PageFlow — Shutter Iris Transition
 * A cinematic camera shutter iris effect using complex clip-paths.
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const shutterIrisTransition: TransitionDefinition = {
  metadata: {
    name: 'shutter-iris',
    displayName: 'Camera Shutter',
    description: 'A cinematic camera shutter iris effect closing and opening.',
    category: 'portal',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
        description: 'Duration of the iris open/close.',
      },
    ],
  },

  defaultConfig: {
    duration: 0.8,
    ease: 'easeInOut',
  },

  getVariants: () => {
    // using a star/polygon that resembles an iris
    return {
      initial: {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        opacity: 0,
      },
      animate: {
        // full open
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
        opacity: 1,
      },
      exit: {
        // closed iris center point
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        opacity: 0,
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

registerTransition('shutter-iris', shutterIrisTransition);
