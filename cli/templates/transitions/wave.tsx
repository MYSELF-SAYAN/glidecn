import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const waveTransition: TransitionDefinition = {
  metadata: {
    name: 'wave',
    displayName: 'Wave',
    description: 'Dynamic wave transition',
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
    
  },
  getVariants: (config) => ({
    initial: (() => { const d = config.direction || 'left'; return ({ x: d === "left" ? "100%" : "-100%", borderRadius: "100%", opacity: 0 }); })(),
    animate: { x: 0, borderRadius: "0%", opacity: 1 },
    exit: (() => { const d = config.direction || 'left'; return ({ x: d === "left" ? "-100%" : "100%", borderRadius: "100%", opacity: 0 }); })(),
  }),
};

registerTransition('wave', waveTransition);
