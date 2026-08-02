'use client';

/* ==========================================================================
 * Examples Section — Tabbed code examples
 * ========================================================================== */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const examples = [
  {
    label: 'Basic',
    code: `import { MorphyProvider, Page } from '@/components/morphy';

export default function Layout({ children }) {
  return (
    <MorphyProvider>
      <Page transition="fade">
        {children}
      </Page>
    </MorphyProvider>
  );
}`,
  },
  {
    label: 'Per-route',
    code: `// app/layout.tsx
<MorphyProvider>
  {children}
</MorphyProvider>

// app/page.tsx
<Page transition="slide" direction="left">
  <HomePage />
</Page>

// app/about/page.tsx
<Page transition="scale" duration={0.6}>
  <AboutPage />
</Page>`,
  },
  {
    label: 'Custom Config',
    code: `<Page
  transition="circular-portal"
  duration={0.8}
  ease="spring"
  custom={{
    originX: '80%',
    originY: '20%',
  }}
>
  <PortalPage />
</Page>`,
  },
  {
    label: 'Custom Transition',
    code: `import { registerTransition } from '@/components/morphy';

registerTransition('my-transition', {
  metadata: {
    name: 'my-transition',
    displayName: 'My Transition',
    description: 'A custom flip effect.',
    category: 'advanced',
    props: [],
  },
  defaultConfig: { duration: 0.6 },
  getVariants: (config) => ({
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
  }),
});`,
  },
];

export function ExamplesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
          See it in action
        </h2>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          From basic setup to custom transitions.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {examples.map((ex, i) => (
          <button
            key={ex.label}
            onClick={() => setActive(i)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              active === i
                ? 'bg-brand-500 text-white'
                : 'border border-fd-border bg-fd-card text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Code */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-2xl border border-fd-border bg-fd-card"
      >
        <AnimatePresence mode="wait">
          <motion.pre
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-fd-foreground"
          >
            {examples[active].code}
          </motion.pre>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
