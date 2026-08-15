'use client';

import React from 'react';
import { Layers, Sliders, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
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

const PROVIDER_PROPS: PropItem[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Your application layout and router tree. Must wrap router nodes so GlideCN can inject transition context and freeze exiting views.',
  },
  {
    name: 'defaultTransition',
    type: 'string',
    defaultVal: '"fade"',
    description: 'The global fallback transition name used when a <Page> does not specify its own transition override. Must match a registered transition.',
  },
  {
    name: 'defaultConfig',
    type: 'TransitionConfig',
    defaultVal: '{}',
    description: 'Global timing, easing curve, and flow direction baseline settings inherited by all child pages.',
  },
  {
    name: 'reducedMotion',
    type: 'boolean',
    defaultVal: 'undefined (auto)',
    description: 'Force reduced motion accessibility on or off. By default, auto-detects OS-level prefers-reduced-motion.',
  },
];

export function DocsProviderView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="Context Root"
        title="<GlideCNProvider>"
        description="The top-level context coordinator that initializes transition state, manages global baseline configuration, and detects user motion preferences."
        importSnippet="import { GlideCNProvider, GlideCN } from '@/components/glidecn';"
      />

      {/* 2. SETUP & INTEGRATION */}
      <SectionTwoCol
        icon={<Layers className="size-5" />}
        title="Setup & Integration"
        description={
          <p>
            Place <code>&lt;GlideCNProvider&gt;</code> at the root of your application layout. It creates the React Context that connects all <code>&lt;GlideCN&gt;</code> adapters, <code>&lt;Page&gt;</code> wrappers, and <code>useGlide()</code> hooks.
          </p>
        }
      >
        <FrameworkTabs
          layoutIdPrefix="provider-setup"
          tabs={[
            {
              id: 'next-app',
              label: 'Next.js (App)',
              content: (
                <CodeBlock
                  isTabbed
                  badge="app/layout.tsx"
                  code={`import { GlideCNProvider, GlideCN } from '@/components/glidecn';\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <GlideCNProvider defaultTransition="slide" defaultConfig={{ duration: 0.5 }}>\n          <GlideCN>\n            {children}\n          </GlideCN>\n        </GlideCNProvider>\n      </body>\n    </html>\n  );\n}`}
                />
              ),
            },
            {
              id: 'next-pages',
              label: 'Next.js (Pages)',
              content: (
                <CodeBlock
                  isTabbed
                  badge="pages/_app.tsx"
                  code={`import type { AppProps } from 'next/app';\nimport { GlideCNProvider, GlideCN } from '@/components/glidecn';\n\nexport default function MyApp({ Component, pageProps, router }: AppProps) {\n  return (\n    <GlideCNProvider defaultTransition="slide">\n      <GlideCN routerPath={router.asPath}>\n        <Component {...pageProps} key={router.asPath} />\n      </GlideCN>\n    </GlideCNProvider>\n  );\n}`}
                />
              ),
            },
            {
              id: 'vite-react',
              label: 'React Router / Vite',
              content: (
                <CodeBlock
                  isTabbed
                  badge="src/App.tsx"
                  code={`import { useLocation, Routes, Route } from 'react-router-dom';\nimport { GlideCNProvider, GlideCN, Page } from '@/components/glidecn';\n\nexport default function App() {\n  const location = useLocation();\n\n  return (\n    <GlideCNProvider defaultTransition="scale">\n      <GlideCN locationKey={location.pathname}>\n        <Routes location={location} key={location.pathname}>\n          <Route path="/" element={<Page>Home</Page>} />\n          <Route path="/about" element={<Page>About</Page>} />\n        </Routes>\n      </GlideCN>\n    </GlideCNProvider>\n  );\n}`}
                />
              ),
            },
          ]}
        />

        <PropsCard title="GlideCNProvider Properties" props={PROVIDER_PROPS} />
      </SectionTwoCol>

      {/* 3. PROPERTY DEEP DIVES */}
      <SectionTwoCol
        icon={<Sliders className="size-5" />}
        title="Property Guides"
        description={
          <p>
            Explore detailed examples of every property provided by <code>&lt;GlideCNProvider&gt;</code> to customize global fallbacks, timing, and accessibility.
          </p>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="defaultTransition — Global Animation Preset"
            description="Specifies the default transition used across all routes unless overridden by an individual page."
            badge="Global Preset Override"
            code={`<GlideCNProvider defaultTransition="circular-portal">\n  <GlideCN>{children}</GlideCN>\n</GlideCNProvider>`}
          />

          <AccordionItem
            title="defaultConfig — Baseline Timing & Physics"
            description="Pass duration, easing, direction, and custom transition parameters that will cascade down to all pages."
            badge="Global Config Object"
            code={`<GlideCNProvider\n  defaultTransition="slide"\n  defaultConfig={{\n    duration: 0.6,\n    ease: 'easeInOut',\n    direction: 'left',\n    stagger: 0.05,\n  }}\n>\n  <GlideCN>{children}</GlideCN>\n</GlideCNProvider>`}
          />

          <AccordionItem
            title="reducedMotion — Accessibility Override"
            description="Force reduced motion on or off (e.g. from an in-app settings modal). When true, all transitions become instant opacity-only fades."
            badge="Accessibility Preference"
            code={`// Disable motion globally for users who toggled reduced motion in app settings\n<GlideCNProvider reducedMotion={true}>\n  <GlideCN>{children}</GlideCN>\n</GlideCNProvider>`}
          />
        </div>
      </SectionTwoCol>

      {/* 4. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← API Reference Hub', href: '/docs/api-reference' }}
        next={{ label: '<GlideCN> Router Adapter →', href: '/docs/api/glidecn' }}
      />
    </div>
  );
}
