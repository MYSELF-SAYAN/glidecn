'use client';

import React, { useState } from 'react';
import { Layers, Box, Braces, Sparkles, ArrowRight, Code2, Paintbrush, Clock, Move, Check, Copy, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

function CodeBlock({ code, language = 'tsx', badge, isTabbed = false }: { code: string; language?: string; badge?: string; isTabbed?: boolean }) {
  const inner = (
    <>
      {badge && (
        <div className={`px-5 py-3 border-b border-zinc-200/80 dark:border-white/5 text-[11px] font-mono tracking-wide flex items-center ${isTabbed ? 'bg-[#FAFAFA]/50 dark:bg-transparent' : 'bg-zinc-50 dark:bg-white/[0.02]'} text-zinc-500`}>
          <span className="opacity-80">{badge}</span>
        </div>
      )}
      <DynamicCodeBlock lang={language} code={code} />
    </>
  );

  if (isTabbed) return inner;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/10 shadow-sm my-6 bg-white dark:bg-[#0f0f11]">
      {inner}
    </div>
  );
}

function PropRow({ name, type, defaultVal, description, required = false }: { name: string; type: string; defaultVal?: string; description: string; required?: boolean }) {
  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 md:p-8 border-b border-zinc-200 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors last:border-0">
      <div className="md:col-span-4 flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100">{name}</code>
          {required && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">Required</span>}
        </div>
        <code className="text-xs font-mono text-brand-500 dark:text-brand-400">{type}</code>
      </div>
      <div className="md:col-span-8 flex flex-col gap-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
        {defaultVal && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Default:</span>
            <code className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 rounded">{defaultVal}</code>
          </div>
        )}
      </div>
    </div>
  );
}

