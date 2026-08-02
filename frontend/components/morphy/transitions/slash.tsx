import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const slashTransition: TransitionDefinition = {
  metadata: {
    name: 'slash',
    displayName: 'Slash',
    description: 'A sharp diagonal cut slices into the next page.',
    category: 'dynamic',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.5',
        description: 'Duration of the transition',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay before it starts',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '"easeInOut"',
        description: 'Easing function',
      },
    ],
  },
  defaultConfig: {
    duration: 0.5,
    delay: 0,
    ease: 'easeInOut',
  },
  getVariants: (config) => {
    return {
      initial: {
        clipPath: 'polygon(0 0, 0 0, -50% 100%, -50% 100%)',
        opacity: 1,
        zIndex: 20,
      },
      animate: {
        clipPath: 'polygon(0 0, 150% 0, 100% 100%, -50% 100%)',
        opacity: 1,
        zIndex: 20,
      },
      exit: {
        clipPath: 'polygon(0 0, 150% 0, 100% 100%, -50% 100%)',
        opacity: 1,
        zIndex: 10,
      },
    };
  },
  getTransition: (config): Transition => ({
    duration: config.duration,
    delay: config.delay,
    ease: [0.7, 0, 0.3, 1], // Sharp easing
  }),
};

registerTransition('slash', slashTransition);
