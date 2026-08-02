'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Copy,
  Check,
  Star,
  ChevronDown,
  Layers,
  Sparkles,
  Terminal,
  BookOpen,
  Sliders,
  Gamepad2,
} from 'lucide-react';
import Link from 'next/link';
import { SpriteMascot, MascotPose } from './sprite-mascot';

const PKG_COMMANDS = {
  pnpm: 'pnpm dlx morphyjs-cli@latest add',
  npm: 'npx morphyjs-cli@latest add',
  bun: 'bunx morphyjs-cli@latest add',
  yarn: 'yarn dlx morphyjs-cli@latest add',
};

const HERO_DEMOS = [
  {
    id: 'cube',
    name: '3D Cube',
    icon: '🧊',
    tag: 'Spatial Axis',
    desc: 'Rotates adjacent route views on a 3D isometric cube.',
  },
  {
    id: 'portal',
    name: 'Radial Portal',
    icon: '🌀',
    tag: 'Iris Aperture',
    desc: 'Expands a centered circular window with fluid momentum.',
  },
  {
    id: 'origami',
    name: 'Origami Unfold',
    icon: '🦢',
    tag: 'Paper 3D',
    desc: 'Multi-facet vertical accordion origami blossom.',
  },
  {
    id: 'crt',
    name: 'CRT Collapse',
    icon: '📺',
    tag: 'Retro Phosphor',
    desc: 'Electron beam horizon collapse with phosphor flash.',
  },
];

