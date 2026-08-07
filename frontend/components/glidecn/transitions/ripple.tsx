import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const rippleTransition: TransitionDefinition = {
  metadata: {
    name: 'ripple',
    displayName: 'Ripple',
    description: 'Dynamic ripple transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.9',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.9,
    
  },
  getVariants: (config) => ({
    initial: { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
    animate: { opacity: 1, clipPath: "circle(150% at 50% 50%)" },
    exit: { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
  }),
};

registerTransition('ripple', rippleTransition);
