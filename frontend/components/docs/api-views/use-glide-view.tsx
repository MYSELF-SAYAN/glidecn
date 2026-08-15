'use client';

import React from 'react';
import { Braces, Sliders, ArrowRightLeft, Sparkles, Shield, Compass } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import {
  DocHero,
  SectionTwoCol,
  FrameworkTabs,
  PropsCard,
  AccordionItem,
  BottomNavCards,
  type PropItem,
} from '@/components/docs/api-shared';

const USE_GLIDE_RETURNS: PropItem[] = [
  {
    name: 'currentTransition',
    type: 'string',
    description: 'The machine name of the currently active transition preset (e.g. "slide", "circular-portal").',
  },
  {
    name: 'setTransition',
    type: '(name: string) => void',
    description: 'Imperatively switches the active transition before or during route navigation.',
  },
  {
    name: 'config',
    type: 'Required<TransitionConfig>',
    description: 'The fully merged active configuration object (duration, delay, ease, direction, stagger, custom).',
  },
  {
    name: 'setConfig',
    type: '(config: TransitionConfig) => void',
    description: 'Dynamically updates transition timing, easing, or directional parameters at runtime.',
  },
  {
    name: 'animationState',
    type: '"idle" | "entering" | "exiting" | "complete"',
    description: 'Current lifecycle phase of the page transition.',
  },
  {
    name: 'reducedMotion',
    type: 'boolean',
    description: 'Whether reduced motion accessibility mode is currently active.',
  },
  {
    name: 'transitionDefinition',
    type: 'TransitionDefinition | null',
    description: 'Direct reference to the registered transition definition metadata and variant builders.',
  },
];

