import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const shadowTransition: TransitionDefinition = {
  metadata: {
    name: 'shadow',
    displayName: 'Shadow',
    description: 'Dynamic shadow transition',
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
    initial: { opacity: 0, boxShadow: "0px 100px 100px rgba(0,0,0,0.5)", y: 50 },
    animate: { opacity: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)", y: 0 },
    exit: { opacity: 0, boxShadow: "0px -100px 100px rgba(0,0,0,0.5)", y: -50 },
  }),
};

registerTransition('shadow', shadowTransition);
