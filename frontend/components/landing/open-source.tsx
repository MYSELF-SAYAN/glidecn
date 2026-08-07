'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, GitPullRequest } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function OpenSource() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[var(--bg-page)] py-32 sm:py-48 overflow-hidden border-t border-[var(--border-color)]"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Minimalist Graphic */}
        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-full border border-[var(--border-color)] flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full rounded-full border border-dashed border-[var(--text-subtle)]/30"
            />
            <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center shadow-sm">
              <Github className="w-6 h-6 text-[var(--text-main)]" />
            </div>
          </motion.div>
        </div>

        {/* Header */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl font-light tracking-tight text-[var(--text-main)] mb-6 font-display"
        >
          Open by design.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--text-muted)] text-lg font-light leading-relaxed max-w-lg mb-12"
        >
          GlideCN is freely available under the MIT license. Explore the source code, review the architecture, and contribute to the ecosystem.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="https://github.com/MYSELF-SAYAN/glidecn"
            target="_blank"
            className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--text-main)] text-[var(--bg-page)] text-sm font-bold shadow-lg transition-transform duration-200 hover:scale-105 active:scale-[0.97] w-full sm:w-auto"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </Link>
          
          <Link
            href="/docs/contributing"
            className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] text-sm font-bold hover:bg-[var(--bg-card-hover)] hover:border-[#fa5c4f]/50 transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] w-full sm:w-auto"
          >
            <GitPullRequest className="w-4 h-4 text-[#fa5c4f]" />
            <span>Contribution Guide</span>
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}
