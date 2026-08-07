import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const ghostTransition: TransitionDefinition = {
  metadata: {
    name: 'ghost',
    displayName: 'Ghost',
    description: 'Dynamic ghost transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.8,
    
  },
  getVariants: (config) => ({
    initial: { opacity: 0, y: 40, filter: "brightness(2) contrast(0.5)" },
    animate: { opacity: 1, y: 0, filter: "brightness(1) contrast(1)" },
    exit: { opacity: 0, y: -40, filter: "brightness(2) contrast(0.5)" },
  }),
};

registerTransition('ghost', ghostTransition);
