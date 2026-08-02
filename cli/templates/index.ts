/* ==========================================================================
 * Morphy — Public API
 * Clean barrel export for all public-facing components and utilities.
 * ========================================================================== */

// Core components
export { MorphyProvider, PageFlowProvider } from './core/provider';
export { TransitionManager as Morphy, TransitionManager as PageFlow, TransitionManager } from './core/transition-manager';
export { Page } from './page';

// Router Adapters (Universal, React Router)
export {
  MorphyUniversal,
  UniversalTransitionManager,
  MorphyReactRouter,
  ReactRouterTransitionManager,
} from './adapters';
export { FrozenRouter } from './core/router';

// Registry
export {
  TransitionRegistry,
  defaultRegistry,
  registerTransition,
  resolveTransition,
  getTransition,
} from './core/registry';

// Context & hooks
export {
  useMorphy,
  useMorphy as usePageFlow,
  useTransitionConfig,
  useAnimationState,
} from './core/transition-context';

// Animation engine
export {
  buildVariants,
  buildTransition,
  getWillChangeHint,
} from './core/animation-engine';

// Utilities
export {
  mergeConfig,
  resolveEasing,
  prefersReducedMotion,
  getDirectionOffset,
} from './core/utils';

// Constants
export {
  DEFAULT_TRANSITION_CONFIG,
  DEFAULT_TRANSITION_NAME,
  EASING_MAP,
  EASING_PRESETS,
  Z_INDEX,
  CATEGORY_LABELS,
} from './constants';

// Types
export type {
  TransitionConfig,
  TransitionMetadata,
  TransitionDefinition,
  TransitionVariants,
  TransitionComponentProps,
  TransitionPropSchema,
  TransitionDirection,
  TransitionCategory,
  EasingPreset,
  AnimationState,
  MorphyContextValue,
  MorphyContextValue as PageFlowContextValue,
  PageProps,
  MorphyProviderProps,
  MorphyProviderProps as PageFlowProviderProps,
} from './core/types';

// Transition definitions (for docs / metadata access)
export { fadeTransition } from './transitions/fade';
export { slideTransition } from './transitions/slide';
export { scaleTransition } from './transitions/scale';
export { circularPortalTransition } from './transitions/circular-portal';
export { pageCurlTransition } from './transitions/page-curl';
export { cubeTransition } from './transitions/cube';
export { flipTransition } from './transitions/flip';
export { foldTransition } from './transitions/fold';
export { inkSpreadTransition } from './transitions/ink-spread';
export { shutterIrisTransition } from './transitions/shutter-iris';
