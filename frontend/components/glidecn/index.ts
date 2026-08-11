/* ==========================================================================
 * GlideCN — Public API
 * Clean barrel export for all public-facing components and utilities.
 * ========================================================================== */

// Core components
export { GlideCNProvider, PageFlowProvider } from './core/provider';
export { TransitionManager as GlideCN, TransitionManager as PageFlow, TransitionManager } from './core/transition-manager';
export { Page } from './page';

// Router Adapters (Universal, React Router)
export {
  GlideCNUniversal,
  UniversalTransitionManager,
  GlideCNReactRouter,
  ReactRouterTransitionManager,
  GlideCNNextApp,
  NextAppTransitionManager,
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
  useGlide,
  useGlide as usePageFlow,
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
  GlideCNContextValue,
  GlideCNContextValue as PageFlowContextValue,
  PageProps,
  GlideCNProviderProps,
  GlideCNProviderProps as PageFlowProviderProps,
} from './core/types';

// Transition definitions (for docs / metadata access)
export { blackholeTransition } from './transitions/blackhole';
export { blueprintTransition } from './transitions/blueprint';
export { bounceTransition } from './transitions/bounce';
export { circularPortalTransition } from './transitions/circular-portal';
export { crystalTransition } from './transitions/crystal';
export { cubeTransition } from './transitions/cube';
export { dimensionTransition } from './transitions/dimension';
export { dissolveTransition } from './transitions/dissolve';
export { dreamTransition } from './transitions/dream';
export { earthTransition } from './transitions/earth';
export { fadeTransition } from './transitions/fade';
export { fireTransition } from './transitions/fire';
export { flipTransition } from './transitions/flip';
export { foldTransition } from './transitions/fold';
export { galaxyTransition } from './transitions/galaxy';
export { ghostTransition } from './transitions/ghost';
export { glassTransition } from './transitions/glass';
export { glitchTransition } from './transitions/glitch';
export { hologramTransition } from './transitions/hologram';
export { iceTransition } from './transitions/ice';
export { illusionTransition } from './transitions/illusion';
export { inkSpreadTransition } from './transitions/ink-spread';
export { kaleidoscopeTransition } from './transitions/kaleidoscope';
export { laserTransition } from './transitions/laser';
export { lensFlareTransition } from './transitions/lens-flare';
export { lightningTransition } from './transitions/lightning';
export { liquidMorphTransition } from './transitions/liquid-morph';
export { mirrorTransition } from './transitions/mirror';
export { mosaicTransition } from './transitions/mosaic';
export { neonTransition } from './transitions/neon';
export { nightmareTransition } from './transitions/nightmare';
export { origamiCrushTransition } from './transitions/origami-crush';
export { origamiUnfoldTransition } from './transitions/origami-unfold';
export { pageCurlTransition } from './transitions/page-curl';
export { paintDripTransition } from './transitions/paint-drip';
export { pixelTransition } from './transitions/pixel';
export { planetTransition } from './transitions/planet';
export { prismTransition } from './transitions/prism';
export { realityTransition } from './transitions/reality';
export { rippleTransition } from './transitions/ripple';
export { scaleTransition } from './transitions/scale';
export { shadowTransition } from './transitions/shadow';
export { shatterTransition } from './transitions/shatter';
export { shutterIrisTransition } from './transitions/shutter-iris';
export { slashTransition } from './transitions/slash';
export { slideTransition } from './transitions/slide';
export { smokeTransition } from './transitions/smoke';
export { spaceTransition } from './transitions/space';
export { sparkTransition } from './transitions/spark';
export { spinTransition } from './transitions/spin';
export { squeezeTransition } from './transitions/squeeze';
export { starTransition } from './transitions/star';
export { stretchTransition } from './transitions/stretch';
export { swipeTransition } from './transitions/swipe';
export { swirlTransition } from './transitions/swirl';
export { timeTransition } from './transitions/time';
export { tornadoTransition } from './transitions/tornado';
export { tvTurnOffTransition } from './transitions/tv-turn-off';
export { twirlTransition } from './transitions/twirl';
export { universeTransition } from './transitions/universe';
export { vortexTransition } from './transitions/vortex';
export { waterTransition } from './transitions/water';
export { waveTransition } from './transitions/wave';
export { windTransition } from './transitions/wind';
export { wobbleTransition } from './transitions/wobble';
export { wormholeTransition } from './transitions/wormhole';
export { wormhole2Transition } from './transitions/wormhole2';
export { zoomTransition } from './transitions/zoom';
