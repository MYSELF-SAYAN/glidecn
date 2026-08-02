import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const glassTransition: TransitionDefinition = {
  metadata: {
    name: 'glass',
    displayName: 'Glass',
    description: 'Dynamic glass transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.7',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.7,
    
  },
  getVariants: (config) => ({
    initial: { opacity: 0, backdropFilter: "blur(50px) saturate(200%)" },
    animate: { opacity: 1, backdropFilter: "blur(0px) saturate(100%)" },
    exit: { opacity: 0, backdropFilter: "blur(50px) saturate(200%)" },
  }),
};

registerTransition('glass', glassTransition);
