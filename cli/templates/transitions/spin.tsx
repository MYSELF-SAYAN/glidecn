import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const spinTransition: TransitionDefinition = {
  metadata: {
    name: 'spin',
    displayName: 'Spin',
    description: 'Dynamic spin transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.6',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.6,
    
  },
  getVariants: (config) => ({
    initial: { rotateZ: -180, scale: 0.5, opacity: 0 },
    animate: { rotateZ: 0, scale: 1, opacity: 1 },
    exit: { rotateZ: 180, scale: 0.5, opacity: 0 },
  }),
};

registerTransition('spin', spinTransition);
