/* ==========================================================================
 * GlideCN — Gravity Transition
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const gravityTransition: TransitionDefinition = {
  metadata: {
    name: 'gravity',
    displayName: 'Gravity',
    description: 'The page loses gravity, floats upward in orbit around the center, and gravitationally falls into place.',
    category: 'spatial',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
        description: 'Duration of the transition in seconds.',
      },
      {
        name: 'direction',
        type: "'up' | 'down' | 'left' | 'right'",
        default: "'up'",
        description: 'Primary zero-g drift vector.',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '[0.16, 1, 0.3, 1]',
        description: 'Easing curve for gravitational settling.',
      },
    ],
  },
  defaultConfig: {
    duration: 0.8,
    direction: 'up',
    ease: [0.16, 1, 0.3, 1],
  },
  getVariants: (config) => {
    const dir = config.direction || 'up';
    const isHorizontal = dir === 'left' || dir === 'right';
    const mult = dir === 'right' || dir === 'down' ? 1 : -1;

    return {
      initial: {
        opacity: 0,
        y: isHorizontal ? -50 : -150,
        x: isHorizontal ? mult * 120 : 0,
        scale: 1.08,
        rotateZ: mult * 7,
        rotateX: -14,
        rotateY: isHorizontal ? mult * 15 : 0,
        filter: 'blur(10px) brightness(1.2)',
        transformPerspective: 1200,
      },
      animate: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        filter: 'blur(0px) brightness(1)',
        transformPerspective: 1200,
      },
      exit: {
        opacity: 0,
        y: isHorizontal ? -40 : -120,
        x: isHorizontal ? -mult * 90 : 35,
        scale: 0.86,
        rotateZ: -mult * 14,
        rotateX: 18,
        rotateY: isHorizontal ? -mult * 18 : 12,
        filter: 'blur(8px) brightness(1.15)',
        transformPerspective: 1200,
      },
    };
  },
  getTransition: (config): Transition => ({
    duration: config.duration ?? 0.8,
    delay: config.delay ?? 0,
    ease: (config.ease as any) ?? [0.16, 1, 0.3, 1],
  }),
};

registerTransition('gravity', gravityTransition);
