'use client';

import React, { useState } from 'react';
import { Layers, Box, Braces, Sparkles, ArrowRight, Code2, Paintbrush, Clock, Move, Check, Copy, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

function CodeBlock({ code, language = 'tsx', badge }: { code: string; language?: string; badge?: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg my-4">
      {badge && (
        <div className="px-4 py-2 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02] text-xs font-mono text-zinc-500">
          {badge}
        </div>
      )}
      <DynamicCodeBlock lang={language} code={code} />
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

function AccordionItem({ title, description, code }: { title: string; description: React.ReactNode; code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#0f0f11] overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-display font-medium text-lg tracking-tight text-zinc-900 dark:text-zinc-100">{title}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
              <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 mt-4">
                {description}
              </div>
              <CodeBlock code={code} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
              GlideCNProvider
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
              The root coordinator. It intercepts routing events, manages outgoing freeze-frame snapshots, and handles the dual-frame crossfading engine. Place this high in your component tree, typically in your root layout.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <CodeBlock
              badge="app/layout.tsx"
              code={`import { GlideCNProvider } from 'glidecn';\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="en">\n      <body>\n        <GlideCNProvider defaultTransition="slide" defaultDuration={0.6}>\n          {children}\n        </GlideCNProvider>\n      </body>\n    </html>\n  );\n}`}
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
                  description="Your application layout and content. This must wrap the actual router nodes so GlideCN can freeze the DOM when a route change is detected."
                />
                <PropRow
                  name="defaultTransition"
                  type="string"
                  defaultVal='"fade"'
                  description="The fallback shader animation used if a <Page> doesn't specify its own transition override. Must match a registered transition name."
                />
                <PropRow
                  name="defaultDuration"
                  type="number"
                  defaultVal="0.5"
                  description="The global animation speed in seconds. This orchestrates exactly how fast the dual-frame crossfade executes across the entire app."
                />
                <PropRow
                  name="mode"
                  type='"sync" | "wait"'
                  defaultVal='"wait"'
                  description="Determines orchestration. 'wait' ensures the exiting page finishes before the entering page starts. 'sync' plays them simultaneously (best for overlapping transitions like slide or circular-portal)."
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
            <CodeBlock
              badge="app/about/page.tsx"
              code={`import { Page } from 'glidecn';\n\nexport default function AboutPage() {\n  return (\n    // This specific page will use the 'liquid-morph' transition \n    // instead of the global default.\n    <Page transition="liquid-morph" duration={1.2}>\n      <main>\n        <h1>About Us</h1>\n      </main>\n    </Page>\n  );\n}`}
            />

            <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Properties</h3>
              </div>
              <div className="flex flex-col">
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
                  description="Overrides the global animation speed for this page entry/exit."
                />
                <PropRow
                  name="direction"
                  type='"left" | "right" | "up" | "down" | "in" | "out"'
                  defaultVal="undefined"
                  description="Defines the flow for directional shaders. E.g., a slide transition can be forced to enter from the left regardless of standard routing logic."
                />
                <PropRow
                  name="className"
                  type="string"
                  defaultVal="''"
                  description="Optional CSS classes applied to the internal motion.div wrapper."
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
                  description="The ID of the currently active transition."
                />
                <PropRow
                  name="config"
                  type="TransitionConfig"
                  description="The global configuration object containing active duration, direction, and easing settings."
                />
                <PropRow
                  name="setTransition"
                  type="(id: string) => void"
                  description="Programmatically updates the global transition type. Excellent for changing the animation right before navigating."
                />
                <PropRow
                  name="setConfig"
                  type="(cfg: Partial<TransitionConfig>) => void"
                  description="Updates global transition options, such as animation speed or directional flow."
                />
              </div>
            </div>

            {/* Practical Use Cases */}
            <div className="pt-8 space-y-6">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-500 mb-6">Real-world Use Cases</h3>

              <AccordionItem
                title="1. Programmatic Navigation (Next Button)"
                description={<p>You can override the transition dynamically just before navigating. For example, triggering a dramatic <code>scale</code> transition only when the user clicks the final "Submit" button in an onboarding flow.</p>}
                code={`import { useGlide } from 'glidecn';\nimport { useRouter } from 'next/navigation';\n\nexport function CheckoutButton() {\n  const { setTransition } = useGlide();\n  const router = useRouter();\n\n  const handleCheckout = () => {\n    // Force a specific transition for this action\n    setTransition('circular-portal');\n    \n    // Navigate immediately after setting it\n    router.push('/success');\n  };\n\n  return <button onClick={handleCheckout}>Complete Purchase</button>;\n}`}
              />

              <AccordionItem
                title="2. Respecting User Preferences"
                description={<p>You can tie GlideCN into your application's settings context. If a user toggles "Reduced Motion" in your app settings, you can instantly turn off all animations globally.</p>}
                code={`import { useGlide } from 'glidecn';\nimport { useEffect } from 'react';\nimport { useSettings } from '@/hooks/useSettings';\n\nexport function MotionController() {\n  const { setConfig } = useGlide();\n  const { prefersReducedMotion } = useSettings();\n\n  useEffect(() => {\n    if (prefersReducedMotion) {\n      setConfig({ duration: 0 }); // Instant snap\n    } else {\n      setConfig({ duration: 0.6 }); // Standard smooth motion\n    }\n  }, [prefersReducedMotion]);\n\n  return null;\n}`}
              />

              <AccordionItem
                title="3. Directional Orchestration"
                description={<p>If you have a carousel-like UI (e.g., onboarding steps), you can dynamically change the slide direction based on whether the user clicked "Next" or "Back".</p>}
                code={`import { useGlide } from 'glidecn';\nimport { useRouter } from 'next/navigation';\n\nexport function WizardControls({ currentStep }) {\n  const { setConfig, setTransition } = useGlide();\n  const router = useRouter();\n\n  const handleNext = () => {\n    setTransition('slide');\n    setConfig({ direction: 'left' });\n    router.push(\`/step/\${currentStep + 1}\`);\n  };\n\n  const handleBack = () => {\n    setTransition('slide');\n    setConfig({ direction: 'right' });\n    router.push(\`/step/\${currentStep - 1}\`);\n  };\n\n  return (\n    <div className="flex gap-4">\n      <button onClick={handleBack}>Back</button>\n      <button onClick={handleNext}>Next</button>\n    </div>\n  );\n}`}
              />
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
