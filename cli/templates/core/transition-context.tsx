'use client';

/* ==========================================================================
 * GlideCN — Transition Context
 * React context and hooks for accessing transition state.
 * ========================================================================== */

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  GlideCNContextValue,
  TransitionConfig,
  AnimationState,
  TransitionDefinition,
} from './types';
import { DEFAULT_TRANSITION_CONFIG } from '../constants';
import { mergeConfig } from './utils';
import { defaultRegistry } from './registry';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const GlideCNContext = createContext<GlideCNContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider (internal — composed inside GlideCNProvider)
// ---------------------------------------------------------------------------

interface TransitionContextProviderProps {
  children: ReactNode;
  defaultTransition: string;
  defaultConfig: TransitionConfig;
  reducedMotion: boolean;
}

export function TransitionContextProvider({
  children,
  defaultTransition,
  defaultConfig,
  reducedMotion,
}: TransitionContextProviderProps) {
  const [currentTransition, setCurrentTransition] =
    useState<string>(defaultTransition);
  const [configOverrides, setConfigOverrides] = useState<TransitionConfig>({});
  const [animationState, setAnimationState] = useState<AnimationState>('idle');

  // Resolve the definition from the registry
  const transitionDefinition: TransitionDefinition | null = useMemo(() => {
    return defaultRegistry.get(currentTransition) ?? null;
  }, [currentTransition]);

  // Merge: transition defaults → global defaults → per-instance overrides
  const config = useMemo(() => {
    const transitionDefaults = transitionDefinition?.defaultConfig ?? {};
    const merged = mergeConfig(
      configOverrides,
      mergeConfig(transitionDefaults, mergeConfig(defaultConfig, DEFAULT_TRANSITION_CONFIG)),
    );
    return merged as Required<TransitionConfig>;
  }, [transitionDefinition, defaultConfig, configOverrides]);

  const setTransition = useCallback((name: string) => {
    setCurrentTransition(name);
    setConfigOverrides({});
  }, []);

  const setConfig = useCallback((c: TransitionConfig) => {
    setConfigOverrides((prev) => ({ ...prev, ...c }));
  }, []);

  const value: GlideCNContextValue = useMemo(
    () => ({
      currentTransition,
      config,
      transitionDefinition,
      animationState,
      reducedMotion,
      setTransition,
      setConfig,
    }),
    [
      currentTransition,
      config,
      transitionDefinition,
      animationState,
      reducedMotion,
      setTransition,
      setConfig,
    ],
  );

  return (
    <GlideCNContext.Provider value={value}>
      {children}
    </GlideCNContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Hook to access GlideCN context.
 * Must be used within a <GlideCNProvider>.
 */
export function useGlide(): GlideCNContextValue {
  const context = useContext(GlideCNContext);
  if (!context) {
    throw new Error('useGlide must be used within a GlideCNProvider');
  }
  return context;
}

/** Shortcut: only the resolved transition config. */
export function useTransitionConfig(): { config: TransitionConfig, setConfig: (config: TransitionConfig) => void } {
  const { config, setConfig } = useGlide();
  return { config, setConfig };
}

/** Shortcut: current animation state. */
export function useAnimationState(): AnimationState {
  const { animationState } = useGlide();
  return animationState;
}
