'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The fluidity GlideCN brings to React is unparalleled. It feels like native iOS navigation on the web.",
    author: "Sarah Drasner",
    role: "Engineering Manager",
  }
];

export function Testimonials() {
  return (
    <section className="relative w-full bg-[var(--bg-page)] py-32 sm:py-48 border-t border-[var(--border-color)] overflow-hidden">
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-subtle)] text-xs font-bold uppercase tracking-wider mb-6">
            Trusted by Leaders
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
            The standard for <br className="sm:hidden" /> <span className="text-[#fa5c4f]">web transitions</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-32">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative text-center flex flex-col items-center group"
            >
              <Quote className="size-10 sm:size-14 text-[#fa5c4f]/20 mb-8 absolute -top-10 -left-6 sm:-left-12 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              <p className="text-2xl sm:text-4xl lg:text-5xl leading-[1.3] font-medium text-[var(--text-main)] mb-10 tracking-tight">
                "{t.quote}"
              </p>
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-lg font-bold text-[var(--text-main)]">{t.author}</p>
                <p className="text-sm text-[var(--text-subtle)] font-medium uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Clean background, removed decorative glow */}

    </section>
  );
}
