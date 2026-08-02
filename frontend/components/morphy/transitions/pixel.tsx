import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const pixelTransition: TransitionDefinition = {
  metadata: {
    name: 'pixel',
    displayName: 'Pixel',
    description: 'Dynamic pixel transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.4',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.4,
    ease: "steps(5, end)",
  },
  getVariants: (config) => ({
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  }),
};

registerTransition('pixel', pixelTransition);
