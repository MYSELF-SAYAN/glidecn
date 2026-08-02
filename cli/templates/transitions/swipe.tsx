import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const swipeTransition: TransitionDefinition = {
  metadata: {
    name: 'swipe',
    displayName: 'Swipe',
    description: 'Dynamic swipe transition',
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
    initial: (() => { const d = config.direction || 'left'; return ({ x: d === "left" ? "100%" : d === "right" ? "-100%" : 0, y: d === "up" ? "100%" : d === "down" ? "-100%" : 0, opacity: 0 }); })(),
    animate: { x: 0, y: 0, opacity: 1 },
    exit: (() => { const d = config.direction || 'left'; return ({ x: d === "left" ? "-100%" : d === "right" ? "100%" : 0, y: d === "up" ? "-100%" : d === "down" ? "100%" : 0, opacity: 0 }); })(),
  }),
};

registerTransition('swipe', swipeTransition);
