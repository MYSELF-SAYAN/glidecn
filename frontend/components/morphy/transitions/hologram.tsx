/* ==========================================================================
 * PageFlow — Hologram Transition
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const hologramTransition: TransitionDefinition = {
  metadata: {
    name: 'hologram',
    displayName: 'Hologram',
    description: 'Sci-fi Y-axis stretch and intense color hue shift.',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.6',
        description: 'Duration of the transition',
      }
    ],
  },
  defaultConfig: {
    duration: 0.6,
  },
  getVariants: () => ({
    initial: { opacity: 0, scaleY: 0.02, scaleX: 1.5, filter: 'hue-rotate(180deg) blur(5px) contrast(200%)' },
    animate: { opacity: 1, scaleY: 1, scaleX: 1, filter: 'hue-rotate(0deg) blur(0px) contrast(100%)' },
    exit: { opacity: 0, scaleY: 0.02, scaleX: 1.5, filter: 'hue-rotate(-180deg) blur(5px) contrast(200%)' }
  }),
  getTransition: (config): Transition => ({
    duration: config.duration,
    ease: [0.22, 1, 0.36, 1],
  }),
};

registerTransition('hologram', hologramTransition);
