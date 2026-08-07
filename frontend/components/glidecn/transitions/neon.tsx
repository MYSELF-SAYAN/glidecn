import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const neonTransition: TransitionDefinition = {
  metadata: {
    name: 'neon',
    displayName: 'Neon',
    description: 'Dynamic neon transition',
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
    initial: { opacity: 0, filter: "drop-shadow(0 0 50px rgba(255,0,255,1))", scale: 0.9 },
    animate: { opacity: 1, filter: "drop-shadow(0 0 0px rgba(255,0,255,0))", scale: 1 },
    exit: { opacity: 0, filter: "drop-shadow(0 0 50px rgba(0,255,255,1))", scale: 1.1 },
  }),
};

registerTransition('neon', neonTransition);
