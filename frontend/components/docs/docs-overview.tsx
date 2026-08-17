'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Copy,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { TRANSITION_CATALOG } from '@/lib/transition-catalog';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { CodeBlock } from '@/components/ui/code-block';

export function DocsOverview() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'app-router' | 'pages-router' | 'vite' | 'cli'>('app-router');

  // Interactive Dual-Frame Simulation State
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const readyTransitionsCount = TRANSITION_CATALOG.filter((t) => t.status !== 'coming-soon').length;

  const handleCopy = (text: string, id: string) => {
    copyToClipboard(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1500);
    setTimeout(() => setSimStep(4), 2400);
    setTimeout(() => {
      setIsSimulating(false);
      setSimStep(0);
    }, 3800);
  };

  const familyCards = [
    {
      name: 'Spatial & 3D',
      desc: 'Hardware 3D isometric cubes, page curls, 3D flips, and origami mesh folds.',
      count: '6 Transitions',
      tag: 'GPU Transform',
      href: '/transition#spatial',
    },
    {
      name: 'Portals & Iris',
      desc: 'Dynamic clip-path radial portals, iris shutters, and liquid morphing masks.',
      count: '4 Transitions',
      tag: 'Clip Path',
      href: '/transition#portal',
    },
    {
      name: 'Retro & Analog',
      desc: 'CRT electron-beam collapses, RGB channel glitch split, and neon glow dissolves.',
      count: '5 Transitions',
      tag: 'Filter & SVG',
      href: '/transition#retro',
    },
    {
      name: 'Kinetic & Dynamic',
      desc: 'Diagonal blade slashes, ripple springs, bounce overshoots, and fluid ink flows.',
      count: '8 Transitions',
      tag: 'Framer Physics',
      href: '/transition#dynamic',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-24">

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/50">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              v1.0.0
            </span>
            <span className="text-xs font-mono text-zinc-500">Core Architecture</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-medium tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.05] mb-8">
            Cinematic page transitions for Next.js & React.
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-12">
            GlideCN is a synchronized dual-frame transition engine. Zero layout shifts, 60fps GPU compositor acceleration, and copy-paste components.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-3 shadow-sm">
              <code className="text-sm font-mono text-zinc-800 dark:text-zinc-300">
                npx glidecn-cli init
              </code>
              <button
                type="button"
                onClick={() => handleCopy('npx glidecn-cli init', 'hero-init')}
                className="ml-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
              >
                {copiedCmd === 'hero-init' ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>

            <Link
              href="/transition"
              className="group flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Browse {readyTransitionsCount}+ Transitions
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL METRICS */}
      <section className="space-y-8">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Engine Benchmarks
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Designed for zero-friction integration and maximum compositor performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">

          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 flex flex-col justify-between group">
            <div className="space-y-6">
              <Zap className="size-6 text-zinc-400 dark:text-zinc-500" />
              <div>
                <div className="text-4xl md:text-5xl font-display font-medium text-zinc-900 dark:text-zinc-50 tracking-tight mb-2">
                  60 FPS
                </div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">GPU Compositor Lock</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Transitions animate strictly on GPU compositor layers (transform, opacity, clip-path) to ensure a 16.6ms frame budget.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 flex flex-col justify-between group">
            <div className="space-y-6">
              <ShieldCheck className="size-6 text-zinc-400 dark:text-zinc-500" />
              <div>
                <div className="text-4xl md:text-5xl font-display font-medium text-zinc-900 dark:text-zinc-50 tracking-tight mb-2">
                  0 CLS
                </div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Frozen Router Context</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Outgoing page context is frozen at navigation time. No premature re-renders or unmounting flashes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 flex flex-col justify-between group">
            <div className="space-y-6">
              <Sparkles className="size-6 text-zinc-400 dark:text-zinc-500" />
              <div>
                <div className="text-4xl md:text-5xl font-display font-medium text-zinc-900 dark:text-zinc-50 tracking-tight mb-2">
                  {TRANSITION_CATALOG.length}+
                </div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Production Transitions</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  From 3D cubes and origami folds to electron-beam CRT collapses and fluid ink diffusion.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 flex flex-col justify-between group">
            <div className="space-y-6">
              <Cpu className="size-6 text-zinc-400 dark:text-zinc-500" />
              <div>
                <div className="text-4xl md:text-5xl font-display font-medium text-zinc-900 dark:text-zinc-50 tracking-tight mb-2">
                  &lt;2.1kB
                </div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Core Engine Weight</div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Zero bloated runtime. Direct code ownership into your project directory via CLI.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DUAL-FRAME VISUALIZER */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              Dual-Frame Pipeline
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Watch how GlideCN orchestrates outgoing freeze snapshots and incoming mounts simultaneously.
            </p>
          </div>

          <button
            type="button"
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors shrink-0 ${isSimulating
                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 cursor-not-allowed'
                : 'bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
              }`}
          >
            {isSimulating ? (
              <>
                <RotateCcw className="size-4 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="size-4 fill-current" />
                Simulate Route Change
              </>
            )}
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#09090b] p-8 md:p-12 overflow-hidden">

          <div className="flex justify-between items-center mb-12 px-4 max-w-2xl mx-auto">
            {['Triggered', 'Frozen', 'Transition Active', 'Unmounted'].map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = simStep === stepNum;
              const isPast = simStep > stepNum;

              return (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className={`size-8 rounded-full flex items-center justify-center text-xs font-mono font-medium transition-colors ${isActive ? 'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 ring-4 ring-zinc-900/10 dark:ring-zinc-100/10' :
                      isPast ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400' :
                        'border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600'
                    }`}>
                    {stepNum}
                  </div>
                  <span className={`text-[11px] font-mono uppercase tracking-wider hidden sm:block ${isActive ? 'text-zinc-900 dark:text-zinc-100 font-bold' : 'text-zinc-400 dark:text-zinc-600'
                    }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative h-64 md:h-80 w-full flex items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-[#09090b]">

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fa5c4f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg flex items-center justify-center gap-4 sm:gap-8 p-4">

              {/* Frame A (Outgoing Route) */}
              <motion.div
                animate={{
                  scale: simStep === 2 ? 0.96 : simStep === 3 ? 0.88 : simStep === 4 ? 0.75 : 1,
                  opacity: simStep === 3 ? 0.4 : simStep === 4 ? 0 : 1,
                  x: simStep === 3 ? -30 : simStep === 4 ? -80 : 0,
                  rotateY: simStep === 3 ? -15 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-40 sm:w-48 h-40 sm:h-48 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-900/50 p-4 shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    Route: /feed
                  </span>
                  {simStep >= 2 && (
                    <span className="text-[9px] font-mono font-bold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                      FROZEN
                    </span>
                  )}
                </div>

                <div className="space-y-2 py-2">
                  <div className="h-2 w-16 bg-zinc-300 dark:bg-zinc-700/50 rounded" />
                  <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800/50 rounded" />
                  <div className="h-2 w-24 bg-zinc-200 dark:bg-zinc-800/50 rounded" />
                </div>

                <div className="text-[10px] font-mono text-zinc-500 text-center border-t border-zinc-200 dark:border-zinc-800 pt-1.5">
                  {simStep === 0 ? 'Active Route' : simStep === 2 ? 'Snapshot Locked' : simStep === 3 ? 'Exit Transition Active' : 'Unmounted'}
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
                  className={`size-10 rounded-2xl flex items-center justify-center shadow-lg transition-all ${isSimulating
                      ? 'bg-[#fa5c4f] text-white shadow-[#fa5c4f]/40 ring-4 ring-[#fa5c4f]/20'
                      : 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 text-zinc-400'
                    }`}
                >
                  <Sparkles className="size-5" />
                </motion.div>
                <span className="text-[9px] font-mono font-bold mt-1 text-zinc-500">
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
                className={`w-40 sm:w-48 h-40 sm:h-48 rounded-2xl border p-4 shadow-xl flex flex-col justify-between ${simStep >= 3
                    ? 'border-[#fa5c4f]/60 bg-white dark:bg-zinc-900 shadow-[#fa5c4f]/15'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#fa5c4f]/10 text-[#fa5c4f]">
                    Route: /profile
                  </span>
                  {simStep >= 3 && (
                    <span className="text-[9px] font-mono font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      ENTERING
                    </span>
                  )}
                </div>

                <div className="space-y-2 py-2">
                  <div className="h-2 w-20 bg-[#fa5c4f]/40 rounded" />
                  <div className="h-2 w-full bg-[#fa5c4f]/20 rounded" />
                  <div className="h-2 w-28 bg-[#fa5c4f]/20 rounded" />
                </div>

                <div className="text-[10px] font-mono text-zinc-500 text-center border-t border-zinc-200 dark:border-zinc-800 pt-1.5">
                  {simStep === 0 ? 'Awaiting Navigation' : simStep >= 3 ? 'Active & Mounted' : 'Mounting...'}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. CODE SHOWCASE */}
      <section className="space-y-8">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Zero-Config Quickstart
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pick your stack. Add the provider. Wrap your pages.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b] overflow-hidden">
          <div className="flex items-center gap-6 px-6 pt-4 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar">
            {['app-router', 'pages-router', 'vite', 'cli'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCodeTab(tab as any)}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeCodeTab === tab
                    ? 'border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
                  }`}
              >
                {tab === 'app-router' ? 'Next.js App' : tab === 'pages-router' ? 'Next.js Pages' : tab === 'vite' ? 'Vite' : 'CLI'}
              </button>
            ))}
          </div>

          <div className="w-full">            {activeCodeTab === 'app-router' && (
              <CodeBlock
                language="tsx"
                code={`// app/layout.tsx
import { GlideCNProvider, GlideCN } from '@/components/glidecn';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlideCNProvider defaultTransition="cube">
          <GlideCN>
            {children}
          </GlideCN>
        </GlideCNProvider>
      </body>
    </html>
  );
}

// app/page.tsx
import { Page } from '@/components/glidecn';

export default function Home() {
  return (
    <Page transition="circular-portal" duration={0.6}>
      <main>...</main>
    </Page>
  );
}`}
              />
            )}

            {activeCodeTab === 'pages-router' && (
              <CodeBlock
                language="tsx"
                code={`import { GlideCNProvider, GlideCN } from '@/components/glidecn';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlideCNProvider defaultTransition="fold">
      <GlideCN>
        <Component {...pageProps} />
      </GlideCN>
    </GlideCNProvider>
  );
}`}
              />
            )}

            {activeCodeTab === 'vite' && (
              <CodeBlock
                language="tsx"
                code={`import { GlideCNProvider, GlideCN, Page } from '@/components/glidecn';
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <GlideCNProvider defaultTransition="slash">
      <GlideCN>
        <Routes>
          <Route path="/" element={<Page transition="slide"><Home /></Page>} />
        </Routes>
      </GlideCN>
    </GlideCNProvider>
  );
}`}
              />
            )}

            {activeCodeTab === 'cli' && (
              <CodeBlock
                language="bash"
                code={`# 1. Initialize GlideCN in your Next.js / React project
npx glidecn-cli init

# 2. Add individual transitions on-demand (shadcn style)
npx glidecn-cli add cube
npx glidecn-cli add circular-portal
npx glidecn-cli add origami-unfold

# 3. Add all transitions at once
npx glidecn-cli add --all`}
              />
            )}
          </div>
        </div>
      </section>

      {/* 5. CATEGORIES BENTO */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              Transition Families
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Curated transition archetypes crafted for different aesthetic atmospheres.
            </p>
          </div>
          <Link
            href="/transition"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:opacity-70 transition-opacity shrink-0"
          >
            Explore {TRANSITION_CATALOG.length}+ Transitions
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {familyCards.map((fam) => (
            <Link
              key={fam.name}
              href={fam.href}
              className="group block p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#09090b] hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2.5 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 text-[11px] font-mono font-medium text-zinc-600 dark:text-zinc-400">
                  {fam.tag}
                </span>
                <span className="text-[11px] font-medium text-zinc-500">
                  {fam.count}
                </span>
              </div>
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                {fam.name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {fam.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
