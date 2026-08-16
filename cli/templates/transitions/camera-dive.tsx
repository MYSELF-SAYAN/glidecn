/* ==========================================================================
 * GlideCN — Camera Dive Transition
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

export const cameraDiveTransition: TransitionDefinition = {
  metadata: {
    name: 'camera-dive',
    displayName: 'Camera Dive',
    description: 'Cinematic camera dive that zooms rapidly through an element into the next page.',
    category: 'spatial',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.65',
        description: 'Duration of the transition in seconds.',
      },
      {
        name: 'origin',
        type: "'center' | 'top' | 'bottom' | 'left' | 'right'",
        default: "'center'",
        description: 'Focal origin point for the camera dive.',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '[0.22, 1, 0.36, 1]',
        description: 'Easing curve for camera acceleration and settling.',
      },
    ],
  },
  defaultConfig: {
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1],
  },
  getVariants: (config) => {
    const originProp = (config.custom?.origin as string) || 'center';
    let transformOrigin = '50% 50%';
    if (originProp === 'top') transformOrigin = '50% 20%';
    else if (originProp === 'bottom') transformOrigin = '50% 80%';
    else if (originProp === 'left') transformOrigin = '20% 50%';
    else if (originProp === 'right') transformOrigin = '80% 50%';

    return {
      initial: {
        opacity: 0,
        scale: 0.45,
        z: -300,
        filter: 'blur(12px) brightness(1.25)',
        transformOrigin,
        transformPerspective: 1200,
      },
      animate: {
        opacity: 1,
        scale: 1,
        z: 0,
        filter: 'blur(0px) brightness(1)',
        transformOrigin,
        transformPerspective: 1200,
      },
      exit: {
        opacity: 0,
        scale: 4.8,
        z: 800,
        filter: 'blur(18px) brightness(1.3)',
        transformOrigin,
        transformPerspective: 1200,
      },
    };
  },
  getTransition: (config): Transition => ({
    duration: config.duration ?? 0.65,
    delay: config.delay ?? 0,
    ease: (config.ease as any) ?? [0.22, 1, 0.36, 1],
  }),
};

registerTransition('camera-dive', cameraDiveTransition);
