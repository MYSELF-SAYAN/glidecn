import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const zoomTransition: TransitionDefinition = {
  metadata: {
    name: 'zoom',
    displayName: 'Zoom',
    description: 'Dynamic zoom transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.5',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.5,
    
  },
  getVariants: (config) => ({
    initial: { scale: 0.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0 },
  }),
};

registerTransition('zoom', zoomTransition);