export function Hero() {
  const [selectedPkg, setSelectedPkg] = useState<keyof typeof PKG_COMMANDS>('pnpm');
  const [copied, setCopied] = useState(false);
  const [activeDemo, setActiveDemo] = useState(HERO_DEMOS[0]);
  const [pose, setPose] = useState<MascotPose>('idle');
  const [mascotBubble, setMascotBubble] = useState("Psst! Click the tabs to switch live shaders! ✨");

  const currentCommand = PKG_COMMANDS[selectedPkg];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setMascotBubble("CLI command copied! Ready to paste 🚀");
    setTimeout(() => {
      setCopied(false);
      setMascotBubble("Psst! Click the tabs to switch live shaders! ✨");
    }, 2500);
  };

  const cyclePose = () => {
    const poses: MascotPose[] = ['jumping', 'waving', 'running-right', 'waiting', 'idle'];
    const next = poses[(poses.indexOf(pose) + 1) % poses.length];
    setPose(next);
    const quips: Partial<Record<MascotPose, string>> = {
      jumping: 'Wheee! 60 FPS compositor speed! 🦘',
      waving: 'Hi friend! Ready to upgrade your transitions? 👋',
      'running-right': 'Zooming at zero-jank speeds! ⚡',
      waiting: 'Waiting for your next page transition! ⏳',
      idle: 'Chilling with zero layout shift 🧊',
      failed: 'Oops, caught a 404! 🙈',
    };
    setMascotBubble(quips[next] || 'Nice!');
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 opacity-25 dark:opacity-15">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fa5c4f]/20 via-[#ff8a7a]/10 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* ── Left Column: Headline & Primary Actions (7 cols) ── */}
          <div className="flex flex-col items-start gap-6 z-10 lg:col-span-7">
            
            {/* Playful Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="sticker-pill">
                <Star className="size-3 fill-[#fa5c4f] text-[#fa5c4f]" />
                33+ Zero-Jank Shaders
              </span>
              <span className="sticker-pill rotate-1 bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30">
                shadcn/ui-style Copy-Paste DX
              </span>
              <Link
                href="/playground/page-1"
                className="sticker-pill hover:border-[#fa5c4f] transition flex items-center gap-1 text-[var(--text-subtle)] hover:text-[#fa5c4f]"
              >
                <Gamepad2 className="size-3" />
                <span>Playground Mode</span>
              </Link>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-[4.3rem] font-extrabold tracking-tight text-[var(--text-main)] font-display leading-[1.06]"
            >
              Page <br />
              transitions <br />
              that{' '}
              <span className="relative inline-block font-cursive text-[#fa5c4f] text-5xl sm:text-7xl lg:text-[5.4rem] font-normal tracking-normal">
                flow.
                {/* Underline Squiggle */}
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full text-[#fa5c4f]/40"
                  viewBox="0 0 120 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                >
                  <motion.path
                    d="M5 8C25 2 45 12 65 6C85 0 105 10 115 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg text-sm sm:text-base leading-relaxed text-[var(--text-muted)]"
            >
              The pluggable page transition library for React & Next.js. Copy-paste 33+ hardware-accelerated shaders, 3D isometric cubes, origami folds, and fluid portals directly into your codebase.
            </motion.p>

            {/* Main Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Link
                href="/docs/installation"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#fa5c4f]/25 active:scale-95 transition-all btn-tactile"
              >
                <BookOpen className="size-4" />
                <span>Get Started</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/docs/transitions"
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] px-5 py-3.5 text-xs sm:text-sm font-bold text-[var(--text-main)] transition-all active:scale-95 btn-tactile"
              >
                <Layers className="size-4 text-[#fa5c4f]" />
                <span>Browse 33+ Transitions</span>
              </Link>
            </motion.div>

            {/* CLI Command Box with Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-2 shadow-sm"
            >
              {/* Tab Selector */}
              <div className="flex items-center justify-between px-2 pb-2 border-b border-[var(--border-color)] text-[11px] font-mono">
                <div className="flex items-center gap-1">
                  {(['pnpm', 'npm', 'bun', 'yarn'] as const).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`px-2 py-0.5 rounded-md font-bold transition cursor-pointer ${
                        selectedPkg === pkg
                          ? 'bg-[#fa5c4f]/10 text-[#fa5c4f]'
                          : 'text-[var(--text-subtle)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-[var(--text-subtle)]">CLI installer</span>
              </div>

              {/* Command row */}
              <div className="flex items-center justify-between px-3 py-2 pt-2.5 font-mono text-xs text-[var(--text-main)]">
                <span className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <span className="text-[#fa5c4f] font-bold">$</span>
                  <span className="truncate">{currentCommand}</span>
                </span>
                <button
                  onClick={handleCopy}
                  aria-label="Copy CLI command"
                  className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition cursor-pointer"
                  title="Copy command"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </motion.div>

          </div>

          {/* ── Right Column: Interactive Live Transition Sandbox Card & Morphy Mascot (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center lg:col-span-5 space-y-4"
          >
            {/* Mascot Speech Bubble */}
            <div className="w-full max-w-sm flex justify-end">
              <div className="relative rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-2.5 shadow-lg text-xs font-semibold text-[var(--text-main)] animate-bounce-subtle">
                <p className="leading-snug">{mascotBubble}</p>
                <div className="absolute -bottom-1.5 right-10 w-3 h-3 bg-[var(--bg-card)] border-b border-r border-[var(--border-color)] rotate-45" />
              </div>
            </div>

            {/* Interactive Live Shader Preview Sandbox */}
            <div className="w-full max-w-sm rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl overflow-hidden morphy-card">
              
              {/* Header with Shader selector tabs */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
                <div className="flex items-center gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/80" />
                  <div className="size-2.5 rounded-full bg-yellow-500/80" />
                  <div className="size-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-1.5 font-mono text-[10px] text-[var(--text-subtle)] font-bold">
                    LIVE SHADER
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#fa5c4f] font-bold uppercase">
                  {activeDemo.tag}
                </span>
              </div>

              {/* Live Canvas Area */}
              <div className="relative h-44 w-full bg-[var(--bg-page)] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeDemo.id === 'cube' && (
                    <motion.div
                      key="cube"
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: [0, 90, 0], opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                      className="size-24 rounded-2xl bg-gradient-to-br from-[#fa5c4f] to-[#ff8a7a] shadow-xl shadow-[#fa5c4f]/30 flex flex-col items-center justify-center text-white text-3xl font-bold font-mono"
                    >
                      🧊
                      <span className="text-[10px] font-sans font-normal opacity-90 mt-1">60 FPS</span>
                    </motion.div>
                  )}

                  {activeDemo.id === 'portal' && (
                    <motion.div
                      key="portal"
                      initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
                      animate={{ clipPath: ['circle(0% at 50% 50%)', 'circle(60% at 50% 50%)', 'circle(0% at 50% 50%)'], opacity: 1 }}
                      exit={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
                      className="size-28 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-xl flex items-center justify-center text-3xl text-white"
                    >
                      🌀
                    </motion.div>
                  )}

                  {activeDemo.id === 'origami' && (
                    <motion.div
                      key="origami"
                      initial={{ rotateX: 90, opacity: 0 }}
                      animate={{ rotateX: [0, 80, 0], opacity: 1 }}
                      exit={{ rotateX: 90, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                      className="size-24 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-400 shadow-xl shadow-amber-500/20 flex flex-col items-center justify-center text-3xl text-white"
                    >
                      🦢
                      <span className="text-[10px] font-sans font-normal opacity-90 mt-1">Fold 3D</span>
                    </motion.div>
                  )}

                  {activeDemo.id === 'crt' && (
                    <motion.div
                      key="crt"
                      initial={{ scaleX: 0, scaleY: 0.05, opacity: 0 }}
                      animate={{ scaleX: [1, 0.05, 1], scaleY: [1, 0.02, 1], opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                      className="size-24 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-500 shadow-xl shadow-purple-500/20 flex flex-col items-center justify-center text-3xl text-white"
                    >
                      📺
                      <span className="text-[10px] font-sans font-normal opacity-90 mt-1">CRT Off</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selector Pills */}
              <div className="p-3 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
                {HERO_DEMOS.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => {
                      setActiveDemo(demo);
                      setMascotBubble(`Switched to ${demo.name}! ${demo.desc}`);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                      activeDemo.id === demo.id
                        ? 'bg-[#fa5c4f] text-white shadow-sm shadow-[#fa5c4f]/20 font-bold'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    <span>{demo.icon}</span>
                    <span>{demo.name}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Clickable Companion Mascot */}
            <div
              onClick={cyclePose}
              className="relative z-20 cursor-pointer group flex flex-col items-center pt-1"
              title="Click Morphy to change pose!"
            >
              <div className="group-hover:scale-110 active:scale-95 transition-transform duration-200">
                <SpriteMascot pose={pose} size={130} />
              </div>
              <span className="mt-1 text-[11px] font-mono text-[var(--text-subtle)] group-hover:text-[#fa5c4f] transition flex items-center gap-1">
                <Sparkles className="size-3" /> Click Morphy to change pose ({pose})
              </span>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-5 text-[var(--text-subtle)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
