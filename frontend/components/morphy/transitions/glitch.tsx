import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const glitchTransition: TransitionDefinition = {
  metadata: {
    name: 'glitch',
    displayName: 'Glitch',
    description: 'Dynamic glitch transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.3',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.3,
    
  },
  getVariants: (config) => ({
    initial: { opacity: 0, x: -20, skewX: 20, filter: "hue-rotate(90deg)" },
    animate: { opacity: 1, x: 0, skewX: 0, filter: "hue-rotate(0deg)" },
    exit: { opacity: 0, x: 20, skewX: -20, filter: "hue-rotate(-90deg)" },
  }),
};

registerTransition('glitch', glitchTransition);
