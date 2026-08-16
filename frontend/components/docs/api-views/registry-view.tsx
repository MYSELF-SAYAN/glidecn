'use client';

import React from 'react';
import { Cpu, PlusCircle, Search, Sparkles, BookOpen, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import {
  DocHero,
  SectionTwoCol,
  AccordionItem,
  BottomNavCards,
  PropsCard,
  type PropItem,
} from '@/components/docs/api-shared';

const REGISTRY_METHODS: PropItem[] = [
  {
    name: 'registerTransition(name, definition)',
    type: '(name: string, def: TransitionDefinition) => void',
    description: 'Registers a custom transition into the global runtime registry under the specified key name.',
  },
  {
    name: 'resolveTransition(name)',
    type: '(name: string) => TransitionDefinition',
    description: 'Resolves a transition definition by name. Throws an informative error listing available transitions if not found.',
  },
  {
    name: 'getTransition(name)',
    type: '(name: string) => TransitionDefinition | undefined',
    description: 'Retrieves a registered transition definition by name, or returns undefined if missing.',
  },
  {
    name: 'defaultRegistry.register(name, def)',
    type: '(name: string, def: TransitionDefinition) => void',
    description: 'Instance method to register or overwrite a transition definition in the default singleton registry.',
  },
  {
    name: 'defaultRegistry.list()',
    type: '() => string[]',
    description: 'Returns an array of all registered transition machine names (e.g. ["fade", "slide", "cube", ...]).',
  },
  {
    name: 'defaultRegistry.listDefinitions()',
    type: '() => TransitionDefinition[]',
    description: 'Returns an array of all registered TransitionDefinition objects with metadata and variant builders.',
  },
  {
    name: 'defaultRegistry.get(name)',
    type: '(name: string) => TransitionDefinition | undefined',
    description: 'Returns the exact registered transition definition or undefined.',
  },
  {
    name: 'defaultRegistry.has(name)',
    type: '(name: string) => boolean',
    description: 'Checks whether a transition is currently registered in the active registry.',
  },
];

export function DocsRegistryView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="Engine Registry"
        title="TransitionRegistry"
        description="The global registry system for discovering, listing, inspecting, and dynamically registering custom Framer Motion transitions."
        importSnippet="import { defaultRegistry, registerTransition, resolveTransition, getTransition } from '@/components/glidecn';"
      />

      {/* 2. REGISTRY METHODS & LISTING */}
      <SectionTwoCol
        icon={<Cpu className="size-5" />}
        title="Listing & Resolving"
        description={
          <div className="space-y-3">
            <p>
              The <code>TransitionRegistry</code> is a singleton map storing all transition definitions.
            </p>
            <p className="text-xs text-zinc-500">
              Query registered transition names, list full definitions, or check availability at runtime.
            </p>
          </div>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="1. Listing All Available Transition Names"
            description="Retrieve an array of all transition names currently registered in your application."
            badge="List Names"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\n// Returns string[] -> ['fade', 'slide', 'scale', 'cube', 'liquid-morph', ...]\nconst names = defaultRegistry.list();\nconsole.log(\`Loaded \${names.length} transitions:\`, names);`}
          />

          <AccordionItem
            title="2. Getting All Transition Definitions"
            description="Access full transition objects containing metadata, categories, and variant builder functions."
            badge="List Definitions"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\n// Returns TransitionDefinition[]\nconst allTransitions = defaultRegistry.listDefinitions();\n\nallTransitions.forEach((t) => {\n  console.log(\`[\${t.metadata.category}] \${t.metadata.displayName} (\${t.metadata.name})\`);\n});`}
          />

          <AccordionItem
            title="3. Filtering Transitions by Category"
            description="Filter registered transitions by family ('flow', 'portal', 'paper', 'mask', 'spatial', 'dynamic', 'experimental', 'retro')."
            badge="Filter by Category"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\n// Filter all 3D spatial transitions\nconst spatial = defaultRegistry.listDefinitions().filter(\n  (t) => t.metadata.category === 'spatial'\n);\n\n// Filter all portal transitions\nconst portals = defaultRegistry.listDefinitions().filter(\n  (t) => t.metadata.category === 'portal'\n);`}
          />

          <AccordionItem
            title="4. Checking Transition Availability (has)"
            description="Verify if a transition is installed before attempting to navigate or apply it."
            badge="Registry Check"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\nif (defaultRegistry.has('circular-portal')) {\n  console.log('Portal transition is installed and ready!');\n} else {\n  console.log('Install with: npx glidecn-cli add circular-portal');\n}`}
          />

          <AccordionItem
            title="5. Resolving a Transition Definition"
            description="Looks up a transition by name. Throws an error listing available options if not registered."
            badge="Safe Lookup"
            code={`import { resolveTransition, getTransition } from '@/components/glidecn';\n\n// Returns the definition for 'liquid-morph' or throws if missing\nconst def = resolveTransition('liquid-morph');\n\n// Non-throwing lookup: returns TransitionDefinition | undefined\nconst optionalDef = getTransition('custom-transition');`}
          />
        </div>

        <PropsCard title="TransitionRegistry API Methods" props={REGISTRY_METHODS} />
      </SectionTwoCol>

      {/* 3. AUTHORING CUSTOM TRANSITIONS */}
      <SectionTwoCol
        icon={<PlusCircle className="size-5" />}
        title="Authoring Custom Transitions"
        description={
          <div className="space-y-3">
            <p>
              Create custom transition definitions in your project and register them into the global engine using <code>registerTransition(name, definition)</code>.
            </p>
            <p className="text-xs text-zinc-500">
              Each transition receives the resolved <code>TransitionConfig</code> (duration, ease, direction, delay, custom) and returns Framer Motion <code>initial</code>, <code>animate</code>, and <code>exit</code> variants.
            </p>
          </div>
        }
      >
        <CodeBlock
          badge="components/glidecn/transitions/card-flip.tsx"
          code={`import { registerTransition, type TransitionDefinition } from '@/components/glidecn';\n\nexport const cardFlip: TransitionDefinition = {\n  metadata: {\n    name: 'card-flip',\n    displayName: 'Card Flip 3D',\n    description: 'Flips the incoming view along the vertical axis with 3D depth perspective.',\n    category: 'spatial',\n    props: [],\n  },\n  defaultConfig: {\n    duration: 0.7,\n    ease: 'easeInOut',\n    direction: 'left',\n  },\n  getVariants: (config) => {\n    const isLeft = config.direction === 'left';\n    return {\n      initial: {\n        opacity: 0,\n        rotateY: isLeft ? 90 : -90,\n        transformPerspective: 1000,\n      },\n      animate: {\n        opacity: 1,\n        rotateY: 0,\n        transformPerspective: 1000,\n      },\n      exit: {\n        opacity: 0,\n        rotateY: isLeft ? -90 : 90,\n        transformPerspective: 1000,\n      },\n    };\n  },\n};\n\n// Register into global runtime\nregisterTransition('card-flip', cardFlip);`}
        />
      </SectionTwoCol>

      {/* 4. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← useAnimationState()', href: '/docs/api/hooks/use-animation-state' }}
        next={{ label: 'Animation Engine →', href: '/docs/api/animation-engine' }}
      />
    </div>
  );
}
