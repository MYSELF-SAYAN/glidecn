'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TRANSITION_CATALOG } from '@/lib/transition-catalog';

const metrics = [
  { value: '60', suffix: ' FPS', label: 'Compositor Speed', desc: 'Locked frame rates with Zero Layout Shift out of the box.' },
  { value: TRANSITION_CATALOG.length.toString(), suffix: '+', label: 'Built-in Transitions', desc: 'A massive curated library of spatial, portal, and organic effects.' },
  { value: '0', suffix: ' kb', label: 'Runtime Bloat', desc: 'Copy-paste code ownership. You own the framer-motion variants.' },
];

export function MetricsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-[var(--bg-page)] border-y border-[var(--border-color)]">
      
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-surface)] to-transparent opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#fa5c4f]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10" ref={containerRef}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
            Engineered for <span className="text-[#fa5c4f]">Performance</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto">
            GlideCN doesn't just look good. It's built on an architecture that guarantees silky smooth transitions on any device.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.6, delay: 0.15 * idx, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="flex items-baseline gap-1 text-[#fa5c4f] mb-3">
                <span className="text-5xl sm:text-6xl font-black tracking-tighter font-display">{metric.value}</span>
                <span className="text-xl sm:text-2xl font-bold font-mono">{metric.suffix}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-main)] font-display mb-2">{metric.label}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{metric.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
