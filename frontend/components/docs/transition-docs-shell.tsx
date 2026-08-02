'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Sparkles, Terminal, ChevronDown, ChevronUp, Layers3, MonitorPlay, WandSparkles, ArrowRight, Zap, Package, Gauge, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { defaultRegistry } from '@/components/morphy/core/registry';
import { buildVariants, buildTransition } from '@/components/morphy/core/animation-engine';
import { mergeConfig } from '@/components/morphy/core/utils';
import { DEFAULT_TRANSITION_CONFIG } from '@/components/morphy/constants';
import { MascotHint } from './mascot-hint';
import { getCatalogEntry, TRANSITION_CATALOG } from '@/lib/transition-catalog';
import type { TransitionCatalogEntry } from '@/lib/transition-catalog';

// Ensure transitions are registered
import '@/components/morphy/transitions/fade';
import '@/components/morphy/transitions/slide';
import '@/components/morphy/transitions/scale';
import '@/components/morphy/transitions/circular-portal';
import '@/components/morphy/transitions/page-curl';
import '@/components/morphy/transitions/cube';
import '@/components/morphy/transitions/slash';
import '@/components/morphy/transitions/wormhole';
import '@/components/morphy/transitions/ink-spread';
import '@/components/morphy/transitions/liquid-morph';
import '@/components/morphy/transitions/dissolve';
import '@/components/morphy/transitions/swipe';
import '@/components/morphy/transitions/flip';
import '@/components/morphy/transitions/spin';
import '@/components/morphy/transitions/zoom';
import '@/components/morphy/transitions/bounce';
import '@/components/morphy/transitions/wobble';
import '@/components/morphy/transitions/stretch';
import '@/components/morphy/transitions/squeeze';
import '@/components/morphy/transitions/ripple';
import '@/components/morphy/transitions/glass';
import '@/components/morphy/transitions/ghost';
import '@/components/morphy/transitions/shadow';
import '@/components/morphy/transitions/neon';
import '@/components/morphy/transitions/glitch';
import '@/components/morphy/transitions/fold';
import '@/components/morphy/transitions/wave';
import '@/components/morphy/transitions/pixel';
import '@/components/morphy/transitions/mirror';
import '@/components/morphy/transitions/vortex';
import '@/components/morphy/transitions/tv-turn-off';
import '@/components/morphy/transitions/shutter-iris';
import '@/components/morphy/transitions/origami-unfold';
interface TooltipProps {
  label: string;
  children: React.ReactNode;
}
function Tooltip({ label, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span role="tooltip" className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-800 dark:text-zinc-200 shadow-xl">
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-zinc-200 dark:border-b-zinc-700" />
          {label}
        </span>
      )}
    </span>
  );
}

