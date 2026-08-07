import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const vortexTransition: TransitionDefinition = {
  metadata: {
    name: 'vortex',
    displayName: 'Vortex',
    description: 'Dynamic vortex transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '1.2',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 1.2,
    
  },
  getVariants: (config) => ({
    initial: { opacity: 0, rotateZ: 720, scale: 0 },
    animate: { opacity: 1, rotateZ: 0, scale: 1 },
    exit: { opacity: 0, rotateZ: -720, scale: 2 },
  }),
};

registerTransition('vortex', vortexTransition);
