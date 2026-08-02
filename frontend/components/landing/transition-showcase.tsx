'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Gamepad2 } from 'lucide-react';
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
        🧊
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
          <span className="text-2xl">🌀</span>
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
        🦢
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
        🖋️
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
        📺
      </motion.div>
    </div>
  );
}

function PageCurlDemo() {
  const [curled, setCurled] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setCurled((c) => !c), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 bg-[var(--bg-surface)] overflow-hidden flex items-center justify-center">
      <div className="relative size-20 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-2 shadow-md">
        <div className="h-1.5 w-8 rounded-full bg-[var(--border-color)] mb-1" />
        <div className="h-1.5 w-12 rounded-full bg-[var(--border-color)]" />
        
        <motion.div
          animate={{
            x: curled ? 0 : 40,
            y: curled ? 0 : 40,
            rotate: curled ? 0 : 20,
            opacity: curled ? 1 : 0.4,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-0 w-12 h-12 rounded-bl-2xl bg-gradient-to-bl from-[#fa5c4f] to-[#ff8a7a] shadow-md"
        />
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */
/*  Showcase List                                                           */
/* ───────────────────────────────────────────────────────────────────────── */

const transitionsList = [
  { id: 'cube', name: 'Cube 3D', category: 'Spatial', desc: 'Spatial 3D isometric axis rotation at 60 FPS.', Demo: CubeDemo },
  { id: 'circular-portal', name: 'Circular Portal', category: 'Portal', desc: 'Expanding radial iris reveal with fluid momentum.', Demo: CircularPortalDemo },
  { id: 'origami-unfold', name: 'Origami Blossom', category: 'Paper', desc: 'Multi-facet 3D accordion fold unfolding outwards.', Demo: OrigamiDemo },
  { id: 'ink-spread', name: 'Fluid Ink Spread', category: 'Mask', desc: 'Organic diffusion wash bleeding across viewport.', Demo: InkSpreadDemo },
  { id: 'tv-turn-off', name: 'CRT Phosphor', category: 'Retro', desc: 'Vintage electron-beam screen collapse.', Demo: TVTurnOffDemo },
  { id: 'page-curl', name: 'Page Curl', category: 'Paper', desc: 'Realistic physical book page curl simulation.', Demo: PageCurlDemo },
];

export function TransitionShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Side — Headline & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/3 flex flex-col items-start pt-2 lg:sticky lg:top-28 space-y-5"
        >
          <span className="sticker-pill">
            <Sparkles className="size-3 text-[#fa5c4f]" /> Handcrafted Shaders
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display leading-[1.12]">
            33+ production shaders. <br />
            <span className="font-cursive text-[#fa5c4f] font-normal text-4xl sm:text-5xl">
              Infinite possibilities.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Every transition is fully customizable. Test any shader live inside the interactive 2-page playground.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/playground/page-1"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#fa5c4f]/25 transition btn-tactile"
            >
              <Gamepad2 className="size-4" />
              <span>Launch Playground</span>
            </Link>

            <Link
              href="/docs/transitions"
              className="inline-flex items-center gap-1.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] px-4 py-2.5 text-xs font-semibold text-[var(--text-main)] transition btn-tactile"
            >
              <span>View All 33+</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Right Side — Interactive Shader Grid */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {transitionsList.map((item, i) => {
              const DemoComponent = item.Demo;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="morphy-card flex flex-col overflow-hidden rounded-3xl group"
                >
                  {/* Animated shader preview area */}
                  <div className="relative h-36 w-full border-b border-[var(--border-color)] overflow-hidden">
                    <DemoComponent />
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[var(--bg-surface)]/80 backdrop-blur-sm border border-[var(--border-color)] text-[9px] font-mono font-bold uppercase text-[var(--text-subtle)]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex flex-col p-4 flex-1 justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <Link
                      href="/playground/page-1"
                      className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-bold text-[#fa5c4f] group-hover:text-[#e54235] no-underline transition-colors"
                    >
                      <span>Test in Playground</span>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
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
