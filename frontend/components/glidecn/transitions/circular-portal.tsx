/* ==========================================================================
 * PageFlow — Circular Portal Transition
 * Circular clip-path mask reveal expanding from a configurable origin.
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const circularPortalTransition: TransitionDefinition = {
  metadata: {
    name: 'circular-portal',
    displayName: 'Circular Portal',
    description:
      'A circular mask reveal that expands from a point to reveal the new page.',
    category: 'portal',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.6',
        description: 'Duration of the reveal in seconds.',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay before the reveal starts.',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '"easeInOut"',
        description: 'Easing function for the reveal.',
      },
      {
        name: 'custom.originX',
        type: 'string',
        default: '"50%"',
        description: 'Horizontal origin of the circle (CSS value).',
      },
      {
        name: 'custom.originY',
        type: 'string',
        default: '"50%"',
        description: 'Vertical origin of the circle (CSS value).',
      },
    ],
  },

  defaultConfig: {
    duration: 0.6,
    ease: 'easeInOut',
    custom: {
      originX: '50%',
      originY: '50%',
    },
  },

  getVariants: (config) => {
    const originX = (config.custom?.originX as string) ?? '50%';
    const originY = (config.custom?.originY as string) ?? '50%';

    // circle() radius from 0% to 150% (150% ensures full coverage on all aspect ratios)
    return {
      initial: {
        clipPath: `circle(0% at ${originX} ${originY})`,
        opacity: 1,
      },
      animate: {
        clipPath: `circle(150% at ${originX} ${originY})`,
        opacity: 1,
      },
      exit: {
        clipPath: `circle(0% at ${originX} ${originY})`,
        opacity: 1,
      },
    };
  },

  getTransition: (config): Transition => ({
    duration: config.duration,
    delay: config.delay,
    ease: [0.4, 0, 0.2, 1],
  }),
};

// ---------------------------------------------------------------------------
// Auto-register
// ---------------------------------------------------------------------------

registerTransition('circular-portal', circularPortalTransition);
