/* ==========================================================================
 * Morphy — Transition Registry
 * A simple, extensible registry for transition definitions.
 * Future transitions only need to call `registerTransition()`.
 * ========================================================================== */

import type { TransitionDefinition } from './types';

// ---------------------------------------------------------------------------
// Registry Class
// ---------------------------------------------------------------------------

export class TransitionRegistry {
  private transitions = new Map<string, TransitionDefinition>();

  /**
   * Register a new transition definition.
   * @throws if a transition with the same name already exists.
   */
  register(name: string, definition: TransitionDefinition): void {
    if (this.transitions.has(name)) {
      console.warn(
        `[Morphy] Transition "${name}" is already registered. Overwriting.`,
      );
    }
    this.transitions.set(name, definition);
  }

  /**
   * Resolve a transition by name.
   * @throws Error if the transition is not found.
   */
  resolve(name: string): TransitionDefinition {
    const def = this.transitions.get(name);
    if (!def) {
      throw new Error(
        `[Morphy] Transition "${name}" not found. ` +
          `Available: ${[...this.transitions.keys()].join(', ')}`,
      );
    }
    return def;
  }

  /** Get a transition by name, or `undefined` if not found. */
  get(name: string): TransitionDefinition | undefined {
    return this.transitions.get(name);
  }

  /** Check whether a transition is registered. */
  has(name: string): boolean {
    return this.transitions.has(name);
  }

  /** Return all registered transition names. */
  list(): string[] {
    return [...this.transitions.keys()];
  }

  /** Return all registered definitions (for docs / showcase). */
  listDefinitions(): TransitionDefinition[] {
    return [...this.transitions.values()];
  }
}

// ---------------------------------------------------------------------------
// Default Singleton
// ---------------------------------------------------------------------------

/** The global default registry. Transitions auto-register here. */
export const defaultRegistry = new TransitionRegistry();

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/** Register a transition on the default registry. */
export function registerTransition(
  name: string,
  definition: TransitionDefinition,
): void {
  defaultRegistry.register(name, definition);
}

/** Resolve a transition from the default registry. */
export function resolveTransition(name: string): TransitionDefinition {
  return defaultRegistry.resolve(name);
}

/** Get a transition from the default registry (returns undefined if missing). */
export function getTransition(name: string): TransitionDefinition | undefined {
  return defaultRegistry.get(name);
}
