import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const foldTransition: TransitionDefinition = {
  metadata: {
    name: 'fold',
    displayName: 'Fold',
    description: 'Dynamic fold transition',
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
    initial: (() => { const d = config.direction || 'left'; return ({ rotateX: d === "up" ? -90 : 90, opacity: 0, transformOrigin: d === "up" ? "top" : "bottom", transformPerspective: 1000 }); })(),
    animate: { rotateX: 0, opacity: 1 },
    exit: (() => { const d = config.direction || 'left'; return ({ rotateX: d === "up" ? 90 : -90, opacity: 0, transformOrigin: d === "up" ? "bottom" : "top", transformPerspective: 1000 }); })(),
  }),
};

registerTransition('fold', foldTransition);
