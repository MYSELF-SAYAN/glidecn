'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "Does this work with Next.js App Router?",
    answer: "Yes. Morphy is built with a custom router wrapper that safely intercepts Next.js navigations, allowing exit animations to fire before unmounting the page context. It fully supports both App Router and Pages Router."
  },
  {
    question: "Is this going to hurt my SEO or performance?",
    answer: "Not at all. Morphy uses hardware-accelerated CSS transforms and Framer Motion under the hood. There are no layout shifts (Layout Thrashing) during transitions, meaning your Core Web Vitals remain untouched."
  },
  {
    question: "Do I need to install a heavy npm package?",
    answer: "No. Morphy follows the shadcn/ui philosophy. You use our CLI to copy the exact transition files you want directly into your codebase. You own the code, and you can tweak it to your heart's content."
  },
  {
    question: "Can I use this with plain React Router?",
    answer: "Absolutely. While we provide first-class wrappers for Next.js, the core transition engine is router-agnostic. We provide a simple adapter for React Router out of the box."
  },
  {
    question: "Are the animations accessible?",
    answer: "Yes. All transitions automatically respect the user's prefers-reduced-motion media query. If a user has disabled animations at the OS level, Morphy instantly snaps to the new page without animating."
  }
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-[var(--bg-page)] py-32 border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] font-display mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--text-muted)] text-lg">
            Everything you need to know about integrating Morphy into your app.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[#fa5c4f]/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none focus-visible:bg-[var(--bg-card)] cursor-pointer"
                >
                  <span className="text-lg font-bold text-[var(--text-main)] pr-8">
                    {faq.question}
                  </span>
                  <div className="shrink-0 flex items-center justify-center size-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] transition-transform duration-300">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-[var(--text-muted)] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
