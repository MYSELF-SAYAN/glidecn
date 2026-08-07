/* ==========================================================================
 * GlideCN — Router Adapters
 * Unified exports for universal React routing.
 * ========================================================================== */

// Universal / Standalone / TanStack Router
export {
  GlideCNUniversal,
  UniversalTransitionManager,
  type UniversalGlideCNProps,
} from './universal';

// React Router / Vite / Remix
export {
  GlideCNReactRouter,
  ReactRouterTransitionManager,
  type ReactRouterGlideCNProps,
} from './react-router';
