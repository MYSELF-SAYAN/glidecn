'use client';
import { TRANSITION_CATALOG } from '@/lib/transition-catalog';

import { motion, AnimatePresence } from 'framer-motion';
import { Box, Loader2, Feather, PenTool, Monitor, ArrowRight, Sparkles, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ───────────────────────────────────────────────────────────────────────── */
/*  Animated graphic components — these loop like live preview shaders      */
/* ───────────────────────────────────────────────────────────────────────── */

function CubeDemo() {
  const [rotated, setRotated] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setRotated((r) => !r), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)] perspective-[600px]">
      <motion.div
        animate={{
          rotateY: rotated ? 90 : 0,
          scale: rotated ? 0.9 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="size-20 rounded-2xl bg-gradient-to-br from-[#fa5c4f] to-[#ff8a7a] shadow-xl shadow-[#fa5c4f]/30 flex items-center justify-center text-white text-2xl font-bold font-mono"
      >
        <Box className="size-8" />
      </motion.div>
    </div>
  );
}

function CircularPortalDemo() {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setRevealed((r) => !r), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)]">
      <div className="relative size-24">
        <div className="absolute inset-0 rounded-full bg-blue-500/20" />
        <motion.div
          animate={{
            clipPath: revealed ? 'circle(50% at 50% 50%)' : 'circle(0% at 50% 50%)',
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"
        >
          <Loader2 className="size-8 text-white animate-spin-slow" />
        </motion.div>
        <motion.div
          animate={{ scale: revealed ? 1.15 : 1, opacity: revealed ? 0.4 : 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 rounded-full border-2 border-blue-400"
        />
      </div>
    </div>
  );
}

function OrigamiDemo() {
  const [folded, setFolded] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setFolded((f) => !f), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)]">
      <motion.div
        animate={{
          rotateX: folded ? 75 : 0,
          scale: folded ? 0.85 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="size-20 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 shadow-xl shadow-amber-500/20 flex items-center justify-center text-2xl"
      >
        <Feather className="size-8 text-white" />
      </motion.div>
    </div>
  );
}

function InkSpreadDemo() {
  const [spread, setSpread] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setSpread((s) => !s), 2300);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)]">
      <motion.div
        animate={{
          scale: spread ? [0.2, 1.3, 1] : [1, 0.2],
          borderRadius: spread ? ['50%', '35%', '45%'] : '50%',
          opacity: spread ? [0, 1, 0.9] : [0.9, 0],
        }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="size-20 bg-gradient-to-br from-emerald-500 to-teal-400 shadow-xl shadow-emerald-500/20 flex items-center justify-center text-2xl"
      >
        <PenTool className="size-8 text-white" />
      </motion.div>
    </div>
  );
}

function TVTurnOffDemo() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setOff((o) => !o), 2100);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-surface)]">
      <motion.div
        animate={{
          scaleX: off ? 0.05 : 1,
          scaleY: off ? 0.02 : 1,
          opacity: off ? 0.3 : 1,
        }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
        className="size-20 rounded-xl bg-slate-800 shadow-xl shadow-black/20 flex items-center justify-center text-2xl border border-slate-700"
      >
        <Monitor className="size-8 text-slate-400" />
      </motion.div>
    </div>
  );
}

function FlowDemo() {
  const [slide, setSlide] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => !s), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 bg-[var(--bg-surface)] overflow-hidden flex items-center justify-center">
      <div className="relative size-full flex items-center justify-center">
        <AnimatePresence initial={false}>
          {slide ? (
            <motion.div
              key="slide-1"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-[#fa5c4f] to-orange-400 flex items-center justify-center"
            >
              <ArrowRight className="size-10 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="slide-2"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"
            >
              <ArrowRight className="size-10 text-white rotate-180" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/*  Showcase List                                                           */
/* ───────────────────────────────────────────────────────────────────────── */

const transitionsList = [
  { id: 'spatial', name: 'Spatial', desc: 'Spatial 3D isometric axis rotation at 60 FPS.', Demo: CubeDemo },
  { id: 'portal', name: 'Portal', desc: 'Expanding radial iris reveal with fluid momentum.', Demo: CircularPortalDemo },
  { id: 'paper', name: 'Paper', desc: 'Multi-facet 3D accordion fold unfolding outwards.', Demo: OrigamiDemo },
  { id: 'mask', name: 'Mask', desc: 'Organic diffusion wash bleeding across viewport.', Demo: InkSpreadDemo },
  { id: 'experimental', name: 'Experimental', desc: 'Vintage electron-beam screen collapse.', Demo: TVTurnOffDemo },
  { id: 'flow', name: 'Flow', desc: 'Classic directional movement between pages.', Demo: FlowDemo },
];

export function TransitionShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
        
        {/* Left Side — Headline & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/3 flex flex-col items-start pt-2 lg:sticky lg:top-32 space-y-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] text-[10px] uppercase tracking-widest font-bold">
            <Sparkles className="size-3 text-[#fa5c4f]" /> Handcrafted Shaders
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[var(--text-main)] font-display leading-[1.15]">
            {TRANSITION_CATALOG.length}+ production shaders. <br />
            <span className="font-cursive text-[var(--text-muted)] font-normal text-5xl sm:text-6xl inline-block mt-2">
              Infinite <span className="relative text-[#fa5c4f]">
                possibilities.
                <motion.svg 
                  className="absolute -bottom-1 left-0 w-full text-[#fa5c4f]/60" 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.path 
                    d="M2 8C20 2 40 8 60 5C75 3 85 7 98 4" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
                  />
                </motion.svg>
              </span>
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-light">
            Explore 7 distinct families: Flow, Portal, Paper, Mask, Spatial, Dynamic, and Experimental. Every transition is fully customizable. Test any shader live inside the interactive 2-page playground.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/playground/page-1"
              className="w-full sm:w-auto group relative flex justify-center items-center gap-2 rounded-full bg-[#fa5c4f] px-6 py-3.5 text-sm font-bold text-white transition-[background-color,transform,box-shadow] duration-200 hover:bg-[#e54235] hover:shadow-[0_0_30px_-10px_rgba(250,92,79,0.5)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Gamepad2 className="size-4" />
              <span>Launch Playground</span>
            </Link>

            <Link
              href="/docs/transitions"
              className="w-full sm:w-auto group flex justify-center items-center gap-2 text-sm font-medium text-[var(--text-main)] hover:text-[#fa5c4f] transition-colors"
            >
              <span>View All {TRANSITION_CATALOG.length}+</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Right Side — Interactive Shader Grid (Masonry Staggered) */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {transitionsList.map((item, i) => {
              const DemoComponent = item.Demo;
              // Stagger the right column for masonry effect
              const isEvenColumn = i % 2 !== 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col overflow-hidden rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-color)] group hover:border-[#fa5c4f]/50 hover:shadow-[0_20px_40px_-15px_rgba(250,92,79,0.15)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 ${
                    isEvenColumn ? 'sm:mt-12' : ''
                  }`}
                >
                  {/* Animated shader preview area */}
                  <div className="relative h-48 w-full overflow-hidden bg-[var(--bg-page)]/50">
                    <DemoComponent />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  <div className="flex flex-col p-6 flex-1 justify-between space-y-4 bg-gradient-to-b from-[var(--bg-page)]/50 to-[var(--bg-surface)]">
                    <div>
                      <h3 className="text-lg font-light text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>

                    <Link
                      href="/playground/page-1"
                      className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[var(--text-main)] group-hover:text-[#fa5c4f] transition-colors"
                    >
                      <span>Test in Playground</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
