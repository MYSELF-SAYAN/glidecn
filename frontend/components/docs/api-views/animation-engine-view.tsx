'use client';

import React from 'react';
import { Sliders, Cpu, Zap, Activity, BookOpen } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import {
  DocHero,
  SectionTwoCol,
  AccordionItem,
  BottomNavCards,
} from '@/components/docs/api-shared';

export function DocsAnimationEngineView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="Motion Helpers"
        title="Animation Engine"
        description="Pure utility functions for compiling Framer Motion variant trees, computing easing curves, resolving offsets, and optimizing GPU layers."
        importSnippet="import { buildVariants, buildTransition, getWillChangeHint, resolveEasing } from '@/components/glidecn';"
      />

      {/* 2. ENGINE UTILITIES */}
      <SectionTwoCol
        icon={<Sliders className="size-5" />}
        title="Engine Functions"
        description={
          <p>
            Lightweight, stateless helper functions used internally by <code>&lt;Page&gt;</code> and custom transition authors.
          </p>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="buildVariants(definition, config, reducedMotion)"
            description="Compiles initial, animate, and exit Framer Motion variants. When reducedMotion is true, generates instant opacity-only fades."
            badge="Variant Compiler"
            code={`import { buildVariants } from '@/components/glidecn';\n\nconst variants = buildVariants(definition, resolvedConfig, false);`}
          />

          <AccordionItem
            title="buildTransition(definition, config, reducedMotion)"
            description="Constructs a Framer Motion Transition object with resolved duration, delay, and cubic-bezier easing."
            badge="Timing Builder"
            code={`import { buildTransition } from '@/components/glidecn';\n\nconst transition = buildTransition(definition, resolvedConfig, false);`}
          />

          <AccordionItem
            title="getWillChangeHint(definition)"
            description="Analyzes the transition properties and returns optimal CSS will-change hints ('opacity', 'transform, opacity', or 'clip-path, opacity')."
            badge="GPU Compositor Hint"
            code={`import { getWillChangeHint } from '@/components/glidecn';\n\nconst hint = getWillChangeHint(definition);\n// 'transform, opacity'`}
          />

          <AccordionItem
            title="resolveEasing(ease)"
            description="Maps easing names ('linear', 'easeIn', 'easeOut', 'easeInOut', 'spring') to 4-number cubic-bezier tuples."
            badge="Easing Resolver"
            code={`import { resolveEasing } from '@/components/glidecn';\n\nconst bezier = resolveEasing('spring');\n// [0.22, 1, 0.36, 1]`}
          />

          <AccordionItem
            title="getDirectionOffset(direction, distance)"
            description="Computes 2D Cartesian coordinates { x, y } along a given directional axis."
            badge="Vector Math"
            code={`import { getDirectionOffset } from '@/components/glidecn';\n\nconst { x, y } = getDirectionOffset('left', 100);\n// { x: -100, y: 0 }`}
          />
        </div>
      </SectionTwoCol>

      {/* 3. CONSTANTS */}
      <SectionTwoCol
        icon={<Zap className="size-5" />}
        title="Engine Constants"
        description={
          <p>
            Default baseline configuration and predefined cubic-bezier easing curves.
          </p>
        }
      >
        <CodeBlock
          badge="core/constants.ts"
          code={`export const DEFAULT_TRANSITION_CONFIG = {\n  duration: 0.4,\n  delay: 0,\n  ease: 'easeInOut',\n  direction: 'left',\n  stagger: 0,\n  custom: {},\n};\n\nexport const EASING_MAP = {\n  linear: [0, 0, 1, 1],\n  easeIn: [0.4, 0, 1, 1],\n  easeOut: [0, 0, 0.2, 1],\n  easeInOut: [0.4, 0, 0.2, 1],\n  spring: [0.22, 1, 0.36, 1],\n};`}
        />
      </SectionTwoCol>

      {/* 4. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← TransitionRegistry', href: '/docs/api/registry' }}
        next={{ label: 'TypeScript Types →', href: '/docs/api/types' }}
      />
    </div>
  );
}
