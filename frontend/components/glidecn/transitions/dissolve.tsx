import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const dissolveTransition: TransitionDefinition = {
  metadata: {
    name: 'dissolve',
    displayName: 'Dissolve',
    description: 'Dynamic dissolve transition',
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
    initial: { opacity: 0, filter: "blur(20px)", scale: 1.05 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(20px)", scale: 0.95 },
  }),
};

registerTransition('dissolve', dissolveTransition);
