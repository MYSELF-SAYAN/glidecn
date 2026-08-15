'use client';

import React from 'react';
import { FileCode, Braces, Layers, Box } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import {
  DocHero,
  SectionTwoCol,
  BottomNavCards,
} from '@/components/docs/api-shared';

export function DocsTypesView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="Type Glossaries"
        title="TypeScript Types"
        description="Comprehensive TypeScript definitions, interface schemas, and prop types for GlideCN. All types are strictly validated and exported directly from the barrel."
        importSnippet="import type { TransitionConfig, TransitionDefinition, PageProps } from '@/components/glidecn';"
      />

      {/* 2. CONFIGURATION TYPES */}
      <SectionTwoCol
        icon={<FileCode className="size-5" />}
        title="Configuration Types"
        description={
          <p>
            Interfaces controlling timing, easing curves, directional flow, and animation states.
          </p>
        }
      >
        <div className="space-y-6">
          <CodeBlock
            badge="TransitionConfig"
            code={`export interface TransitionConfig {\n  /** Duration in seconds (default: 0.4) */\n  duration?: number;\n\n  /** Delay before animation starts, in seconds */\n  delay?: number;\n\n  /** Easing preset or custom cubic-bezier tuple */\n  ease?: EasingPreset;\n\n  /** Direction for directional transitions */\n  direction?: TransitionDirection;\n\n  /** Stagger children delay in seconds */\n  stagger?: number;\n\n  /** Arbitrary custom parameters passed to transitions */\n  custom?: Record<string, unknown>;\n}`}
          />

          <CodeBlock
            badge="Enums & Unions"
            code={`export type TransitionDirection = 'left' | 'right' | 'up' | 'down';\n\nexport type AnimationState = 'idle' | 'entering' | 'exiting' | 'complete';\n\nexport type EasingPreset =\n  | 'linear'\n  | 'easeIn'\n  | 'easeOut'\n  | 'easeInOut'\n  | 'spring'\n  | [number, number, number, number]\n  | string;\n\nexport type TransitionCategory =\n  | 'flow'\n  | 'portal'\n  | 'paper'\n  | 'mask'\n  | 'spatial'\n  | 'dynamic'\n  | 'experimental'\n  | 'retro';`}
          />
        </div>
      </SectionTwoCol>

      {/* 3. DEFINITION & REGISTRY TYPES */}
      <SectionTwoCol
        icon={<Braces className="size-5" />}
        title="Definition Schemas"
        description={
          <p>
            Types required to build custom transitions and register them with <code>TransitionRegistry</code>.
          </p>
        }
      >
        <div className="space-y-6">
          <CodeBlock
            badge="TransitionDefinition"
            code={`export interface TransitionDefinition {\n  /** Metadata for docs and UI listings */\n  metadata: TransitionMetadata;\n\n  /** Default configuration values */\n  defaultConfig: TransitionConfig;\n\n  /** Resolves Framer Motion variants for this transition */\n  getVariants: (config: Required<TransitionConfig>) => TransitionVariants;\n\n  /** Optional Framer Motion transition timing override */\n  getTransition?: (config: Required<TransitionConfig>) => import('framer-motion').Transition;\n}`}
          />

          <CodeBlock
            badge="TransitionMetadata & Variants"
            code={`export interface TransitionMetadata {\n  name: string;\n  displayName: string;\n  description: string;\n  category: TransitionCategory;\n  props: TransitionPropSchema[];\n}\n\nexport interface TransitionVariants {\n  initial: import('framer-motion').Variant;\n  animate: import('framer-motion').Variant;\n  exit: import('framer-motion').Variant;\n}`}
          />
        </div>
      </SectionTwoCol>

      {/* 4. COMPONENT PROPS TYPES */}
      <SectionTwoCol
        icon={<Layers className="size-5" />}
        title="Component Props"
        description={
          <p>
            Props accepted by <code>&lt;GlideCNProvider&gt;</code>, <code>&lt;GlideCN&gt;</code>, and <code>&lt;Page&gt;</code>.
          </p>
        }
      >
        <CodeBlock
          badge="Component Props Interfaces"
          code={`export interface PageProps {\n  children: React.ReactNode;\n  transition?: string;\n  duration?: number;\n  delay?: number;\n  ease?: EasingPreset;\n  direction?: TransitionDirection;\n  stagger?: number;\n  custom?: Record<string, unknown>;\n  className?: string;\n  style?: React.CSSProperties;\n}\n\nexport interface GlideCNProviderProps {\n  children: React.ReactNode;\n  defaultTransition?: string;\n  defaultConfig?: TransitionConfig;\n  reducedMotion?: boolean;\n}\n\nexport interface GlideCNContextValue {\n  currentTransition: string;\n  transitionDefinition: TransitionDefinition | null;\n  config: Required<TransitionConfig>;\n  animationState: AnimationState;\n  reducedMotion: boolean;\n  setTransition: (name: string) => void;\n  setConfig: (config: TransitionConfig) => void;\n}`}
        />
      </SectionTwoCol>

      {/* 5. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← Animation Engine', href: '/docs/api/animation-engine' }}
        next={{ label: 'CLI Reference →', href: '/docs/cli' }}
      />
    </div>
  );
}
