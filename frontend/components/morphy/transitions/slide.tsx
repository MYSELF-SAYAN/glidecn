/* ==========================================================================
 * PageFlow — Slide Transition
 * Directional slide with configurable direction (left/right/up/down).
 * ========================================================================== */

import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import { getDirectionOffset } from '../core/utils';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const slideTransition: TransitionDefinition = {
  metadata: {
    name: 'slide',
    displayName: 'Slide',
    description: 'A directional slide transition between pages.',
    category: 'flow',
    props: [
      {
        name: 'direction',
        type: '"left" | "right" | "up" | "down"',
        default: '"left"',
        description: 'The direction the page slides in from.',
      },
      {
        name: 'duration',
        type: 'number',
        default: '0.5',
        description: 'Duration of the slide in seconds.',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay before the slide starts.',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '"easeInOut"',
        description: 'Easing function for the slide curve.',
      },
    ],
  },

  defaultConfig: {
    duration: 0.5,
    ease: 'easeInOut',
    direction: 'left',
  },

  getVariants: (config) => {
    const enter = getDirectionOffset(config.direction, 100);
    const exitOffset = getDirectionOffset(config.direction, -100);

    return {
      initial: {
        x: `${enter.x}%`,
        y: `${enter.y}%`,
        opacity: 0,
      },
      animate: {
        x: '0%',
        y: '0%',
        opacity: 1,
      },
      exit: {
        x: `${exitOffset.x}%`,
        y: `${exitOffset.y}%`,
        opacity: 0,
      },
    };
  },
};

// ---------------------------------------------------------------------------
// Auto-register directional variants
// ---------------------------------------------------------------------------

registerTransition('slide', slideTransition);
registerTransition('slide-left', {
  ...slideTransition,
  metadata: { ...slideTransition.metadata, name: 'slide-left' },
  defaultConfig: { ...slideTransition.defaultConfig, direction: 'left' },
});
registerTransition('slide-right', {
  ...slideTransition,
  metadata: { ...slideTransition.metadata, name: 'slide-right' },
  defaultConfig: { ...slideTransition.defaultConfig, direction: 'right' },
});
registerTransition('slide-up', {
  ...slideTransition,
  metadata: { ...slideTransition.metadata, name: 'slide-up' },
  defaultConfig: { ...slideTransition.defaultConfig, direction: 'up' },
});
registerTransition('slide-down', {
  ...slideTransition,
  metadata: { ...slideTransition.metadata, name: 'slide-down' },
  defaultConfig: { ...slideTransition.defaultConfig, direction: 'down' },
});
