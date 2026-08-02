import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';
import type { Transition } from 'framer-motion';

export const cubeTransition: TransitionDefinition = {
  metadata: {
    name: 'cube',
    displayName: 'Cube',
    description: 'Pages rotate like faces of a 3D cube.',
    category: 'spatial',
    props: [
      {
        name: 'direction',
        type: "'left' | 'right' | 'up' | 'down'",
        default: "'left'",
        description: 'Direction of the rotation',
      },
      {
        name: 'duration',
        type: 'number',
        default: '0.6',
        description: 'Duration of the transition',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '"easeInOut"',
        description: 'Easing function',
      },
    ],
  },
  defaultConfig: {
    duration: 0.6,
    delay: 0,
    ease: 'easeInOut',
    direction: 'left',
  },
  getVariants: (config) => {
    const { direction } = config;

    const xOrigin = direction === 'left' ? '100%' : direction === 'right' ? '0%' : '50%';
    const yOrigin = direction === 'up' ? '100%' : direction === 'down' ? '0%' : '50%';
    const origin = `${xOrigin} ${yOrigin}`;

    const enterRotateY = direction === 'left' ? 90 : direction === 'right' ? -90 : 0;
    const enterRotateX = direction === 'up' ? -90 : direction === 'down' ? 90 : 0;

    const exitRotateY = direction === 'left' ? -90 : direction === 'right' ? 90 : 0;
    const exitRotateX = direction === 'up' ? 90 : direction === 'down' ? -90 : 0;

    return {
      initial: {
        rotateX: enterRotateX,
        rotateY: enterRotateY,
        opacity: 0,
        transformOrigin: origin,
        transformPerspective: 1200,
        z: -300,
      },
      animate: {
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        transformOrigin: origin,
        transformPerspective: 1200,
        z: 0,
      },
      exit: {
        rotateX: exitRotateX,
        rotateY: exitRotateY,
        opacity: 0,
        transformOrigin: origin,
        transformPerspective: 1200,
        z: -300,
      },
    };
  },
  getTransition: (config): Transition => ({
    duration: config.duration,
    delay: config.delay,
    ease: [0.4, 0, 0.2, 1], // easeInOut
  }),
};

registerTransition('cube', cubeTransition);
