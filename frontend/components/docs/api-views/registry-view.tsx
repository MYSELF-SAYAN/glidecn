'use client';

import React from 'react';
import { Cpu, PlusCircle, Search, ListFilter, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
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
    name: 'registerTransition(definition)',
    type: '(def: TransitionDefinition) => void',
    description: 'Registers a custom transition into the global runtime registry.',
  },
  {
    name: 'resolveTransition(name)',
    type: '(name: string) => TransitionDefinition',
    description: 'Safely resolves a transition by name. Falls back to "fade" if not found.',
  },
  {
    name: 'getTransition(name)',
    type: '(name: string) => TransitionDefinition | undefined',
    description: 'Returns the exact registered transition definition or undefined.',
  },
  {
    name: 'defaultRegistry.getNames()',
    type: '() => string[]',
    description: 'Returns an array of all registered transition machine names (e.g. ["fade", "slide", "cube", ...]).',
  },
  {
    name: 'defaultRegistry.getAll()',
    type: '() => TransitionDefinition[]',
    description: 'Returns an array of all full registered TransitionDefinition objects.',
  },
  {
    name: 'defaultRegistry.getByCategory(cat)',
    type: '(cat: TransitionCategory) => TransitionDefinition[]',
    description: 'Filters and returns all registered transitions belonging to a given family category.',
  },
  {
    name: 'defaultRegistry.has(name)',
    type: '(name: string) => boolean',
    description: 'Checks whether a transition name exists in the active registry.',
  },
  {
    name: 'defaultRegistry.unregister(name)',
    type: '(name: string) => boolean',
    description: 'Removes a transition definition from the active registry.',
  },
];

export function DocsRegistryView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="Engine Registry"
        title="TransitionRegistry"
        description="The global registry system for discovering, listing, inspecting, and registering custom Framer Motion transitions."
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
              You can query registered names, filter by category, list all definitions, or check transition availability at runtime.
            </p>
          </div>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="1. Listing All Available Transition Names"
            description="Retrieve an array of all transition names registered in your application in one simple call."
            badge="List Names"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\n// Returns string[] -> ['fade', 'slide', 'scale', 'cube', 'liquid-morph', ...]\nconst transitionNames = defaultRegistry.getNames();\nconsole.log(\`Loaded \${transitionNames.length} transitions:\`, transitionNames);`}
          />

          <AccordionItem
            title="2. Getting All Transition Definitions"
            description="Access full transition objects containing metadata, categories, and variant builder functions."
            badge="List Definitions"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\n// Returns TransitionDefinition[]\nconst allTransitions = defaultRegistry.getAll();\n\nallTransitions.forEach((t) => {\n  console.log(\`[\${t.metadata.category}] \${t.metadata.displayName} (\${t.metadata.name})\`);\n});`}
          />

          <AccordionItem
            title="3. Filtering Transitions by Category"
            description="Filter registered transitions by family ('flow', 'portal', 'paper', 'mask', 'spatial', 'dynamic', 'experimental', 'retro')."
            badge="Filter by Category"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\n// Get all 3D spatial transitions\nconst spatialTransitions = defaultRegistry.getByCategory('spatial');\n\n// Get all portal transitions\nconst portalTransitions = defaultRegistry.getByCategory('portal');`}
          />

          <AccordionItem
            title="4. Checking Transition Availability (has)"
            description="Verify if a specific transition is registered before attempting to navigate or apply it."
            badge="Registry Check"
            code={`import { defaultRegistry } from '@/components/glidecn';\n\nif (defaultRegistry.has('circular-portal')) {\n  console.log('Portal transition is installed and ready!');\n} else {\n  console.log('Please run: npx glidecn-cli add circular-portal');\n}`}
          />

          <AccordionItem
            title="5. Safe Transition Resolver with Fallback"
            description="Looks up a transition by name. If missing, logs a warning and returns the fallback 'fade' transition safely."
            badge="Safe Lookup"
            code={`import { resolveTransition } from '@/components/glidecn';\n\n// Returns the definition for 'liquid-morph' or fallback 'fade'\nconst def = resolveTransition('liquid-morph');`}
          />
        </div>

        <PropsCard title="TransitionRegistry API Methods" props={REGISTRY_METHODS} />
      </SectionTwoCol>

      {/* 3. AUTHORING CUSTOM TRANSITIONS */}
      <SectionTwoCol
        icon={<PlusCircle className="size-5" />}
        title="Authoring Custom Transitions"
        description={
          <p>
            You can create custom transition definitions in your project and register them into the global engine with <code>registerTransition()</code>.
          </p>
        }
      >
        <CodeBlock
          badge="components/glidecn/transitions/card-flip.tsx"
          code={`import { registerTransition, type TransitionDefinition } from '@/components/glidecn';\n\nexport const cardFlip: TransitionDefinition = {\n  metadata: {\n    name: 'card-flip',\n    displayName: 'Card Flip 3D',\n    description: 'Flips the incoming view along the vertical axis with 3D depth perspective.',\n    category: 'spatial',\n    props: [],\n  },\n  defaultConfig: {\n    duration: 0.7,\n    ease: 'easeInOut',\n    direction: 'left',\n  },\n  getVariants: (config) => {\n    const isLeft = config.direction === 'left';\n    return {\n      initial: {\n        opacity: 0,\n        rotateY: isLeft ? 90 : -90,\n        transformPerspective: 1000,\n      },\n      animate: {\n        opacity: 1,\n        rotateY: 0,\n        transformPerspective: 1000,\n      },\n      exit: {\n        opacity: 0,\n        rotateY: isLeft ? -90 : 90,\n        transformPerspective: 1000,\n      },\n    };\n  },\n};\n\n// Register into global runtime on module import\nregisterTransition(cardFlip);`}
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
