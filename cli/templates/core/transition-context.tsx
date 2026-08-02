'use client';

/* ==========================================================================
 * Morphy — Transition Context
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
  MorphyContextValue,
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

const MorphyContext = createContext<MorphyContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider (internal — composed inside MorphyProvider)
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

  const value: MorphyContextValue = useMemo(
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
    <MorphyContext.Provider value={value}>
      {children}
    </MorphyContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Hook to access Morphy context.
 * Must be used within a <MorphyProvider>.
 */
export function useMorphy(): MorphyContextValue {
  const context = useContext(MorphyContext);
  if (!context) {
    throw new Error('useMorphy must be used within a MorphyProvider');
  }
  return context;
}

/** Shortcut: only the resolved transition config. */
export function useTransitionConfig(): { config: TransitionConfig, setConfig: (config: TransitionConfig) => void } {
  const { config, setConfig } = useMorphy();
  return { config, setConfig };
}

/** Shortcut: current animation state. */
export function useAnimationState(): AnimationState {
  const { animationState } = useMorphy();
  return animationState;
}
