import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const bounceTransition: TransitionDefinition = {
  metadata: {
    name: 'bounce',
    displayName: 'Bounce',
    description: 'Dynamic bounce transition',
    category: 'experimental',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.8',
        description: 'Duration of the transition in seconds.',
      }
    ]
  },
  defaultConfig: {
    duration: 0.8,
    ease: "backOut",
  },
  getVariants: (config) => ({
    initial: (() => { const d = config.direction || 'left'; return ({ y: d === "up" ? "100%" : d === "down" ? "-100%" : 0, x: d === "left" ? "100%" : d === "right" ? "-100%" : 0, opacity: 0, scale: 0.8 }); })(),
    animate: { y: 0, x: 0, opacity: 1, scale: 1 },
    exit: (() => { const d = config.direction || 'left'; return ({ y: d === "up" ? "-100%" : d === "down" ? "100%" : 0, x: d === "left" ? "-100%" : d === "right" ? "100%" : 0, opacity: 0, scale: 0.8 }); })(),
  }),
};

registerTransition('bounce', bounceTransition);
