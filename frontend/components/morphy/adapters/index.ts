/* ==========================================================================
 * Morphy — Router Adapters
 * Unified exports for universal React routing.
 * ========================================================================== */

// Universal / Standalone / TanStack Router
export {
  MorphyUniversal,
  UniversalTransitionManager,
  type UniversalMorphyProps,
} from './universal';

// React Router / Vite / Remix
export {
  MorphyReactRouter,
  ReactRouterTransitionManager,
  type ReactRouterMorphyProps,
} from './react-router';
