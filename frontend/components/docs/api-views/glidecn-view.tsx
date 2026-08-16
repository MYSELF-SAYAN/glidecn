'use client';

import React from 'react';
import { Box, Layers, ArrowRightLeft, Shield, Clock, RotateCcw, Zap } from 'lucide-react';
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

const GLIDECN_PROPS: PropItem[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The active router or view elements. Must be wrapped inside GlideCN to orchestrate Framer Motion AnimatePresence.',
  },
  {
    name: 'mode',
    type: '"wait" | "sync" | "popLayout"',
    defaultVal: '"wait"',
    description: 'AnimatePresence sequencing mode. "wait" ensures the exiting view finishes its exit animation before the new view mounts; "sync" animates both simultaneously; "popLayout" pops exiting nodes from document flow.',
  },
  {
    name: 'restoreScroll',
    type: 'boolean',
    defaultVal: 'true',
    description: 'Automatically caches window scroll coordinates in sessionStorage per route and restores them on navigation and back/forward history.',
  },
  {
    name: 'routeKey',
    type: 'string',
    defaultVal: 'auto-detected (pathname)',
    description: 'Explicit key representing current route. Auto-detected from pathname or router.asPath if omitted. Useful for tab sub-routes.',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: '"w-full flex-1 flex flex-col"',
    description: 'CSS classes applied to the intermediate motion container rendered inside AnimatePresence.',
  },
];

export function DocsGlidecnView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="Router Adapter"
        title="<GlideCN>"
        description="The framework-specific router adapter that listens to navigation events, freezes exiting DOM contexts using FrozenRouter to eliminate white flashes, and manages scroll restoration."
        importSnippet="import { GlideCN } from '@/components/glidecn';"
      />

      {/* 2. ADAPTER INTEGRATION & ARCHITECTURE */}
      <SectionTwoCol
        icon={<Box className="size-5" />}
        title="Adapter & Architecture"
        description={
          <div className="space-y-4">
            <p>
              <code>&lt;GlideCN&gt;</code> coordinates the transition lifecycle between leaving and entering pages.
            </p>
            <p className="text-xs text-zinc-500">
              When a route change occurs, it locks the exiting view using the <code>FrozenRouter</code> pattern, executes exit variants, remembers scroll position in <code>sessionStorage</code>, and smoothly mounts the incoming view without layout jumps.
            </p>
          </div>
        }
      >
        <FrameworkTabs
          layoutIdPrefix="glidecn-setup"
          tabs={[
            {
              id: 'next-app',
              label: 'Next.js (App)',
              content: (
                <CodeBlock
                  isTabbed
                  badge="app/layout.tsx"
                  code={`import { GlideCNProvider, GlideCN } from '@/components/glidecn';\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <GlideCNProvider defaultTransition="slide">\n          {/* Next.js App Router Adapter */}\n          <GlideCN mode="wait" restoreScroll={true}>\n            {children}\n          </GlideCN>\n        </GlideCNProvider>\n      </body>\n    </html>\n  );\n}`}
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
                  code={`import type { AppProps } from 'next/app';\nimport { GlideCNProvider, GlideCNNextPages } from '@/components/glidecn';\n\nexport default function MyApp({ Component, pageProps, router }: AppProps) {\n  return (\n    <GlideCNProvider defaultTransition="slide">\n      <GlideCNNextPages routerPath={router.asPath} mode="wait">\n        <Component {...pageProps} key={router.asPath} />\n      </GlideCNNextPages>\n    </GlideCNProvider>\n  );\n}`}
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
                  code={`import { useLocation, Routes, Route } from 'react-router-dom';\nimport { GlideCNProvider, GlideCNReactRouter, Page } from '@/components/glidecn';\nimport HomePage from './pages/HomePage';\nimport AboutPage from './pages/AboutPage';\n\nexport default function App() {\n  const location = useLocation();\n\n  return (\n    <GlideCNProvider defaultTransition="fade">\n      <GlideCNReactRouter locationKey={location.pathname} mode="wait">\n        <Routes location={location} key={location.pathname}>\n          <Route path="/" element={<Page><HomePage /></Page>} />\n          <Route path="/about" element={<Page transition="cube"><AboutPage /></Page>} />\n        </Routes>\n      </GlideCNReactRouter>\n    </GlideCNProvider>\n  );\n}`}
                />
              ),
            },
            {
              id: 'universal',
              label: 'TanStack / Universal',
              content: (
                <CodeBlock
                  isTabbed
                  badge="src/Root.tsx"
                  code={`import { GlideCNProvider, GlideCNUniversal, Page } from '@/components/glidecn';\n\nexport default function Root({ currentPath, children }: { currentPath: string; children: React.ReactNode }) {\n  return (\n    <GlideCNProvider defaultTransition="slide">\n      <GlideCNUniversal routeKey={currentPath} mode="wait">\n        {children}\n      </GlideCNUniversal>\n    </GlideCNProvider>\n  );\n}`}
                />
              ),
            },
          ]}
        />

        <PropsCard title="GlideCN Properties" props={GLIDECN_PROPS} />
      </SectionTwoCol>

      {/* 3. PROPERTY GUIDES */}
      <SectionTwoCol
        icon={<ArrowRightLeft className="size-5" />}
        title="Property Guides"
        description={
          <p>
            Fine-tune transition modes, configure custom route keys for subroutes, and manage scroll restoration behavior.
          </p>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="mode — Transition Timing Mode"
            description="Controls how entering and exiting components overlap. 'wait' finishes the exit before entering, 'sync' crossfades both simultaneously, and 'popLayout' pulls the exiting view out of document flow."
            badge="AnimatePresence Mode"
            code={`// 'wait' ensures complete exit before enter (default and recommended)\n<GlideCN mode="wait">\n  {children}\n</GlideCN>\n\n// Simultaneous crossfade animation\n<GlideCN mode="sync">\n  {children}\n</GlideCN>`}
          />

          <AccordionItem
            title="restoreScroll — Automatic Scroll Restoration"
            description="Automatically stores window scroll coordinates in sessionStorage before navigating and restores exact coordinates on browser back/forward buttons."
            badge="Scroll Memory"
            code={`// Disable built-in scroll restoration if using a custom smooth-scroll library like Lenis\n<GlideCN restoreScroll={false}>\n  {children}\n</GlideCN>`}
          />

          <AccordionItem
            title="routeKey — Dynamic Sub-Route Keying"
            description="Provide an explicit key when you want page transitions to fire on search param changes, modal routes, or sub-tabs."
            badge="Custom Key"
            code={`import { usePathname, useSearchParams } from 'next/navigation';\n\nexport function SubRouteWrapper({ children }: { children: React.ReactNode }) {\n  const pathname = usePathname();\n  const searchParams = useSearchParams();\n  const tab = searchParams.get('tab') ?? 'overview';\n\n  return (\n    <GlideCN routeKey={\`\${pathname}?tab=\${tab}\`}>\n      {children}\n    </GlideCN>\n  );\n}`}
          />
        </div>
      </SectionTwoCol>

      {/* 4. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← <GlideCNProvider>', href: '/docs/api/provider' }}
        next={{ label: '<Page> Segment →', href: '/docs/api/page' }}
      />
    </div>
  );
}
