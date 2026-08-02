'use client';

/* ==========================================================================
 * Installation Section — Three-step install flow
 * ========================================================================== */

import { motion } from 'framer-motion';
import { Terminal, FolderTree, Layers } from 'lucide-react';

const steps = [
  {
    icon: Terminal,
    step: '01',
    title: 'Install via CLI',
    code: 'npx morphy@latest init',
    description: 'One command copies all components into your project.',
  },
  {
    icon: FolderTree,
    step: '02',
    title: 'Components are yours',
    code: 'components/morphy/',
    description: 'Every file lives in your codebase. Full ownership.',
  },
  {
    icon: Layers,
    step: '03',
    title: 'Wrap and go',
    code: '<MorphyProvider>\n  <Page transition="fade">\n    <Home />\n  </Page>\n</MorphyProvider>',
    description: "Wrap your app, assign transitions. That\u0027s it.",
  },
];

export function InstallationSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
          Up and running in seconds
        </h2>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          No config files. No build plugins. Just components.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-brand-50 p-2.5 text-brand-500 dark:bg-brand-950/50 dark:text-brand-400">
                  <Icon className="size-5" />
                </div>
                <span className="text-xs font-bold tracking-widest text-fd-muted-foreground">
                  STEP {step.step}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-fd-foreground">
                {step.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-fd-muted-foreground">
                {step.description}
              </p>

              <div className="mt-auto rounded-xl border border-fd-border bg-fd-muted/30 p-4">
                <pre className="overflow-x-auto font-mono text-sm text-fd-foreground">
                  {step.code}
                </pre>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
