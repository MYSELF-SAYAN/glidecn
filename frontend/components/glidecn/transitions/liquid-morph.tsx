import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const liquidMorphTransition: TransitionDefinition = {
  metadata: {
    name: 'liquid-morph',
    displayName: 'Liquid Morph',
    description: 'Pages melt and reshape into each other like liquid.',
    category: 'experimental',
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
        filter: 'blur(30px)',
        opacity: 0,
        scale: 1.1,
        y: 50,
      },
      animate: {
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        y: 0,
      },
      exit: {
        filter: 'blur(30px)',
        opacity: 0,
        scale: 0.9,
        y: -50,
      },
    };
  },
  getTransition: (config): Transition => ({
    duration: config.duration,
    delay: config.delay,
    ease: [0.6, 0.05, -0.01, 0.9], 
  }),
};

registerTransition('liquid-morph', liquidMorphTransition);
