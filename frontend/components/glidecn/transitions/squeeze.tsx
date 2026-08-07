import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const squeezeTransition: TransitionDefinition = {
  metadata: {
    name: 'squeeze',
    displayName: 'Squeeze',
    description: 'Dynamic squeeze transition',
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
    initial: (() => { const d = config.direction || 'left'; return ({ scaleX: d === "left" || d === "right" ? 0.5 : 1, scaleY: d === "up" || d === "down" ? 0.5 : 1, opacity: 0 }); })(),
    animate: { scaleX: 1, scaleY: 1, opacity: 1 },
    exit: (() => { const d = config.direction || 'left'; return ({ scaleX: d === "left" || d === "right" ? 1.5 : 1, scaleY: d === "up" || d === "down" ? 1.5 : 1, opacity: 0 }); })(),
  }),
};

registerTransition('squeeze', squeezeTransition);
