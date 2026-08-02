'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  ArrowRight,
  Copy,
  Check,
  Play,
  RotateCcw,
  Boxes,
  Code2,
  Gauge,
  Workflow,
  Sparkle,
  ArrowUpRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { SpriteMascot } from '@/components/landing/sprite-mascot';
import { FAMILIES, TRANSITION_CATALOG } from '@/lib/transition-catalog';

export function DocsOverview() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'app-router' | 'pages-router' | 'vite' | 'cli'>('app-router');
  
  // Interactive Dual-Frame Simulation State
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const readyTransitionsCount = TRANSITION_CATALOG.filter((t) => t.status !== 'coming-soon').length;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  // Dual-Frame Lifecycle Simulation
  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1); // 1: Navigation Triggered
    
    setTimeout(() => setSimStep(2), 700);  // 2: Outgoing Route Snapshot Frozen
    setTimeout(() => setSimStep(3), 1500); // 3: Incoming Route Mounted & Crossfade Shader Active
    setTimeout(() => setSimStep(4), 2400); // 4: Outgoing Frame Cleared, Transition Complete
    setTimeout(() => {
      setIsSimulating(false);
      setSimStep(0); // Reset
    }, 3800);
  };

  const familyCards = [
    {
      name: 'Spatial & 3D',
      desc: 'Hardware 3D isometric cubes, page curls, 3D flips, and origami mesh folds.',
      icon: '🧊',
      count: '6 Shaders',
      tag: 'GPU Transform',
      href: '/docs/transitions#spatial',
      accent: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
    },
    {
      name: 'Portals & Iris',
      desc: 'Dynamic clip-path radial portals, iris shutters, and liquid morphing masks.',
      icon: '🌀',
      count: '4 Shaders',
      tag: 'Clip Path',
      href: '/docs/transitions#portal',
      accent: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    },
    {
      name: 'Retro & Analog',
      desc: 'CRT electron-beam collapses, RGB channel glitch split, and neon glow dissolves.',
      icon: '📺',
      count: '5 Shaders',
      tag: 'Filter & SVG',
      href: '/docs/transitions#retro',
      accent: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
    {
      name: 'Kinetic & Dynamic',
      desc: 'Diagonal blade slashes, ripple springs, bounce overshoots, and fluid ink flows.',
      icon: '⚡',
      count: '8 Shaders',
      tag: 'Framer Physics',
      href: '/docs/transitions#dynamic',
      accent: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-[#fa5c4f]',
    },
  ];

  return (
    <div className="space-y-12">
      
      {/* 1. HERO BANNER: Rich Header with Mascot & Quick Actions */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 md:p-12 shadow-xl morphy-card">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-[#fa5c4f]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="sticker-pill">
                <Sparkles className="size-3 text-[#fa5c4f]" /> Core Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                Production Ready v1.0.0
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-main)] font-display leading-[1.12]">
              Cinematic page transitions for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa5c4f] via-[#ff7166] to-amber-500">
                Next.js & React
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              MorphyJS is a synchronized dual-frame transition engine. Zero layout shifts, 60fps GPU compositor acceleration, and copy-paste component CLI inspired by shadcn/ui.
            </p>

            {/* Quick Install Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 shadow-inner">
                <Terminal className="size-3.5 text-[#fa5c4f]" />
                <code className="text-xs font-mono font-bold text-[var(--text-main)]">
                  npx morphyjs-cli init
                </code>
                <button
                  type="button"
                  onClick={() => copyToClipboard('npx morphyjs-cli init', 'hero-init')}
                  className="ml-2 p-1 text-[var(--text-subtle)] hover:text-[#fa5c4f] transition rounded-md"
                  title="Copy command"
                >
                  {copiedCmd === 'hero-init' ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>

              <Link
                href="/docs/installation"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#fa5c4f]/25 transition btn-tactile"
              >
                <span>Quickstart Guide</span>
                <ArrowRight className="size-3.5" />
              </Link>

              <Link
                href="/docs/transitions"
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] px-4 py-2.5 text-xs font-bold text-[var(--text-main)] transition btn-tactile"
              >
                <Boxes className="size-3.5 text-[#fa5c4f]" />
                <span>Browse {readyTransitionsCount}+ Shaders</span>
              </Link>
            </div>
          </div>

          {/* Floating Morphy Mascot Preview Card */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 w-64 p-6 rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-color)] backdrop-blur-sm shadow-xl text-center space-y-3">
            <div className="h-28 flex items-center justify-center -my-2">
              <SpriteMascot pose="waving" size={120} speed={0.9} />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--text-main)] font-display">Morphy Engine</div>
              <div className="text-[11px] text-[var(--text-muted)]">Dual-frame coordinator</div>
            </div>
            <div className="w-full flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] text-[10px] font-bold">
              <Zap className="size-3" /> Zero Runtime Overhead
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUPER UNIQUE METRICS BENTO MATRIX */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] font-display flex items-center gap-2">
              <Gauge className="size-5 text-[#fa5c4f]" />
              Engine Metrics & Architectural Benchmarks
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Designed from the ground up for zero-friction integration and maximum compositor performance.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Metric Card 1: 60 FPS Lock */}
          <div className="morphy-card relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Zap className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  16.6ms frame budget
                </span>
              </div>
              <div>
                <div className="text-3xl font-black text-[var(--text-main)] font-display tracking-tight flex items-baseline gap-1">
                  60 <span className="text-sm font-bold text-emerald-500">FPS</span>
                </div>
                <div className="text-xs font-bold text-[var(--text-main)] mt-1">GPU Compositor Lock</div>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Shaders animate strictly on GPU compositor layers (<code className="text-[10px] font-mono text-[#fa5c4f]">transform</code>, <code className="text-[10px] font-mono text-[#fa5c4f]">opacity</code>, <code className="text-[10px] font-mono text-[#fa5c4f]">clip-path</code>).
              </p>
            </div>

            {/* Visual mini-bar meter */}
            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center gap-1.5">
              {[85, 95, 100, 92, 100, 98, 100, 95, 100].map((val, idx) => (
                <div key={idx} className="flex-1 bg-[var(--border-color)] h-5 rounded-sm overflow-hidden flex items-end">
                  <div
                    className="w-full bg-emerald-500 rounded-sm"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Metric Card 2: Zero Layout Shift */}
          <div className="morphy-card relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <ShieldCheck className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                  CLS = 0.00
                </span>
              </div>
              <div>
                <div className="text-3xl font-black text-[var(--text-main)] font-display tracking-tight flex items-baseline gap-1">
                  0 <span className="text-sm font-bold text-blue-500">Layout Shift</span>
                </div>
                <div className="text-xs font-bold text-[var(--text-main)] mt-1">Frozen Router Context</div>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Outgoing page context is frozen at navigation time. No premature re-renders or unmounting flashes.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span>Next.js App Router</span>
              <span className="text-blue-500 font-bold">100% Synced</span>
            </div>
          </div>

          {/* Metric Card 3: 33+ Production Shaders */}
          <div className="morphy-card relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-[#fa5c4f]/10 text-[#fa5c4f] border border-[#fa5c4f]/20">
                  <Sparkles className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-bold text-[#fa5c4f] bg-[#fa5c4f]/10 px-2 py-0.5 rounded-full">
                  9 Families
                </span>
              </div>
              <div>
                <div className="text-3xl font-black text-[var(--text-main)] font-display tracking-tight flex items-baseline gap-1">
                  33+ <span className="text-sm font-bold text-[#fa5c4f]">Shaders</span>
                </div>
                <div className="text-xs font-bold text-[var(--text-main)] mt-1">Plug-and-Play Registry</div>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                From 3D cubes and origami folds to electron-beam CRT collapses and fluid ink diffusion.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px]">
              <Link href="/docs/transitions" className="text-[#fa5c4f] font-bold flex items-center gap-1 hover:text-[#e54235] transition">
                <span>View gallery</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
              <span className="text-[10px] text-[var(--text-subtle)] font-mono">3D / Portal / SVG</span>
            </div>
          </div>

          {/* Metric Card 4: Micro Bundle Size */}
          <div className="morphy-card relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  <Cpu className="size-5" />
                </span>
                <span className="text-[10px] font-mono font-bold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full">
                  Tree-shakable
                </span>
              </div>
              <div>
                <div className="text-3xl font-black text-[var(--text-main)] font-display tracking-tight flex items-baseline gap-1">
                  &lt; 2.1 <span className="text-sm font-bold text-purple-500">kB</span>
                </div>
                <div className="text-xs font-bold text-[var(--text-main)] mt-1">Core Engine Weight</div>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Zero bloated runtime. Direct code ownership into your project directory via CLI.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span>TypeScript + JS</span>
              <span className="text-purple-500 font-bold">100% Dual Mode</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. INTERACTIVE DUAL-FRAME ARCHITECTURE VISUALIZER */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 md:p-10 shadow-lg morphy-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="sticker-pill">
                <Workflow className="size-3 text-[#fa5c4f]" /> Visualizer
              </span>
              <span className="text-xs font-mono text-[var(--text-subtle)]">Dual-Frame Pipeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] font-display">
              How Morphy Coordinates Transitions
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Watch how Morphy orchestrates outgoing freeze snapshots and incoming mounts simultaneously.
            </p>
          </div>

          <button
            type="button"
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition btn-tactile shrink-0 ${
              isSimulating
                ? 'bg-[var(--bg-card)] text-[var(--text-subtle)] border border-[var(--border-color)] cursor-not-allowed'
                : 'bg-[#fa5c4f] text-white hover:bg-[#e54235] shadow-lg shadow-[#fa5c4f]/25'
            }`}
          >
            {isSimulating ? (
              <>
                <RotateCcw className="size-3.5 animate-spin text-[#fa5c4f]" />
                <span>Simulating Transition...</span>
              </>
            ) : (
              <>
                <Play className="size-3.5 fill-current" />
                <span>Simulate Route Change</span>
              </>
            )}
          </button>
        </div>

        {/* Live Interactive Diagram Canvas */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 md:p-8 space-y-6">
          
          {/* Step Progress Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className={`p-3 rounded-xl border transition-all ${
              simStep === 1
                ? 'bg-[#fa5c4f]/10 border-[#fa5c4f] text-[#fa5c4f] font-bold shadow-sm'
                : simStep > 1
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
            }`}>
              <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">Step 1</div>
              <div className="text-xs font-bold mt-0.5">1. Route Triggered</div>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              simStep === 2
                ? 'bg-[#fa5c4f]/10 border-[#fa5c4f] text-[#fa5c4f] font-bold shadow-sm'
                : simStep > 2
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
            }`}>
              <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">Step 2</div>
              <div className="text-xs font-bold mt-0.5">2. Outgoing Frozen</div>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              simStep === 3
                ? 'bg-[#fa5c4f]/10 border-[#fa5c4f] text-[#fa5c4f] font-bold shadow-sm'
                : simStep > 3
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
            }`}>
              <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">Step 3</div>
              <div className="text-xs font-bold mt-0.5">3. Dual-Frame Shader</div>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              simStep === 4
                ? 'bg-[#fa5c4f]/10 border-[#fa5c4f] text-[#fa5c4f] font-bold shadow-sm'
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]'
            }`}>
              <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">Step 4</div>
              <div className="text-xs font-bold mt-0.5">4. Frame Unmounted</div>
            </div>
          </div>

          {/* Animated Dual Frame Visual Representation */}
          <div className="relative h-56 sm:h-64 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex items-center justify-center p-4">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fa5c4f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg flex items-center justify-center gap-4 sm:gap-8">
              
              {/* Frame A (Outgoing Route) */}
              <motion.div
                animate={{
                  scale: simStep === 2 ? 0.96 : simStep === 3 ? 0.88 : simStep === 4 ? 0.75 : 1,
                  opacity: simStep === 3 ? 0.4 : simStep === 4 ? 0 : 1,
                  x: simStep === 3 ? -30 : simStep === 4 ? -80 : 0,
                  rotateY: simStep === 3 ? -15 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-40 sm:w-48 h-40 sm:h-48 rounded-2xl border border-zinc-500/30 bg-[var(--bg-card)] p-4 shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-500/10 text-zinc-400">
                    Route: /feed
                  </span>
                  {simStep >= 2 && (
                    <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                      FROZEN
                    </span>
                  )}
                </div>

                <div className="space-y-2 py-2">
                  <div className="h-2 w-16 bg-zinc-700/30 rounded" />
                  <div className="h-2 w-full bg-zinc-700/20 rounded" />
                  <div className="h-2 w-24 bg-zinc-700/20 rounded" />
                </div>

                <div className="text-[10px] font-mono text-[var(--text-subtle)] text-center border-t border-[var(--border-color)] pt-1.5">
                  {simStep === 0 ? 'Active Route' : simStep === 2 ? 'Snapshot Locked' : simStep === 3 ? 'Exit Shader Active' : 'Unmounted'}
                </div>
              </motion.div>

              {/* Center Morph Connector Indicator */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <motion.div
                  animate={{
                    rotate: isSimulating ? 360 : 0,
                    scale: isSimulating ? [1, 1.25, 1] : 1,
                  }}
                  transition={{ duration: 1.5, repeat: isSimulating ? Infinity : 0 }}
                  className={`size-10 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                    isSimulating
                      ? 'bg-[#fa5c4f] text-white shadow-[#fa5c4f]/40 ring-4 ring-[#fa5c4f]/20'
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)]'
                  }`}
                >
                  <Sparkles className="size-5" />
                </motion.div>
                <span className="text-[9px] font-mono font-bold mt-1 text-[var(--text-subtle)]">
                  {isSimulating ? 'SYNCING' : 'READY'}
                </span>
              </div>

              {/* Frame B (Incoming Route) */}
              <motion.div
                animate={{
                  scale: simStep === 0 ? 0.9 : simStep === 3 ? 1.02 : simStep === 4 ? 1 : 0.95,
                  opacity: simStep === 0 ? 0.3 : simStep === 3 ? 0.9 : simStep === 4 ? 1 : 0.5,
                  x: simStep === 3 ? 10 : 0,
                  rotateY: simStep === 3 ? 10 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-40 sm:w-48 h-40 sm:h-48 rounded-2xl border p-4 shadow-xl flex flex-col justify-between ${
                  simStep >= 3
                    ? 'border-[#fa5c4f]/60 bg-[var(--bg-card)] shadow-[#fa5c4f]/15'
                    : 'border-zinc-500/20 bg-[var(--bg-card)]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#fa5c4f]/10 text-[#fa5c4f]">
                    Route: /profile
                  </span>
                  {simStep >= 3 && (
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                      ENTERING
                    </span>
                  )}
                </div>

                <div className="space-y-2 py-2">
                  <div className="h-2 w-20 bg-[#fa5c4f]/40 rounded" />
                  <div className="h-2 w-full bg-[#fa5c4f]/20 rounded" />
                  <div className="h-2 w-28 bg-[#fa5c4f]/20 rounded" />
                </div>

                <div className="text-[10px] font-mono text-[var(--text-subtle)] text-center border-t border-[var(--border-color)] pt-1.5">
                  {simStep === 0 ? 'Awaiting Navigation' : simStep >= 3 ? 'Active & Mounted' : 'Mounting...'}
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* 4. CODE SHOWCASE & FRAMEWORK ADAPTER TABS */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] font-display flex items-center gap-2">
            <Code2 className="size-5 text-[#fa5c4f]" />
            Zero-Config Quickstart
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Pick your stack. Add <code>&lt;Page&gt;</code> or <code>&lt;MorphyProvider&gt;</code>. You're done.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-lg morphy-card">
          
          {/* Tab Selector Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2.5 gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveCodeTab('app-router')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeCodeTab === 'app-router'
                    ? 'bg-[#fa5c4f] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
                }`}
              >
                Next.js App Router
              </button>

              <button
                type="button"
                onClick={() => setActiveCodeTab('pages-router')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeCodeTab === 'pages-router'
                    ? 'bg-[#fa5c4f] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
                }`}
              >
                Next.js Pages Router
              </button>

              <button
                type="button"
                onClick={() => setActiveCodeTab('vite')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeCodeTab === 'vite'
                    ? 'bg-[#fa5c4f] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
                }`}
              >
                Vite & React Router
              </button>

              <button
                type="button"
                onClick={() => setActiveCodeTab('cli')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeCodeTab === 'cli'
                    ? 'bg-[#fa5c4f] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
                }`}
              >
                CLI Generator
              </button>
            </div>

            <span className="text-[11px] font-mono text-[var(--text-subtle)] hidden sm:block">
              Copy-paste ready
            </span>
          </div>

          {/* Code Viewer Panel */}
          <div className="p-5 sm:p-6 bg-[#0e0e11] text-zinc-100 font-mono text-xs overflow-x-auto relative">
            
            {activeCodeTab === 'app-router' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-zinc-800">
                  <span>app/layout.tsx & app/contact/page.tsx</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`// 1. app/layout.tsx\nimport { MorphyProvider } from '@/components/morphy';\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <MorphyProvider defaultTransition="cube">\n          {children}\n        </MorphyProvider>\n      </body>\n    </html>\n  );\n}\n\n// 2. app/contact/page.tsx\nimport { Page } from '@/components/morphy';\n\nexport default function ContactPage() {\n  return (\n    <Page transition="circular-portal" duration={0.6}>\n      <main className="p-8">\n        <h1>Contact Us</h1>\n      </main>\n    </Page>\n  );\n}`, 'tab-app')}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition"
                  >
                    {copiedCmd === 'tab-app' ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span>{copiedCmd === 'tab-app' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="leading-relaxed text-[12px]">
                  <span className="text-zinc-500">// 1. Wrap Root Layout with MorphyProvider</span>{'\n'}
                  <span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">MorphyProvider</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;{'\n\n'}
                  <span className="text-purple-400">export default function</span> <span className="text-blue-400">RootLayout</span>({'{'} children {'}'}: {'{'} children: React.ReactNode {'}'}) {'{'}{'\n'}
                  {'  '}<span className="text-purple-400">return</span> ({'\n'}
                  {'    '}&lt;<span className="text-rose-400">html</span> <span className="text-amber-300">lang</span>=<span className="text-emerald-300">"en"</span>&gt;{'\n'}
                  {'      '}&lt;<span className="text-rose-400">body</span>&gt;{'\n'}
                  {'        '}&lt;<span className="text-amber-300">MorphyProvider</span> <span className="text-amber-300">defaultTransition</span>=<span className="text-emerald-300">"cube"</span>&gt;{'\n'}
                  {'          '}{'{'}children{'}'}{'\n'}
                  {'        '}&lt;/<span className="text-amber-300">MorphyProvider</span>&gt;{'\n'}
                  {'      '}&lt;/<span className="text-rose-400">body</span>&gt;{'\n'}
                  {'    '}&lt;/<span className="text-rose-400">html</span>&gt;{'\n'}
                  {'  '});{'\n'}
                  {'}'}{'\n\n'}
                  <span className="text-zinc-500">// 2. Wrap Page routes with &lt;Page&gt;</span>{'\n'}
                  <span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">Page</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;{'\n\n'}
                  <span className="text-purple-400">export default function</span> <span className="text-blue-400">ContactPage</span>() {'{'}{'\n'}
                  {'  '}<span className="text-purple-400">return</span> ({'\n'}
                  {'    '}&lt;<span className="text-amber-300">Page</span> <span className="text-amber-300">transition</span>=<span className="text-emerald-300">"circular-portal"</span> <span className="text-amber-300">duration</span>={'{'}0.6{'}'}&gt;{'\n'}
                  {'      '}&lt;<span className="text-rose-400">main</span> <span className="text-amber-300">className</span>=<span className="text-emerald-300">"p-8"</span>&gt;{'\n'}
                  {'        '}&lt;<span className="text-rose-400">h1</span>&gt;Contact Us&lt;/<span className="text-rose-400">h1</span>&gt;{'\n'}
                  {'      '}&lt;/<span className="text-rose-400">main</span>&gt;{'\n'}
                  {'    '}&lt;/<span className="text-amber-300">Page</span>&gt;{'\n'}
                  {'  '});{'\n'}
                  {'}'}
                </pre>
              </div>
            )}

            {activeCodeTab === 'pages-router' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-zinc-800">
                  <span>pages/_app.tsx</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`import { MorphyProvider } from '@/components/morphy';\nimport type { AppProps } from 'next/app';\n\nexport default function MyApp({ Component, pageProps, router }: AppProps) {\n  return (\n    <MorphyProvider key={router.pathname} defaultTransition="fold">\n      <Component {...pageProps} />\n    </MorphyProvider>\n  );\n}`, 'tab-pages')}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition"
                  >
                    {copiedCmd === 'tab-pages' ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span>{copiedCmd === 'tab-pages' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="leading-relaxed text-[12px]">
                  <span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">MorphyProvider</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;{'\n'}
                  <span className="text-purple-400">import type</span> {'{'} <span className="text-amber-300">AppProps</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'next/app'</span>;{'\n\n'}
                  <span className="text-purple-400">export default function</span> <span className="text-blue-400">MyApp</span>({'{'} Component, pageProps, router {'}'}: <span className="text-amber-300">AppProps</span>) {'{'}{'\n'}
                  {'  '}<span className="text-purple-400">return</span> ({'\n'}
                  {'    '}&lt;<span className="text-amber-300">MorphyProvider</span> <span className="text-amber-300">key</span>={'{'}router.pathname{'}'} <span className="text-amber-300">defaultTransition</span>=<span className="text-emerald-300">"fold"</span>&gt;{'\n'}
                  {'      '}&lt;<span className="text-rose-400">Component</span> {'{'}...pageProps{'}'} /&gt;{'\n'}
                  {'    '}&lt;/<span className="text-amber-300">MorphyProvider</span>&gt;{'\n'}
                  {'  '});{'\n'}
                  {'}'}
                </pre>
              </div>
            )}

            {activeCodeTab === 'vite' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-zinc-800">
                  <span>src/App.tsx (React Router v6+)</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`import { MorphyProvider, Page } from '@/components/morphy';\nimport { useLocation, Routes, Route } from 'react-router-dom';\n\nexport function App() {\n  const location = useLocation();\n  return (\n    <MorphyProvider key={location.pathname} defaultTransition="slash">\n      <Routes location={location}>\n        <Route path="/" element={<Page transition="slide"><Home /></Page>} />\n        <Route path="/about" element={<Page transition="cube"><About /></Page>} />\n      </Routes>\n    </MorphyProvider>\n  );\n}`, 'tab-vite')}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition"
                  >
                    {copiedCmd === 'tab-vite' ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span>{copiedCmd === 'tab-vite' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="leading-relaxed text-[12px]">
                  <span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">MorphyProvider</span>, <span className="text-amber-300">Page</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;{'\n'}
                  <span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">useLocation</span>, <span className="text-amber-300">Routes</span>, <span className="text-amber-300">Route</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'react-router-dom'</span>;{'\n\n'}
                  <span className="text-purple-400">export function</span> <span className="text-blue-400">App</span>() {'{'}{'\n'}
                  {'  '}<span className="text-purple-400">const</span> location = <span className="text-amber-300">useLocation</span>();{'\n'}
                  {'  '}<span className="text-purple-400">return</span> ({'\n'}
                  {'    '}&lt;<span className="text-amber-300">MorphyProvider</span> <span className="text-amber-300">key</span>={'{'}location.pathname{'}'} <span className="text-amber-300">defaultTransition</span>=<span className="text-emerald-300">"slash"</span>&gt;{'\n'}
                  {'      '}&lt;<span className="text-rose-400">Routes</span> <span className="text-amber-300">location</span>={'{'}location{'}'}&gt;{'\n'}
                  {'        '}&lt;<span className="text-rose-400">Route</span> <span className="text-amber-300">path</span>=<span className="text-emerald-300">"/"</span> <span className="text-amber-300">element</span>={'{'}&lt;<span className="text-amber-300">Page</span> <span className="text-amber-300">transition</span>=<span className="text-emerald-300">"slide"</span>&gt;&lt;<span className="text-rose-400">Home</span> /&gt;&lt;/<span className="text-amber-300">Page</span>&gt;{'}'} /&gt;{'\n'}
                  {'        '}&lt;<span className="text-rose-400">Route</span> <span className="text-amber-300">path</span>=<span className="text-emerald-300">"/about"</span> <span className="text-amber-300">element</span>={'{'}&lt;<span className="text-amber-300">Page</span> <span className="text-amber-300">transition</span>=<span className="text-emerald-300">"cube"</span>&gt;&lt;<span className="text-rose-400">About</span> /&gt;&lt;/<span className="text-amber-300">Page</span>&gt;{'}'} /&gt;{'\n'}
                  {'      '}&lt;/<span className="text-rose-400">Routes</span>&gt;{'\n'}
                  {'    '}&lt;/<span className="text-amber-300">MorphyProvider</span>&gt;{'\n'}
                  {'  '});{'\n'}
                  {'}'}
                </pre>
              </div>
            )}

            {activeCodeTab === 'cli' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-2 border-b border-zinc-800">
                  <span>Terminal CLI Commands</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`npx morphy init\nnpx morphy add cube\nnpx morphy add circular-portal`, 'tab-cli')}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition"
                  >
                    {copiedCmd === 'tab-cli' ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span>{copiedCmd === 'tab-cli' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="leading-relaxed text-[12px]">
                  <span className="text-zinc-500"># 1. Initialize Morphy in your Next.js / React project</span>{'\n'}
                  <span className="text-[#fa5c4f] font-bold">npx</span> <span className="text-amber-300">morphy</span> init{'\n\n'}
                  <span className="text-zinc-500"># 2. Add individual transitions on-demand (shadcn style)</span>{'\n'}
                  <span className="text-[#fa5c4f] font-bold">npx</span> <span className="text-amber-300">morphy</span> add <span className="text-emerald-300">cube</span>{'\n'}
                  <span className="text-[#fa5c4f] font-bold">npx</span> <span className="text-amber-300">morphy</span> add <span className="text-emerald-300">circular-portal</span>{'\n'}
                  <span className="text-[#fa5c4f] font-bold">npx</span> <span className="text-amber-300">morphy</span> add <span className="text-emerald-300">origami-unfold</span>{'\n\n'}
                  <span className="text-zinc-500"># 3. Add all transitions at once</span>{'\n'}
                  <span className="text-[#fa5c4f] font-bold">npx</span> <span className="text-amber-300">morphy</span> add <span className="text-emerald-300">--all</span>
                </pre>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 5. VISUAL TRANSITION FAMILY BENTO CARDS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] font-display flex items-center gap-2">
              <Boxes className="size-5 text-[#fa5c4f]" />
              Transition Families & Categories
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Curated shader archetypes crafted for different aesthetic atmospheres and application personas.
            </p>
          </div>

          <Link
            href="/docs/transitions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#fa5c4f] hover:text-[#e54235] transition group self-start sm:self-auto"
          >
            <span>Explore All 33+ Transitions</span>
            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {familyCards.map((fam) => (
            <Link
              key={fam.name}
              href={fam.href}
              className="morphy-card relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between group no-underline"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{fam.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)]">
                      {fam.tag}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f]">
                      {fam.count}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition">
                    {fam.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                    {fam.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[#fa5c4f]">
                <span>View Shaders</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
