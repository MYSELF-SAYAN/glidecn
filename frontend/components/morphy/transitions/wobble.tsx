import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const wobbleTransition: TransitionDefinition = {
  metadata: {
    name: 'wobble',
    displayName: 'Wobble',
    description: 'Dynamic wobble transition',
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
    ease: "anticipate",
  },
  getVariants: (config) => ({
    initial: { rotateZ: 15, x: "50%", opacity: 0 },
    animate: { rotateZ: 0, x: "0%", opacity: 1 },
    exit: { rotateZ: -15, x: "-50%", opacity: 0 },
  }),
};

registerTransition('wobble', wobbleTransition);