function AccordionItem({ title, description, code, children }: { title: string; description: React.ReactNode; code?: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200/80 dark:border-white/10 rounded-2xl bg-white dark:bg-[#0f0f11] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-display font-medium text-lg tracking-tight text-zinc-900 dark:text-zinc-100">{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
          <ChevronDown className="size-5 text-zinc-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-zinc-100 dark:border-white/5">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 mt-4">
                {description}
              </div>
              {code ? <CodeBlock code={code} /> : children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FrameworkTabs({ tabs, layoutIdPrefix }: { tabs: { id: string; label: string; content: React.ReactNode }[], layoutIdPrefix: string }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col w-full my-8 rounded-2xl border border-zinc-200/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-white dark:bg-[#0f0f11] relative group">
      
      {/* Premium Header */}
      <div className="relative flex items-end px-2 pt-2 bg-zinc-100/80 dark:bg-[#161618] border-b border-zinc-200/80 dark:border-white/10 overflow-x-auto no-scrollbar">
        
        {/* macOS Window Controls */}
        <div className="flex items-center gap-1.5 px-3 pb-3.5 mb-0.5 opacity-80">
          <div className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 border border-zinc-400/20 dark:border-black/20" />
          <div className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 border border-zinc-400/20 dark:border-black/20" />
          <div className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 border border-zinc-400/20 dark:border-black/20" />
        </div>

        {/* Tabs Container */}
        <div className="flex items-end gap-1 flex-1 px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 text-[13px] font-medium transition-all duration-300 rounded-t-xl z-10 ${
                  isActive 
                    ? 'text-zinc-900 dark:text-zinc-100' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId={`active-tab-bg-${layoutIdPrefix}`}
                      className="absolute inset-0 bg-white dark:bg-[#0f0f11] rounded-t-xl border-x border-t border-zinc-200/80 dark:border-white/10"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                    <motion.div
                      layoutId={`active-tab-glow-${layoutIdPrefix}`}
                      className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#fa5c4f] to-transparent opacity-60 blur-[0.5px]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                    <motion.div
                      layoutId={`active-tab-line-${layoutIdPrefix}`}
                      className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#fa5c4f] to-transparent opacity-100"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                    <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white dark:bg-[#0f0f11] z-20" />
                  </>
                )}
                <span className="relative z-20 flex items-center gap-2 tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {tabs.find((t) => t.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function DocsApiReference() {
  return (
    <div className="space-y-32 pb-32">

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 md:pt-32">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.15] mix-blend-overlay pointer-events-none" />

        <div className="max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 mb-8 shadow-sm">
            <Code2 className="size-3.5" />
            Core API v1.0
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-light tracking-tighter text-zinc-900 dark:text-white leading-[0.9] mb-8 text-balance">
            Architecture <br />
            <span className="italic font-serif text-zinc-400 dark:text-zinc-500">&amp; Reference.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed font-light text-balance">
            GlideCN provides a clean, minimalistic API surface designed for maximum control. You only need to interact with two main components and one hook to build incredibly rich, cinematic transitions.
          </p>
        </div>
      </section>

      {/* 2. GLIDECN PROVIDER */}
      <section className="relative scroll-mt-32" id="glidecn-provider">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          <div className="lg:col-span-5 sticky top-32 space-y-6">
            <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm">
              <Layers className="size-5" />
            </div>
            <h2 className="text-4xl font-display font-medium tracking-tight text-zinc-900 dark:text-white">
              GlideCNProvider & GlideCN
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
              The root coordinators. <code>GlideCNProvider</code> injects the configuration context, while <code>GlideCN</code> (the Transition Manager) intercepts routing events and handles the dual-frame crossfading engine. Place these high in your component tree.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <FrameworkTabs
              layoutIdPrefix="provider"
              tabs={[
                {
                  id: 'next-app',
                  label: 'Next.js (App)',
                  content: (
                    <CodeBlock
                      isTabbed
                      badge="app/layout.tsx"
                      code={`import { GlideCNProvider, GlideCNNextApp as GlideCN } from '@/components/glidecn';\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <GlideCNProvider defaultTransition="slide" defaultConfig={{ duration: 0.6 }}>\n          <GlideCN>\n            {children}\n          </GlideCN>\n        </GlideCNProvider>\n      </body>\n    </html>\n  );\n}`}
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
                      code={`import { GlideCNProvider, GlideCNUniversal as GlideCN } from '@/components/glidecn';\nimport type { AppProps } from 'next/app';\n\nexport default function App({ Component, pageProps }: AppProps) {\n  return (\n    <GlideCNProvider defaultTransition="slide" defaultConfig={{ duration: 0.6 }}>\n      <GlideCN>\n        <Component {...pageProps} />\n      </GlideCN>\n    </GlideCNProvider>\n  );\n}`}
                    />
                  ),
                },
                {
                  id: 'vite-react',
                  label: 'React Router',
                  content: (
                    <CodeBlock
                      isTabbed
                      badge="src/main.tsx"
                      code={`import { GlideCNProvider, GlideCNReactRouter as GlideCN } from '@/components/glidecn';\nimport { createRoot } from 'react-dom/client';\nimport App from './App';\n\ncreateRoot(document.getElementById('root')!).render(\n  <GlideCNProvider defaultTransition="slide" defaultConfig={{ duration: 0.6 }}>\n    <GlideCN>\n      <App />\n    </GlideCN>\n  </GlideCNProvider>\n);`}
                    />
                  ),
                },
              ]}
            />

            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">GlideCNProvider Properties</h3>
              </div>
              <div className="flex flex-col">
                <PropRow
                  name="children"
                  type="React.ReactNode"
                  required
                  description="Your application layout and content. This must wrap the actual router nodes so GlideCN can freeze the DOM when a route change is detected."
                />
                <PropRow
                  name="defaultTransition"
                  type="string"
                  defaultVal='"fade"'
                  description="The fallback shader animation used if a <Page> doesn't specify its own transition override. Must match a registered transition name."
                />
                <PropRow
                  name="defaultConfig"
                  type="TransitionConfig"
                  defaultVal="{}"
                  description="Global configuration overrides (e.g. duration, delay, easing) for transitions."
                />
                <PropRow
                  name="reducedMotion"
                  type="boolean"
                  defaultVal="undefined"
                  description="Force reduced motion on or off. Auto-detects by default."
                />
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-xl overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">GlideCN Properties</h3>
              </div>
              <div className="flex flex-col">
                <PropRow
                  name="children"
                  type="React.ReactNode"
                  required
                  description="Your application layout and content. This must wrap the actual router nodes so GlideCN can freeze the DOM when a route change is detected."
                />
                <PropRow
                  name="mode"
                  type="'wait' | 'sync' | 'popLayout'"
                  defaultVal="'wait'"
                  description="AnimatePresence mode. 'wait' ensures the exit animation completes before the enter animation begins."
                />
                <PropRow
                  name="routeKey"
                  type="string"
                  defaultVal="undefined"
                  description="Optional custom route key override. By default, it auto-detects based on the framework adapter."
                />
                <PropRow
                  name="restoreScroll"
                  type="boolean"
                  defaultVal="true"
                  description="Enable automatic scroll restoration when transitioning between routes."
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PAGE COMPONENT */}
      <section className="relative scroll-mt-32" id="page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          <div className="lg:col-span-5 sticky top-32 space-y-6">
            <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm">
              <Box className="size-5" />
            </div>
            <h2 className="text-4xl font-display font-medium tracking-tight text-zinc-900 dark:text-white">
              Page
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
              Represents an animatable route segment. Wrap the top-level content of every individual page with this component to enable page-level shader overrides.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <FrameworkTabs
              layoutIdPrefix="page-component"
              tabs={[
                {
                  id: 'next-app',
                  label: 'Next.js (App)',
                  content: (
                    <CodeBlock
                      isTabbed
                      badge="app/about/page.tsx"
                      code={`import { Page } from '@/components/glidecn';\n\nexport default function AboutPage() {\n  return (\n    <Page transition="liquid-morph" duration={1.2}>\n      <main>\n        <h1>About Us</h1>\n      </main>\n    </Page>\n  );\n}`}
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
                      code={`import { Page } from '@/components/glidecn';\n\nexport default function AboutPage() {\n  return (\n    <Page transition="liquid-morph" duration={1.2}>\n      <main>\n        <h1>About Us</h1>\n      </main>\n    </Page>\n  );\n}`}
                    />
                  ),
                },
                {
                  id: 'vite-react',
                  label: 'Vite / React',
                  content: (
                    <CodeBlock
                      isTabbed
                      badge="src/pages/About.tsx"
                      code={`import { Page } from '@/components/glidecn';\n\nexport default function AboutPage() {\n  return (\n    <Page transition="liquid-morph" duration={1.2}>\n      <main>\n        <h1>About Us</h1>\n      </main>\n    </Page>\n  );\n}`}
                    />
                  ),
                },
              ]}
            />

            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Properties</h3>
              </div>
              <div className="flex flex-col">
                <PropRow
                  name="children"
                  type="React.ReactNode"
                  required
                  description="The content of your page."
                />
                <PropRow
                  name="transition"
                  type="string"
                  defaultVal="Inherits from Provider"
                  description="Overrides the global transition type for this specific route. Must match a registered transition name."
                />
                <PropRow
                  name="duration"
                  type="number"
                  defaultVal="Inherits from Provider"
                  description="Overrides the global animation duration for this page entry/exit."
                />
                <PropRow
                  name="delay"
                  type="number"
                  defaultVal="Inherits from Provider"
                  description="Delay before animation starts, in seconds."
                />
                <PropRow
                  name="ease"
                  type="EasingPreset"
                  defaultVal="Inherits from Provider"
                  description="Overrides the default easing for this specific page."
                />
                <PropRow
                  name="direction"
                  type='"left" | "right" | "up" | "down"'
                  defaultVal="Inherits from Provider"
                  description="Defines the flow for directional shaders. E.g., a slide transition can be forced to enter from the left regardless of standard routing logic."
                />

                <PropRow
                  name="custom"
                  type="Record<string, unknown>"
                  defaultVal="undefined"
                  description="Arbitrary custom data passed to the transition."
                />
                <PropRow
                  name="className"
                  type="string"
                  defaultVal="undefined"
                  description="Optional CSS classes applied to the internal motion.div wrapper."
                />
                <PropRow
                  name="style"
                  type="React.CSSProperties"
                  defaultVal="undefined"
                  description="Inline styles applied to the internal motion.div wrapper."
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. USEGLIDE HOOK & USE CASES */}
      <section className="relative scroll-mt-32" id="use-glidecn">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          <div className="lg:col-span-5 sticky top-32 space-y-6">
            <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm">
              <Braces className="size-5" />
            </div>
            <h2 className="text-4xl font-display font-medium tracking-tight text-zinc-900 dark:text-white">
              useGlide
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance mb-6">
              A custom React hook allowing you to programmatically read and modify the active transition configuration at runtime. Perfect for dynamic route orchestration.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Returns</h3>
              </div>
              <div className="flex flex-col">
                <PropRow
                  name="currentTransition"
                  type="string"
                  description="The currently active transition name."
                />
                <PropRow
                  name="transitionDefinition"
                  type="TransitionDefinition | null"
                  description="The resolved transition definition object."
                />
                <PropRow
                  name="config"
                  type="Required<TransitionConfig>"
                  description="The merged configuration object (defaults + overrides)."
                />
                <PropRow
                  name="animationState"
                  type='"idle" | "entering" | "exiting" | "complete"'
                  description="The current lifecycle state of the page transition."
                />
                <PropRow
                  name="reducedMotion"
                  type="boolean"
                  description="Whether reduced motion is currently active."
                />
                <PropRow
                  name="setTransition"
                  type="(name: string) => void"
                  description="Set the active transition by name."
                />
                <PropRow
                  name="setConfig"
                  type="(config: TransitionConfig) => void"
                  description="Override config for the current transition."
                />
              </div>
            </div>

            {/* Additional Hooks */}
            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-xl overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Additional Hooks</h3>
              </div>
              <div className="flex flex-col">
                <PropRow
                  name="useTransitionConfig()"
                  type="{ config, setConfig }"
                  description="Shortcut hook. Returns only the resolved configuration and the config setter."
                />
                <PropRow
                  name="useAnimationState()"
                  type='"idle" | "entering" | "exiting" | "complete"'
                  description="Shortcut hook. Returns only the current lifecycle state of the page transition."
                />
              </div>
            </div>

            {/* Practical Use Cases */}
            <div className="pt-8 space-y-6">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-500 mb-6">Real-world Use Cases</h3>

              <AccordionItem
                title="1. Programmatic Navigation (Next Button)"
                description={<p>You can override the transition dynamically just before navigating. For example, triggering a dramatic <code>scale</code> transition only when the user clicks the final "Submit" button in an onboarding flow.</p>}
              >
                <FrameworkTabs
                  layoutIdPrefix="prog-nav"
                  tabs={[
                    {
                      id: 'next-app',
                      label: 'Next.js (App)',
                      content: (
                        <CodeBlock isTabbed badge="components/Checkout.tsx" code={`import { useGlide } from '@/components/glidecn';\nimport { useRouter } from 'next/navigation';\n\nexport function CheckoutButton() {\n  const { setTransition } = useGlide();\n  const router = useRouter();\n\n  const handleCheckout = () => {\n    setTransition('circular-portal');\n    router.push('/success');\n  };\n\n  return <button onClick={handleCheckout}>Complete Purchase</button>;\n}`} />
                      ),
                    },
                    {
                      id: 'vite-react',
                      label: 'Vite / React (React Router)',
                      content: (
                        <CodeBlock isTabbed badge="src/components/Checkout.tsx" code={`import { useGlide } from '@/components/glidecn';\nimport { useNavigate } from 'react-router-dom';\n\nexport function CheckoutButton() {\n  const { setTransition } = useGlide();\n  const navigate = useNavigate();\n\n  const handleCheckout = () => {\n    setTransition('circular-portal');\n    navigate('/success');\n  };\n\n  return <button onClick={handleCheckout}>Complete Purchase</button>;\n}`} />
                      ),
                    },
                  ]}
                />
              </AccordionItem>

              <AccordionItem
                title="2. Respecting User Preferences"
                description={<p>You can tie GlideCN into your application's settings context. If a user toggles "Reduced Motion" in your app settings, you can instantly turn off all animations globally.</p>}
                code={`import { useGlide } from '@/components/glidecn';\nimport { useEffect } from 'react';\n\nexport function MotionController() {\n  const { reducedMotion, setConfig } = useGlide();\n\n  useEffect(() => {\n    if (reducedMotion) {\n      setConfig({ duration: 0 }); // Instant snap\n    } else {\n      setConfig({ duration: 0.6 }); // Standard smooth motion\n    }\n  }, [reducedMotion, setConfig]);\n\n  return null;\n}`}
              />

              <AccordionItem
                title="3. Directional Orchestration"
                description={<p>If you have a carousel-like UI (e.g., onboarding steps), you can dynamically change the slide direction based on whether the user clicked "Next" or "Back".</p>}
              >
                <FrameworkTabs
                  layoutIdPrefix="dir-orch"
                  tabs={[
                    {
                      id: 'next-app',
                      label: 'Next.js (App)',
                      content: (
                        <CodeBlock isTabbed badge="components/Wizard.tsx" code={`import { useGlide } from '@/components/glidecn';\nimport { useRouter } from 'next/navigation';\n\nexport function WizardControls({ currentStep }: { currentStep: number }) {\n  const { setConfig, setTransition } = useGlide();\n  const router = useRouter();\n\n  const handleNext = () => {\n    setTransition('slide');\n    setConfig({ direction: 'left' });\n    router.push(\`/step/\${currentStep + 1}\`);\n  };\n\n  const handleBack = () => {\n    setTransition('slide');\n    setConfig({ direction: 'right' });\n    router.push(\`/step/\${currentStep - 1}\`);\n  };\n\n  return (\n    <div className="flex gap-4">\n      <button onClick={handleBack}>Back</button>\n      <button onClick={handleNext}>Next</button>\n    </div>\n  );\n}`} />
                      ),
                    },
                    {
                      id: 'vite-react',
                      label: 'Vite / React (React Router)',
                      content: (
                        <CodeBlock isTabbed badge="src/components/Wizard.tsx" code={`import { useGlide } from '@/components/glidecn';\nimport { useNavigate } from 'react-router-dom';\n\nexport function WizardControls({ currentStep }: { currentStep: number }) {\n  const { setConfig, setTransition } = useGlide();\n  const navigate = useNavigate();\n\n  const handleNext = () => {\n    setTransition('slide');\n    setConfig({ direction: 'left' });\n    navigate(\`/step/\${currentStep + 1}\`);\n  };\n\n  const handleBack = () => {\n    setTransition('slide');\n    setConfig({ direction: 'right' });\n    navigate(\`/step/\${currentStep - 1}\`);\n  };\n\n  return (\n    <div className="flex gap-4">\n      <button onClick={handleBack}>Back</button>\n      <button onClick={handleNext}>Next</button>\n    </div>\n  );\n}`} />
                      ),
                    },
                  ]}
                />
              </AccordionItem>
            </div>

          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <div className="pt-24 border-t border-zinc-200 dark:border-white/5 flex flex-col items-center text-center">
        <h2 className="text-3xl font-display font-medium text-zinc-900 dark:text-white mb-6">Ready to see it in action?</h2>
        <Link
          href="/docs/transitions"
          className="group relative inline-flex items-center gap-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 text-sm font-bold tracking-wide hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
        >
          <Sparkles className="size-4" />
          Explore Transition Catalog
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
}