export function DocsUseGlideView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="React Hook"
        title="useGlide()"
        description="The primary hook to inspect active transitions, mutate configuration dynamically, monitor lifecycle states, and programmatically orchestrate navigation."
        importSnippet="import { useGlide } from '@/components/glidecn';"
      />

      {/* 2. SIGNATURE & RETURNS */}
      <SectionTwoCol
        icon={<Braces className="size-5" />}
        title="Signature & State"
        description={
          <p>
            Call <code>useGlide()</code> in any client component rendered inside <code>&lt;GlideCNProvider&gt;</code> to read transition state and trigger runtime changes.
          </p>
        }
      >
        <CodeBlock
          badge="Signature"
          code={`const {\n  currentTransition,\n  setTransition,\n  config,\n  setConfig,\n  animationState,\n  reducedMotion,\n  transitionDefinition,\n} = useGlide();`}
        />

        <PropsCard title="useGlide() Return Object" props={USE_GLIDE_RETURNS} />
      </SectionTwoCol>

      {/* 3. RETURN PROPERTY GUIDES */}
      <SectionTwoCol
        icon={<Sliders className="size-5" />}
        title="Return Property Guides"
        description={
          <p>
            Detailed explanations and code examples for each property and mutator returned by <code>useGlide()</code>.
          </p>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="setTransition(name) — Dynamic Transition Switching"
            description="Switch transition presets dynamically before navigating (e.g. triggering an iris portal effect when completing checkout)."
            badge="Programmatic Transition"
            code={`import { useGlide } from '@/components/glidecn';\nimport { useRouter } from 'next/navigation';\n\nexport function CheckoutButton() {\n  const { setTransition } = useGlide();\n  const router = useRouter();\n\n  const handleComplete = () => {\n    setTransition('circular-portal');\n    router.push('/checkout/success');\n  };\n\n  return <button onClick={handleComplete}>Complete Purchase</button>;\n}`}
          />

          <AccordionItem
            title="setConfig(overrides) — Runtime Timing & Direction"
            description="Override duration, ease, or direction on the fly without changing global provider defaults."
            badge="Runtime Config Update"
            code={`import { useGlide } from '@/components/glidecn';\n\nexport function SpeedControls() {\n  const { setConfig } = useGlide();\n\n  return (\n    <div className="flex gap-2">\n      <button onClick={() => setConfig({ duration: 0.2 })}>Fast (0.2s)</button>\n      <button onClick={() => setConfig({ duration: 0.6 })}>Normal (0.6s)</button>\n      <button onClick={() => setConfig({ duration: 1.2 })}>Cinematic (1.2s)</button>\n    </div>\n  );\n}`}
          />

          <AccordionItem
            title="animationState — Real-Time Lifecycle Phase"
            description="Tracks whether the transition is 'idle', 'exiting', 'entering', or 'complete'. Ideal for progress bars and click blockers."
            badge="Lifecycle Tracker"
            code={`export function NavigationLoadingBar() {\n  const { animationState } = useGlide();\n  const isTransitioning = animationState === 'exiting' || animationState === 'entering';\n\n  if (!isTransitioning) return null;\n  return <div className="fixed top-0 left-0 right-0 h-1 bg-[#fa5c4f] animate-pulse" />;\n}`}
          />

          <AccordionItem
            title="reducedMotion — Accessibility Detection"
            description="Boolean indicating whether reduced motion is active. Useful for rendering static alternatives or disabling parallax."
            badge="Accessibility State"
            code={`export function MotionBadge() {\n  const { reducedMotion } = useGlide();\n  return <span>Motion: {reducedMotion ? 'Reduced' : 'Full 60FPS'}</span>;\n}`}
          />
        </div>
      </SectionTwoCol>

      {/* 4. REAL-WORLD RECIPES */}
      <SectionTwoCol
        icon={<Compass className="size-5" />}
        title="Real-World Recipes"
        description={
          <p>
            Practical patterns for multi-step wizards, direction orchestration, and preference controllers.
          </p>
        }
      >
        <FrameworkTabs
          layoutIdPrefix="wizard-recipe"
          tabs={[
            {
              id: 'next-app',
              label: 'Next.js App Router',
              content: (
                <CodeBlock
                  isTabbed
                  badge="components/StepControls.tsx"
                  code={`import { useGlide } from '@/components/glidecn';\nimport { useRouter } from 'next/navigation';\n\nexport function StepControls({ step }: { step: number }) {\n  const { setTransition, setConfig } = useGlide();\n  const router = useRouter();\n\n  const handleNext = () => {\n    setTransition('slide');\n    setConfig({ direction: 'left' });\n    router.push(\`/wizard/step-\${step + 1}\`);\n  };\n\n  const handleBack = () => {\n    setTransition('slide');\n    setConfig({ direction: 'right' });\n    router.push(\`/wizard/step-\${step - 1}\`);\n  };\n\n  return (\n    <div className="flex gap-4">\n      <button onClick={handleBack}>Back</button>\n      <button onClick={handleNext}>Next</button>\n    </div>\n  );\n}`}
                />
              ),
            },
            {
              id: 'react-router',
              label: 'React Router / Vite',
              content: (
                <CodeBlock
                  isTabbed
                  badge="src/components/StepControls.tsx"
                  code={`import { useGlide } from '@/components/glidecn';\nimport { useNavigate } from 'react-router-dom';\n\nexport function StepControls({ step }: { step: number }) {\n  const { setTransition, setConfig } = useGlide();\n  const navigate = useNavigate();\n\n  const handleNext = () => {\n    setTransition('slide');\n    setConfig({ direction: 'left' });\n    navigate(\`/wizard/step-\${step + 1}\`);\n  };\n\n  const handleBack = () => {\n    setTransition('slide');\n    setConfig({ direction: 'right' });\n    navigate(\`/wizard/step-\${step - 1}\`);\n  };\n\n  return (\n    <div className="flex gap-4">\n      <button onClick={handleBack}>Back</button>\n      <button onClick={handleNext}>Next</button>\n    </div>\n  );\n}`}
                />
              ),
            },
          ]}
        />
      </SectionTwoCol>

      {/* 5. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← <Page> Segment', href: '/docs/api/page' }}
        next={{ label: 'useTransitionConfig() Hook →', href: '/docs/api/hooks/use-transition-config' }}
      />
    </div>
  );
}
