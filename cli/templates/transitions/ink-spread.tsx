import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const inkSpreadTransition: TransitionDefinition = {
  metadata: {
    name: 'ink-spread',
    displayName: 'Ink Spread',
    description: 'Ink spreads organically across the screen revealing the next scene.',
    category: 'mask',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.9',
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
    duration: 0.9,
    delay: 0,
    ease: 'easeInOut',
  },
  getVariants: (config) => {
    return {
      initial: {
        clipPath: 'circle(0% at 50% 50%)',
        filter: 'brightness(2) contrast(1.5)',
        opacity: 0,
        zIndex: 20,
      },
      animate: {
        clipPath: 'circle(150% at 50% 50%)',
        filter: 'brightness(1) contrast(1)',
        opacity: 1,
        zIndex: 20,
      },
      exit: {
        clipPath: 'circle(150% at 50% 50%)',
        opacity: 1,
        zIndex: 10,
      },
    };
  },
  getTransition: (config): Transition => ({
    duration: config.duration,
    delay: config.delay,
    ease: [0.6, 0.01, -0.05, 0.9], // Dramatic expansion
  }),
};

registerTransition('ink-spread', inkSpreadTransition);
