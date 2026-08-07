import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const wormholeTransition: TransitionDefinition = {
  metadata: {
    name: 'wormhole',
    displayName: 'Wormhole',
    description: 'Space bends and stretches as the page transforms into another world.',
    category: 'portal',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
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
    duration: 0.8,
    delay: 0,
    ease: 'easeInOut',
  },
  getVariants: (config) => {
    return {
      initial: {
        scale: 3,
        rotate: 45,
        opacity: 0,
        filter: 'blur(20px)',
      },
      animate: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: 'blur(0px)',
      },
      exit: {
        scale: 0,
        rotate: -45,
        opacity: 0,
        filter: 'blur(20px)',
      },
    };
  },
  getTransition: (config): Transition => ({
    duration: config.duration,
    delay: config.delay,
    ease: [0.6, 0.05, -0.01, 0.9], // Dramatic ease
  }),
};

registerTransition('wormhole', wormholeTransition);
