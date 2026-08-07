'use client';

/* ==========================================================================
 * GlideCN — Page Component
 * Wraps page content with the resolved transition animation.
 * ========================================================================== */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { PageProps } from './core/types';
import { useGlide } from './core/transition-context';
import { defaultRegistry } from './core/registry';
import { mergeConfig } from './core/utils';
import { buildVariants, buildTransition, getWillChangeHint } from './core/animation-engine';
import { DEFAULT_TRANSITION_NAME } from './constants';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

/**
 * Wraps page content and applies the specified transition animation.
 *
 * @example
 * ```tsx
 * <Page transition="slide" direction="left" duration={0.5}>
 *   <HomePage />
 * </Page>
 * ```
 */
export function Page({
  children,
  transition,
  duration,
  delay,
  ease,
  direction,
  stagger,
  custom,
  className,
  style,
}: PageProps) {
  const { currentTransition, config: globalConfig, reducedMotion } = useGlide();

  // Resolve the transition definition: page-level prop takes precedence over global transition from context
  const transitionName = transition ?? currentTransition ?? DEFAULT_TRANSITION_NAME;
  const definition = useMemo(
    () => defaultRegistry.get(transitionName) ?? defaultRegistry.get(DEFAULT_TRANSITION_NAME),
    [transitionName],
  );

  // Merge page-level overrides with global config
  const resolvedConfig = useMemo(() => {
    const pageOverrides = {
      ...(duration !== undefined && { duration }),
      ...(delay !== undefined && { delay }),
      ...(ease !== undefined && { ease }),
      ...(direction !== undefined && { direction }),
      ...(stagger !== undefined && { stagger }),
      ...(custom !== undefined && { custom }),
    };
    return mergeConfig(pageOverrides, globalConfig);
  }, [duration, delay, ease, direction, stagger, custom, globalConfig]);

  // Build Framer Motion props
  const variants = useMemo(() => {
    if (!definition) return { initial: {}, animate: {}, exit: {} };
    return buildVariants(definition, resolvedConfig, reducedMotion);
  }, [definition, resolvedConfig, reducedMotion]);

  const motionTransition = useMemo(() => {
    if (!definition) return { duration: 0.4 };
    return buildTransition(definition, resolvedConfig, reducedMotion);
  }, [definition, resolvedConfig, reducedMotion]);

  const willChange = definition ? getWillChangeHint(definition) : 'auto';

  return (
    <motion.div
      initial={variants.initial as any}
      animate={variants.animate as any}
      exit={variants.exit as any}
      transition={motionTransition as any}
      style={{ willChange, ...style }}
      className={`w-full flex-1 flex flex-col ${className || ''}`}
    >
      {children}
    </motion.div>
  );
}