function InstallBlock({ slug }: { slug: string }) {
  const [pm, setPm] = useState<'npx' | 'pnpm' | 'yarn' | 'bun'>('npx');
  const [copied, setCopied] = useState(false);
  const PM_LABELS = { npx: 'npx', pnpm: 'pnpm dlx', yarn: 'yarn dlx', bun: 'bunx' };
  const command = `${PM_LABELS[pm]} morphy-cli add ${slug}`;

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0d13]">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Terminal className="size-3.5 text-brand-500 shrink-0" />
          <span className="font-medium text-zinc-700 dark:text-zinc-300">Install via CLI</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/50 p-0.5">
          {(Object.keys(PM_LABELS) as Array<keyof typeof PM_LABELS>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPm(key)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${pm === key ? 'bg-brand-500 text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-[#07090f] px-4 py-3">
        <span className="select-none text-zinc-400 dark:text-zinc-600 text-sm font-mono">$</span>
        <code className="flex-1 font-mono text-sm text-brand-500 dark:text-brand-300">{command}</code>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {copied ? <><Check className="size-3 text-emerald-500" /> Copied</> : <><Copy className="size-3" /> Copy</>}
        </button>
      </div>
    </div>
  );
}

function FileBlock({ filename, source, defaultOpen = false, badge }: { filename: string; source: string; defaultOpen?: boolean; badge?: string; }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-b-0">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex flex-1 items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded p-1">
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="size-3.5 shrink-0 text-zinc-400" />
          </motion.span>
          <span className="rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/70 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-300">{filename}</span>
          {badge && <span className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">{badge}</span>}
        </button>
        <button type="button" onClick={copy} className="flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          {copied ? <><Check className="size-3 text-emerald-500" /> Copied</> : <><Copy className="size-3" /> Copy</>}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="max-h-[40vh] overflow-auto border-t border-zinc-100 dark:border-zinc-800/60 p-4 text-sm font-mono whitespace-pre-wrap text-zinc-600 dark:text-zinc-300">
              {source}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


interface ShowcasePageProps {
  transition: string;
  tagline: string;
}

export function TransitionDocsShell({ transition, tagline }: ShowcasePageProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');
  const [activePage, setActivePage] = useState<'A' | 'B'>('A');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const definition = defaultRegistry.get(transition);
  const resolvedConfig = mergeConfig(definition?.defaultConfig ?? {}, DEFAULT_TRANSITION_CONFIG);
  const variants = definition ? buildVariants(definition, resolvedConfig, false) : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const motionTransition = definition ? buildTransition(definition, resolvedConfig, false) : { duration: 0.4 };

  // Get catalog entry for rich data
  const catalog = getCatalogEntry(transition);

  const handleTabClick = (page: 'A' | 'B') => {
    if (isAnimating || activePage === page) return;
    setIsAnimating(true);
    setActivePage(page);
  };

  const aiPrompt = `Implement the ${transition} transition using morphy...\n(Mock AI Prompt for Showcase)`;
  const mockCode = `// Mock Source Code for ${transition}.tsx\nimport { motion } from 'framer-motion';\n\nexport default function Transition() {\n  return null;\n}`;

  async function copyToClipboard(text: string, type: 'prompt' | 'all') {
    if (typeof navigator === 'undefined') return;
    await navigator.clipboard.writeText(text);
    if (type === 'prompt') { setCopiedPrompt(true); setTimeout(() => setCopiedPrompt(false), 1600); }
    else { setCopiedAll(true); setTimeout(() => setCopiedAll(false), 1600); }
  }

  const relatedTransitions = TRANSITION_CATALOG
    .filter((t) => t.slug !== transition)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#101014] p-2.5 sm:p-3 lg:p-4 shadow-sm">
        {/* Header */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[radial-gradient(circle_at_top_left,rgba(250,92,79,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 sm:p-5 lg:p-6 mb-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl flex items-center gap-3">
              {catalog && <span className="text-3xl">{catalog.emoji}</span>}
              {definition?.metadata.displayName}
            </h1>
            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              {catalog?.longDescription ?? tagline}
            </p>
          </div>
        </div>

        {/* Preview / Code panel */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/20 shadow-[0_0_80px_rgba(250,92,79,0.05)] dark:shadow-[0_0_80px_rgba(250,92,79,0.12)]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3 text-[11px] uppercase tracking-[0.32em] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span>Preview canvas</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/40 p-1">
              <button type="button" onClick={() => setActiveTab('demo')} className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${activeTab === 'demo' ? 'bg-brand-500 text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}>Preview</button>
              <button type="button" onClick={() => setActiveTab('code')} className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${activeTab === 'code' ? 'bg-brand-500 text-white shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}>Code</button>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip label={copiedPrompt ? 'Copied!' : 'Copy AI prompt'}>
                <button type="button" onClick={() => copyToClipboard(aiPrompt, 'prompt')} className="rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 text-zinc-500 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="Copy AI prompt">
                  {copiedPrompt ? <Check className="size-4 text-brand-500" /> : <Sparkles className="size-4" />}
                </button>
              </Tooltip>
              <Tooltip label={copiedAll ? 'Copied!' : 'Copy all files'}>
                <button type="button" onClick={() => copyToClipboard(mockCode, 'all')} className="rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 text-zinc-500 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" aria-label="Copy all source files">
                  {copiedAll ? <Check className="size-4 text-brand-500" /> : <Copy className="size-4" />}
                </button>
              </Tooltip>
            </div>
          </div>

          {/* PREVIEW TAB */}
          {activeTab === 'demo' && (
            <div className="p-4">
              <div className="flex flex-col items-center text-center mb-8">
                <MascotHint text={tagline} pose="waiting" />
                <div className="flex gap-4 p-1 mt-6 bg-zinc-100 dark:bg-zinc-800/50 rounded-full">
                  <button onClick={() => handleTabClick('A')} disabled={isAnimating} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${activePage === 'A' ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}>
                    Page A
                  </button>
                  <button onClick={() => handleTabClick('B')} disabled={isAnimating} className={`px-6 py-2 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${activePage === 'B' ? 'bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}>
                    Page B
                  </button>
                </div>
              </div>

              <div className="relative h-[600px] w-full max-w-5xl mx-auto overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-50 dark:bg-zinc-950">
                <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
                  {activePage === 'A' ? (
                    <motion.div key="page-a" initial={variants.initial as any} animate={variants.animate as any} exit={variants.exit as any} transition={motionTransition as any} className="absolute inset-0 bg-white dark:bg-zinc-900 overflow-y-auto">
                      <PageAContent />
                    </motion.div>
                  ) : (
                    <motion.div key="page-b" initial={variants.initial as any} animate={variants.animate as any} exit={variants.exit as any} transition={motionTransition as any} className="absolute inset-0 bg-brand-50 dark:bg-brand-950/20 overflow-y-auto">
                      <PageBContent />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-white backdrop-blur-md shadow-lg z-10 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                  {definition?.metadata.displayName ?? transition} · {resolvedConfig.duration}s
                </div>
              </div>
            </div>
          )}

          {/* CODE TAB */}
          {activeTab === 'code' && (
            <div className="bg-zinc-50 dark:bg-[#0d1117]">
              <InstallBlock slug={transition} />
              
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="font-medium text-zinc-700 dark:text-zinc-400">1 file</span>
                  <span className="text-zinc-400 dark:text-zinc-700">·</span>
                  <span>Click filename to expand</span>
                </div>
                <button type="button" onClick={() => copyToClipboard(mockCode, 'all')} className="flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                  {copiedAll ? <><Check className="size-3 text-emerald-500" /> Copied</> : <><Copy className="size-3" /> Copy all</>}
                </button>
              </div>

              <FileBlock filename={`components/morphy/transitions/${transition}.tsx`} source={mockCode} defaultOpen badge="transition" />
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
       *  SHOWCASE OVERVIEW — Replaces old generic description section
       * ═══════════════════════════════════════════════════════════════════ */}

      {catalog && (
        <>
          {/* Why It's Special — Hero Callout */}
          <section className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-50 to-white dark:from-brand-950/30 dark:to-zinc-950 p-6 sm:p-8 shadow-sm">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand-500 mb-4">
                <Sparkles className="size-5" />
                <span className="text-sm font-bold uppercase tracking-[0.2em]">Why it&apos;s special</span>
              </div>
              <p className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white leading-relaxed max-w-3xl">
                {catalog.whySpecial}
              </p>
            </div>
          </section>

          {/* Metrics Bento Grid */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm hover:border-emerald-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center mb-4 ring-1 ring-emerald-500/20">
                  <Zap className="size-5" />
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white">{catalog.metrics.fps} FPS</div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">GPU-accelerated performance</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm hover:border-blue-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center mb-4 ring-1 ring-blue-500/20">
                  <Package className="size-5" />
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white">{catalog.metrics.bundleSize}</div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Gzipped bundle size</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm hover:border-amber-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center mb-4 ring-1 ring-amber-500/20">
                  <Gauge className="size-5" />
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white">{catalog.metrics.complexity}</div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Implementation complexity</p>
              </div>
            </div>
          </div>

          {/* Best For + Use Cases */}
          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Ideal use cases</h2>
              <div className="space-y-3">
                {catalog.useCases.map((useCase, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-zinc-100 dark:border-white/10 bg-zinc-50 dark:bg-black/20 p-4">
                    <span className="mt-0.5 w-6 h-6 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</span>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{useCase}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="space-y-6">
              {/* Best For Tags */}
              <section className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Best for</h2>
                <div className="flex flex-wrap gap-2">
                  {catalog.bestFor.map((tag) => (
                    <span key={tag} className="rounded-full border border-brand-500/20 bg-brand-500/5 dark:bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* Features Checklist */}
              <section className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="size-5 text-emerald-500" />
                  What it provides
                </h2>
                <div className="space-y-2">
                  {catalog.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                      <Check className="size-4 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </>
      )}

      {/* AI Prompt + Related */}
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-brand-500">
            <Sparkles className="size-4" />
            <h2 className="text-lg font-semibold">AI prompt</h2>
          </div>
          <p className="mt-3 text-xs leading-6 text-zinc-500">Copies a complete prompt with files plus CLI install command — ready to paste into any AI assistant.</p>
          <button type="button" onClick={() => copyToClipboard(aiPrompt, 'prompt')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black/20 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            {copiedPrompt ? <><Check className="size-4 text-brand-500" /> Copied to clipboard</> : <><Copy className="size-4" /> Copy full prompt + code</>}
          </button>
        </section>

        <section className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Related transitions</h2>
          </div>
          <div className="mt-4 space-y-3">
            {relatedTransitions.map((item) => (
              <Link key={item.slug} href={`/docs/transitions/${item.slug}`} className="flex items-center justify-between rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black/20 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                <span className="flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span>{item.displayName}</span>
                </span>
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function PageAContent() {
  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-zinc-950 font-sans selection:bg-brand-500/30">
      {/* Section 1: Hero */}
      <div className="relative flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 dark:bg-brand-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center mb-8 shadow-xl shadow-brand-500/20 ring-4 ring-brand-50 dark:ring-brand-500/10">
          <Sparkles className="w-8 h-8" />
        </div>
        
        <h2 className="relative z-10 text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
          Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400">Interactions</span>
        </h2>
        
        <p className="relative z-10 text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-10 leading-relaxed">
          Experience seamless, cinematic transitions between your application states. Elevate your user experience to the next level.
        </p>

        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <button type="button" className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-medium transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5">
            Get Started
          </button>
          <button type="button" className="px-6 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-medium transition-all border border-zinc-200 dark:border-zinc-800">
            Learn More
          </button>
        </div>
      </div>

      {/* Section 2: Bento Features */}
      <div className="flex-1 flex flex-col items-center p-6 sm:p-12 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">Core Features</h3>
            <span className="text-sm font-semibold text-brand-500 hover:text-brand-600 cursor-pointer transition-colors">View all &rarr;</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-8 hover:border-brand-500/30 dark:hover:border-brand-500/30 transition-colors shadow-sm hover:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center mb-6 ring-1 ring-blue-500/20">
                  <span className="text-xl">⚡️</span>
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Lightning Fast</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                  Optimized for 60fps animations. Say goodbye to janky transitions and hello to buttery smooth frame rates across all devices.
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-8 hover:border-brand-500/30 dark:hover:border-brand-500/30 transition-colors shadow-sm hover:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20">
                  <span className="text-xl">🎨</span>
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Customizable</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Tweak easings, durations, and motion variants easily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageBContent() {
  return (
    <div className="flex flex-col min-h-full bg-zinc-50 dark:bg-[#09090b] font-sans selection:bg-indigo-500/30">
      {/* Section 1: Profile / Header */}
      <div className="relative flex flex-col items-center justify-center px-6 py-20 text-center border-b border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-widest font-semibold mb-6 ring-1 ring-indigo-500/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Active Session
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Makers</span>
          </h2>
          
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            We are a collective of designers and engineers dedicated to crafting the future of web interactions.
          </p>
        </div>
      </div>

      {/* Section 2: Team Members Grid */}
      <div className="flex-1 flex flex-col items-center p-6 sm:p-12 bg-white dark:bg-zinc-950/50">
        <div className="w-full max-w-4xl">
          <div className="flex items-center justify-center mb-12">
            <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 tracking-[0.2em] uppercase">Core Team</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { name: 'Sarah Drasner', role: 'Design Engineering', color: 'from-pink-500 to-rose-500' },
              { name: 'Lee Robinson', role: 'Product Architecture', color: 'from-indigo-500 to-blue-500' },
              { name: 'Paco Coursey', role: 'Motion & Interactions', color: 'from-amber-500 to-orange-500' }
            ].map((member, i) => (
              <div key={i} className="group relative flex flex-col items-center text-center">
                <div className="relative w-28 h-28 mb-5">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${member.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className={`relative w-full h-full rounded-full bg-gradient-to-tr ${member.color} p-[3px] shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center border-4 border-white dark:border-zinc-950 overflow-hidden relative">
                      <div className={`absolute inset-0 bg-gradient-to-tr ${member.color} opacity-10`} />
                      <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr ${member.color}`}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  {member.name}
                </h4>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
