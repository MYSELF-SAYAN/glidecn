/* ==========================================================================
 * PageFlow — Page Curl Transition
 * Simulates a page curl using CSS 3D transforms and shadows.
 * No WebGL — pure CSS transforms orchestrated by Framer Motion.
 * ========================================================================== */

import type { Transition } from 'framer-motion';
import type { TransitionDefinition } from '../core/types';
import { registerTransition } from '../core/registry';

// ---------------------------------------------------------------------------
// Definition
// ---------------------------------------------------------------------------

export const pageCurlTransition: TransitionDefinition = {
  metadata: {
    name: 'page-curl',
    displayName: 'Page Curl',
    description:
      'A realistic page curl effect using CSS 3D transforms. No WebGL required.',
    category: 'paper',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '0.7',
        description: 'Duration of the curl in seconds.',
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay before the curl starts.',
      },
      {
        name: 'ease',
        type: 'EasingPreset',
        default: '"easeInOut"',
        description: 'Easing function for the curl animation.',
      },
      {
        name: 'custom.curlDirection',
        type: '"left" | "right"',
        default: '"right"',
        description: 'Direction the page curls toward.',
      },
      {
        name: 'custom.perspective',
        type: 'number',
        default: '1200',
        description: 'CSS perspective value in pixels.',
      },
    ],
  },

  defaultConfig: {
    duration: 0.7,
    ease: 'easeInOut',
    custom: {
      curlDirection: 'right',
      perspective: 1200,
    },
  },

  getVariants: (config) => {
    const curlDirection = (config.custom?.curlDirection as string) ?? 'right';
    const perspective = (config.custom?.perspective as number) ?? 1200;
    const rotateY = curlDirection === 'right' ? -90 : 90;
    const originX = curlDirection === 'right' ? '100%' : '0%';

    return {
      initial: {
        rotateY: rotateY,
        opacity: 0,
        transformPerspective: perspective,
        transformOrigin: `${originX} 50%`,
        boxShadow: 'none',
      },
      animate: {
        rotateY: 0,
        opacity: 1,
        transformPerspective: perspective,
        transformOrigin: `${originX} 50%`,
        boxShadow: 'none',
      },
      exit: {
        rotateY: -rotateY,
        opacity: 0,
        transformPerspective: perspective,
        transformOrigin: `${originX} 50%`,
        boxShadow:
          curlDirection === 'right'
            ? '-20px 0 60px rgba(0,0,0,0.3)'
            : '20px 0 60px rgba(0,0,0,0.3)',
      },
    };
  },

  getTransition: (config): Transition => ({
    duration: config.duration,
    delay: config.delay,
    ease: [0.22, 1, 0.36, 1],
  }),
};

// ---------------------------------------------------------------------------
// Auto-register
// ---------------------------------------------------------------------------

registerTransition('page-curl', pageCurlTransition);
