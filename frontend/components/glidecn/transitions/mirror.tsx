import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const mirrorTransition: TransitionDefinition = {
  metadata: {
    name: 'mirror',
    displayName: 'Mirror',
    description: 'Dynamic mirror transition',
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
    initial: { opacity: 0, scaleX: -1 },
    animate: { opacity: 1, scaleX: 1 },
    exit: { opacity: 0, scaleX: -1 },
  }),
};

registerTransition('mirror', mirrorTransition);
