'use client';

import React from 'react';
import { Sparkles, Sliders, Cpu, Compass, Timer, Zap } from 'lucide-react';
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

const PAGE_PROPS: PropItem[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The content of your page wrapped inside the motion container.',
  },
  {
    name: 'transition',
    type: 'string',
    defaultVal: 'Inherited',
    description: 'Overrides the global transition for this specific route. Must match a registered transition.',
  },
  {
    name: 'duration',
    type: 'number',
    defaultVal: 'Inherited (0.4s)',
    description: 'Animation duration in seconds for this route entry/exit.',
  },
  {
    name: 'delay',
    type: 'number',
    defaultVal: '0',
    description: 'Delay in seconds before the enter animation begins.',
  },
  {
    name: 'ease',
    type: 'EasingPreset | [number, number, number, number]',
    defaultVal: 'Inherited',
    description: 'Easing preset name ("easeInOut", "spring", etc.) or custom cubic-bezier tuple.',
  },
  {
    name: 'direction',
    type: '"left" | "right" | "up" | "down"',
    defaultVal: '"left"',
    description: 'Flow axis for directional transitions (e.g. slide, flip, cube).',
  },
  {
    name: 'custom',
    type: 'Record<string, unknown>',
    defaultVal: '{}',
    description: 'Custom parameters passed into transition variants (e.g. sliceCount, blurRadius).',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: 'undefined',
    description: 'CSS classes applied directly to the internal motion.div container.',
  },
  {
    name: 'style',
    type: 'CSSProperties',
    defaultVal: 'undefined',
    description: 'Inline styles applied directly to the internal motion.div container.',
  },
];

export function DocsPageView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="Route Segment"
        title="<Page>"
        description="The route-level component that connects pages to the animation engine, applies Framer Motion variants, and injects GPU-accelerated will-change hints."
        importSnippet="import { Page } from '@/components/glidecn';"
      />

      {/* 2. USAGE & PROPS */}
      <SectionTwoCol
        icon={<Sparkles className="size-5" />}
        title="Usage & Properties"
        description={
          <p>
            Wrap the root content of every route with <code>&lt;Page&gt;</code>. It enables per-route transition overrides, directional axes, custom easing curves, and timing controls.
          </p>
        }
      >
        <FrameworkTabs
          layoutIdPrefix="page-setup"
          tabs={[
            {
              id: 'next-app',
              label: 'Next.js (App)',
              content: (
                <CodeBlock
                  isTabbed
                  badge="app/about/page.tsx"
                  code={`import { Page } from '@/components/glidecn';\n\nexport default function AboutPage() {\n  return (\n    <Page transition="liquid-morph" duration={0.8} direction="left">\n      <main className="p-8">\n        <h1 className="text-4xl font-bold">About Us</h1>\n        <p>This route uses the liquid-morph transition with custom duration.</p>\n      </main>\n    </Page>\n  );\n}`}
                />
              ),
            },
            {
              id: 'next-pages',
              label: 'Next.js (Pages)',
              content: (
                <CodeBlock
                  isTabbed
                  badge="pages/about.tsx"
                  code={`import { Page } from '@/components/glidecn';\n\nexport default function AboutPage() {\n  return (\n    <Page transition="liquid-morph" duration={0.8}>\n      <main className="p-8">\n        <h1 className="text-4xl font-bold">About Us</h1>\n      </main>\n    </Page>\n  );\n}`}
                />
              ),
            },
            {
              id: 'vite-react',
              label: 'React Router / Vite',
              content: (
                <CodeBlock
                  isTabbed
                  badge="src/pages/About.tsx"
                  code={`import { Page } from '@/components/glidecn';\n\nexport default function About() {\n  return (\n    <Page transition="liquid-morph" duration={0.8}>\n      <main className="p-8">\n        <h1 className="text-4xl font-bold">About Us</h1>\n      </main>\n    </Page>\n  );\n}`}
                />
              ),
            },
          ]}
        />

        <PropsCard title="<Page> Properties" props={PAGE_PROPS} />
      </SectionTwoCol>

      {/* 3. PROPERTY DEEP DIVES */}
      <SectionTwoCol
        icon={<Sliders className="size-5" />}
        title="Property Guides"
        description={
          <p>
            Detailed code examples demonstrating each property of <code>&lt;Page&gt;</code>.
          </p>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="transition — Route-Specific Transition Override"
            description="Override the default transition for a single view (e.g. using a 3D circular portal on a showcase page)."
            badge="Preset Override"
            code={`<Page transition="circular-portal">\n  <ShowcaseView />\n</Page>`}
          />

          <AccordionItem
            title="duration & delay — Precise Timing"
            description="Adjust animation speed in seconds. Shorter durations create snappy UI navigation; longer durations create cinematic reveals."
            badge="Timing Control"
            code={`// Snappy 0.25s settings page\n<Page transition="slide" duration={0.25} delay={0.05}>\n  <SettingsForm />\n</Page>`}
          />

          <AccordionItem
            title="ease — Physics & Acceleration Curves"
            description="Supports built-in presets ('linear', 'easeIn', 'easeOut', 'easeInOut', 'spring') or custom cubic-bezier tuples."
            badge="Easing Curves"
            code={`// Spring physics\n<Page transition="scale" ease="spring">\n  <InteractiveView />\n</Page>\n\n// Custom cubic-bezier curve\n<Page transition="slide" ease={[0.22, 1, 0.36, 1]}>\n  <CustomCurveView />\n</Page>`}
          />

          <AccordionItem
            title="direction — Directional Axis Flow"
            description="Sets the entry/exit trajectory for directional transitions ('left', 'right', 'up', 'down')."
            badge="Directional Flow"
            code={`// Slide down from top\n<Page transition="slide" direction="down">\n  <ModalSheet />\n</Page>`}
          />

          <AccordionItem
            title="custom — Custom Transition Data"
            description="Pass arbitrary parameters into custom transitions (e.g. slice count, glitch offset, blur intensity)."
            badge="Transition Parameters"
            code={`<Page\n  transition="glitch"\n  custom={{\n    sliceCount: 8,\n    colorOffset: 12,\n  }}\n>\n  <CyberpunkHero />\n</Page>`}
          />
        </div>
      </SectionTwoCol>

      {/* 4. GPU ACCELERATION */}
      <SectionTwoCol
        icon={<Zap className="size-5" />}
        title="Compositor Optimization"
        description={
          <p>
            GlideCN automatically computes optimal CSS <code>will-change</code> hints for every transition, promoting the page container to a dedicated GPU compositor layer to prevent layout shifts.
          </p>
        }
      >
        <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] p-8 shadow-xl space-y-4">
          <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white">
            Zero Layout Shifts • 60 FPS Compositing
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            By automatically analyzing the active transition definition, <code>&lt;Page&gt;</code> assigns <code>will-change: transform, opacity</code> or <code>will-change: clip-path, opacity</code> before animations fire. This ensures smooth hardware acceleration across all desktop and mobile browsers.
          </p>
        </div>
      </SectionTwoCol>

      {/* 5. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← <GlideCN> Adapter', href: '/docs/api/glidecn' }}
        next={{ label: 'useGlide() Hook →', href: '/docs/api/hooks/use-glide' }}
      />
    </div>
  );
}
