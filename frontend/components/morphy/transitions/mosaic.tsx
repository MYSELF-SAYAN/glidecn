/* ==========================================================================
 * PageFlow — Mosaic Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const mosaicTransition: TransitionDefinition = {
  metadata: {
    name: 'mosaic',
    displayName: 'Mosaic',
    description: 'A jagged shattered polygon expansion.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.7',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 0.7,
  },
  getVariants: () => ({
    initial: { clipPath: 'polygon(50% 50%, 60% 40%, 40% 60%, 50% 50%)', opacity: 0 },
    animate: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: 1 },
    exit: { clipPath: 'polygon(40% 40%, 60% 60%, 40% 50%, 50% 60%)', opacity: 0 }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.65, 0, 0.35, 1],
  }),
};

registerTransition('mosaic', mosaicTransition);
