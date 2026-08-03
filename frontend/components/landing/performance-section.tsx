'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function PerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--bg-page)] py-32 sm:py-48 overflow-hidden border-t border-[var(--border-color)]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <motion.div style={{ scale, opacity }} className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Gauge className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500">60 FPS Native</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-light tracking-tight text-[var(--text-main)] mb-6 font-display leading-[1.1]"
          >
            Never drop a frame.<br />
            <span className="italic font-cursive text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400 relative inline-block">
              Ever again.
              <motion.svg 
                className="absolute -bottom-1 left-0 w-full text-emerald-400/60" 
                viewBox="0 0 100 10" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.path 
                  d="M2 8C20 2 40 8 60 5C75 3 85 7 98 4" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                />
              </motion.svg>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[var(--text-muted)] font-light leading-relaxed"
          >
            By offloading transitions to the browser's compositor thread, MorphyJS guarantees butter-smooth animations even when React is heavily blocking the main thread.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traditional Rendering (Janky) */}
          <div className="relative p-8 rounded-[2rem] bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden flex flex-col h-[400px]">
            <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Standard React
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-red-500/10 text-red-500">Main Thread Blocked</span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: (t: number) => Math.floor(t * 10) / 10, // Simulates extreme jank
                    delay: i * 0.2
                  }}
                  className="w-1/2 h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm flex items-center px-4"
                >
                  <div className="w-full h-2 rounded bg-red-500/20" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* MorphyJS Rendering (Smooth) */}
          <div className="relative p-8 rounded-[2rem] bg-[var(--bg-card)] border border-[#fa5c4f]/30 shadow-[0_20px_40px_rgba(250,92,79,0.05)] overflow-hidden flex flex-col h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> MorphyJS
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Compositor Thread</span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-4 relative z-10">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={`smooth-${i}`}
                  animate={{ x: ["0%", "100%", "0%"] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut", // Butter smooth
                    delay: i * 0.2
                  }}
                  className="w-1/2 h-12 rounded-xl bg-[var(--bg-surface)] border border-[#fa5c4f]/20 shadow-md flex items-center px-4"
                >
                  <div className="w-full h-2 rounded bg-emerald-500/40" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
