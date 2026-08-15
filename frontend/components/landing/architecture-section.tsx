'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Frame, Lock, Zap } from 'lucide-react';

export function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll animations for the diagram
  const frame1Y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, -40, -80]);
  const frame1Scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.95, 0.9]);
  const frame1Opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.5, 0]);

  const frame2Y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [80, 0, -40]);
  const frame2Scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.9, 1, 1]);
  const frame2Opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 1]);
  const frame2Blur = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["blur(12px)", "blur(0px)", "blur(0px)"]);

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--bg-page)] py-32 sm:py-48 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fa5c4f]/10 border border-[#fa5c4f]/20">
              <Layers className="w-4 h-4 text-[#fa5c4f]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fa5c4f]">Dual-Frame Engine</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[var(--text-main)] font-display leading-[1.1]">
              Render both states.<br />
              <span className="font-bold text-[#fa5c4f]">Animate instantly.</span>
            </h2>
            
            <p className="text-lg text-[var(--text-muted)] font-light leading-relaxed max-w-xl">
              GlideCN utilizes a dual-frame rendering architecture. Instead of immediately unmounting the current page, it takes a snapshot and freezes it, allowing the incoming page to render underneath.
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-[var(--text-subtle)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-main)] mb-1">State Freezing</h4>
                  <p className="text-sm text-[var(--text-muted)] font-light">The outgoing frame (Frame A) is locked in position, preventing layout shifts during unmount.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#fa5c4f]/10 border border-[#fa5c4f]/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#fa5c4f]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-main)] mb-1">GPU Compositing</h4>
                  <p className="text-sm text-[var(--text-muted)] font-light">The incoming frame (Frame B) is composited via hardware-accelerated transforms, ensuring a butter-smooth 60fps handoff.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Visualizer */}
          <div className="relative h-[500px] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto perspective-[1200px]">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay rounded-[2rem] border border-[var(--border-color)]" />
            <div className="absolute inset-0 border border-dashed border-[var(--border-color)] rounded-[2rem]" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, var(--border-color) 1px, transparent 1px), linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)', opacity: 0.3 }} />

            {/* Frame A: Outgoing */}
            <motion.div 
              style={{ 
                y: frame1Y, 
                scale: frame1Scale, 
                opacity: frame1Opacity,
                rotateX: useTransform(scrollYProgress, [0.2, 0.5], [0, 15]),
              }}
              className="absolute inset-x-8 top-12 bottom-24 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--border-color)] shadow-xl p-6 flex flex-col origin-bottom"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="w-1/3 h-4 rounded-md bg-[var(--border-color)] mb-4" />
              <div className="w-full h-24 rounded-lg bg-[var(--bg-page)] border border-[var(--border-color)] mb-4" />
              <div className="w-2/3 h-4 rounded-md bg-[var(--border-color)]" />
              
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-200 text-[10px] font-mono font-medium flex items-center gap-1.5 border border-zinc-700 shadow-sm">
                <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Frame A (Frozen)</span>
              </div>
            </motion.div>

            {/* Frame B: Incoming */}
            <motion.div 
              style={{ 
                y: frame2Y, 
                scale: frame2Scale, 
                opacity: frame2Opacity,
                filter: frame2Blur,
                rotateX: useTransform(scrollYProgress, [0.2, 0.5], [-15, 0]),
              }}
              className="absolute inset-x-8 top-24 bottom-12 rounded-2xl bg-[var(--bg-card)] border-2 border-[#fa5c4f] shadow-2xl shadow-[#fa5c4f]/20 p-6 flex flex-col origin-top"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="w-1/2 h-6 rounded-md bg-[#fa5c4f]/20 mb-4" />
              <div className="w-full h-32 rounded-lg bg-[#fa5c4f]/5 border border-[#fa5c4f]/20 mb-4" />
              <div className="w-3/4 h-4 rounded-md bg-[var(--border-color)]" />

              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#fa5c4f] text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md shadow-[#fa5c4f]/40">
                <span className="size-1.5 rounded-full bg-white animate-ping" />
                <span>Frame B (Active)</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
