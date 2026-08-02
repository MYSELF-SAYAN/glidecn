/* ==========================================================================
 * PageFlow — Scale Transition
 * Zoom in/out effect with opacity.
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const scaleTransition: TransitionDefinition = {
  metadata: {
    name: 'scale',
    displayName: 'Scale',
    description: 'A zoom-in/zoom-out transition with opacity.',
    category: 'flow',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.4',
        description: 'Duration of the scale transition in seconds.',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay before the transition starts.',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '"easeInOut"',
        description: 'Easing function for the scale curve.',
      },
      {
        name: 'custom.scaleFrom',
        type: 'number',
        default: '0.92',
        description: 'Initial scale value when entering.',
      },
      {
        name: 'custom.scaleTo',
        type: 'number',
        default: '1.08',
        description: 'Scale value when exiting.',
      },
    ],
  },

  defaultConfig: {
    duration: 0.4,
    ease: 'easeInOut',
    custom: {
      scaleFrom: 0.92,
      scaleTo: 1.08,
    },
  },

  getVariants: (config) => {
    const scaleFrom = (config.custom?.scaleFrom as number) ?? 0.92;
    const scaleTo = (config.custom?.scaleTo as number) ?? 1.08;

    return {
      initial: {
        scale: scaleFrom,
        opacity: 0,
      },
      animate: {
        scale: 1,
        opacity: 1,
      },
      exit: {
        scale: scaleTo,
        opacity: 0,
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Auto-register
// ---------------------------------------------------------------------------

registerTransition('scale', scaleTransition);
