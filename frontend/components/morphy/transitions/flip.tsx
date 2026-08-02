import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const flipTransition: TransitionDefinition = {
  metadata: {
    name: 'flip',
    displayName: 'Flip',
    description: 'Dynamic flip transition',
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
    initial: (() => { const d = config.direction || 'left'; return ({ rotateY: d === "left" || d === "right" ? (d === "left" ? 90 : -90) : 0, rotateX: d === "up" || d === "down" ? (d === "up" ? -90 : 90) : 0, opacity: 0, transformPerspective: 1000 }); })(),
    animate: { rotateY: 0, rotateX: 0, opacity: 1, transformPerspective: 1000 },
    exit: (() => { const d = config.direction || 'left'; return ({ rotateY: d === "left" || d === "right" ? (d === "left" ? -90 : 90) : 0, rotateX: d === "up" || d === "down" ? (d === "up" ? 90 : -90) : 0, opacity: 0, transformPerspective: 1000 }); })(),
  }),
};

registerTransition('flip', flipTransition);
