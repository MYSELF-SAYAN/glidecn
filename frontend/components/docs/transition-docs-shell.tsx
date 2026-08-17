'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Copy,
  Terminal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Lock,
  ArrowLeft,
  ArrowRight,
  Zap,
  Code2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { defaultRegistry } from '@/components/glidecn/core/registry';
import { buildVariants, buildTransition } from '@/components/glidecn/core/animation-engine';
import { mergeConfig } from '@/components/glidecn/core/utils';
import { DEFAULT_TRANSITION_CONFIG } from '@/components/glidecn/constants';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

// Ensure all transitions are registered
import '@/components/glidecn/transitions';
import { getCatalogEntry, TRANSITION_CATALOG } from '@/lib/transition-catalog';
import { copyToClipboard } from '@/lib/copy-to-clipboard';

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
        <span
          role="tooltip"
          className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#1a1a1a] px-2.5 py-1.5 text-[10px] uppercase font-bold tracking-[0.1em] text-white shadow-xl"
        >
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
  const command = `${PM_LABELS[pm]} glidecn-cli add ${slug}`;

  async function copy() {
    await copyToClipboard(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="border-b border-white/5 bg-[#0a0a0a]">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Terminal className="size-3.5 text-[#fa5c4f] shrink-0" />
          <span className="font-bold uppercase tracking-widest text-[10px]">Install via CLI</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5">
          {(Object.keys(PM_LABELS) as Array<keyof typeof PM_LABELS>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPm(key)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest transition ${pm === key ? 'bg-[#fa5c4f] text-white' : 'text-white/40 hover:text-white'}`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-white/5 bg-black/40 px-4 py-3">
        <span className="select-none text-white/30 text-sm font-mono">$</span>
        <code className="flex-1 font-mono text-sm text-[#fa5c4f]">{command}</code>
        <button
          type="button"
          onClick={copy}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 transition hover:bg-white/10 hover:text-white"
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
    await copyToClipboard(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="border-b border-white/5 bg-[#0a0a0a]">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex flex-1 items-center gap-2.5 text-left p-1">
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="size-3.5 shrink-0 text-white/40" />
          </motion.span>
          <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/70">{filename}</span>
          {badge && <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">{badge}</span>}
        </button>
        <button type="button" onClick={copy} className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 transition hover:bg-white/10 hover:text-white">
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
            <div className="border-t border-white/5 bg-black/40 w-full overflow-hidden [&>div]:!m-0 [&>div]:!border-0 [&>div]:!rounded-none [&>div]:!bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-4">
              <DynamicCodeBlock lang="tsx" code={source} />
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
  sourceCode?: string;
}

export function TransitionDocsShell({ transition, tagline, sourceCode }: ShowcasePageProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'code'>('demo');
  const [activePage, setActivePage] = useState<'A' | 'B'>('A');
  const [isAnimating, setIsAnimating] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const definition = defaultRegistry.get(transition);
  const resolvedConfig = mergeConfig(definition?.defaultConfig ?? {}, DEFAULT_TRANSITION_CONFIG);
  const variants = definition ? buildVariants(definition, resolvedConfig, false) : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const motionTransition = definition ? buildTransition(definition, resolvedConfig, false) : { duration: 0.4 };

  const catalog = getCatalogEntry(transition);

  const handleTabClick = (page: 'A' | 'B') => {
    if (isAnimating || activePage === page) return;
    setIsAnimating(true);
    setActivePage(page);
  };

  const handleReplay = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActivePage((prev) => (prev === 'A' ? 'B' : 'A'));
  };

  const codeToDisplay = sourceCode || `// Source Code for ${transition}.tsx\nimport { motion } from 'framer-motion';\n\nexport default function Transition() {\n  return null;\n}`;

  async function handleCopy(text: string, type: 'all' | 'cli') {
    if (typeof navigator === 'undefined') return;
    await copyToClipboard(text);
    if (type === 'cli') {
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 1600);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1600);
    }
  }

  const relatedTransitions = TRANSITION_CATALOG
    .filter((t) => t.slug !== transition)
    .slice(0, 3);

  const cliCommand = `npx glidecn-cli add ${transition}`;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* COMPACT TOP HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
        <div className="space-y-1">
          {/* Breadcrumb / Category Tag */}
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <Link
              href="/transition"
              className="hover:text-[#fa5c4f] transition-colors flex items-center gap-1 text-[var(--text-muted)]"
            >
              <ArrowLeft className="size-3" />
              <span>Transitions</span>
            </Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-semibold">{definition?.metadata.displayName}</span>
            {catalog?.category && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] text-[9px] uppercase font-mono tracking-widest text-[#fa5c4f]">
                {catalog.category}
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-[var(--text-main)]">
              {definition?.metadata.displayName}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light">
              {catalog?.description ?? tagline}
            </p>
          </div>
        </div>

        {/* Quick CLI Copy Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleCopy(cliCommand, 'cli')}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] px-3.5 py-1.5 text-xs font-mono text-[var(--text-main)] transition hover:border-[#fa5c4f]/40 group shadow-sm cursor-pointer"
            title="Click to copy CLI command"
          >
            <Terminal className="size-3 text-[#fa5c4f]" />
            <span className="text-[11px] text-[var(--text-muted)] group-hover:text-[var(--text-main)]">{cliCommand}</span>
            {copiedCli ? (
              <Check className="size-3 text-emerald-500" />
            ) : (
              <Copy className="size-3 text-[var(--text-subtle)] group-hover:text-[var(--text-main)]" />
            )}
          </button>
        </div>
      </div>

      {/* DEMO / CODE PLAYER */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] shadow-2xl ring-1 ring-white/5">

        {/* Mini Browser Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-2.5 relative z-20">
          
          {/* Left: Mac Window Controls & Route Navigation Arrows */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="size-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10" />
              <div className="size-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10" />
              <div className="size-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10" />
            </div>

            {/* Back / Forward / Replay controls */}
            <div className="flex items-center gap-1 ml-1 sm:ml-2 border-l border-white/10 pl-2 sm:pl-3 text-white/50">
              <button
                type="button"
                onClick={() => handleTabClick('A')}
                disabled={isAnimating || activePage === 'A'}
                aria-label="Previous Page"
                title="Go to Page 1"
                className="p-1 rounded-md hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent transition cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleTabClick('B')}
                disabled={isAnimating || activePage === 'B'}
                aria-label="Next Page"
                title="Go to Page 2"
                className="p-1 rounded-md hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent transition cursor-pointer"
              >
                <ChevronRight className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleReplay}
                disabled={isAnimating}
                aria-label="Replay Transition"
                title="Toggle & replay transition"
                className="p-1 rounded-md hover:bg-white/10 hover:text-white transition cursor-pointer ml-0.5"
              >
                <RotateCcw className={`size-3.5 ${isAnimating ? 'animate-spin text-[#fa5c4f]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Center: Simulated Address Bar */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-white/60 min-w-[280px] justify-center shadow-inner">
            <Lock className="size-3 text-emerald-400/80 shrink-0" />
            <span className="text-white/40">https://</span>
            <span className="text-white/80">glidecn.vercel.app</span>
            <span className="text-[#fa5c4f]">/{activePage === 'A' ? 'works' : 'article'}</span>
          </div>

          {/* Right: Tab Switcher (Preview / Code) & Copy Source */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-black/50 p-1 ring-1 ring-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                className={`rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest transition cursor-pointer ${
                  activeTab === 'demo'
                    ? 'bg-[#fa5c4f] text-white shadow-md'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest transition cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-[#fa5c4f] text-white shadow-md'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Code
              </button>
            </div>

            <Tooltip label={copiedAll ? 'Copied Source!' : 'Copy Source Code'}>
              <button
                type="button"
                onClick={() => handleCopy(codeToDisplay, 'all')}
                className="rounded-full bg-white/5 border border-white/10 p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white cursor-pointer"
              >
                {copiedAll ? <Check className="size-3.5 text-[#fa5c4f]" /> : <Code2 className="size-3.5" />}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* DEMO CONTENT */}
        {activeTab === 'demo' && (
          <div className="relative bg-[#0d0d0d]">
            {/* Floating Route Navigator Pill */}
            <div className="absolute top-4 inset-x-0 flex justify-center z-30 pointer-events-none">
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 pointer-events-auto shadow-2xl">
                <button
                  onClick={() => handleTabClick('A')}
                  disabled={isAnimating}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activePage === 'A'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${activePage === 'A' ? 'bg-[#fa5c4f]' : 'bg-white/40'}`} />
                  <span>01 Works</span>
                </button>
                <button
                  onClick={() => handleTabClick('B')}
                  disabled={isAnimating}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activePage === 'B'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${activePage === 'B' ? 'bg-[#fa5c4f]' : 'bg-white/40'}`} />
                  <span>02 Article</span>
                </button>
                <button
                  onClick={handleReplay}
                  disabled={isAnimating}
                  title="Toggle & replay transition"
                  className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <RotateCcw className={`size-3 ${isAnimating ? 'animate-spin text-[#fa5c4f]' : ''}`} />
                </button>
              </div>
            </div>

            {/* Viewport Canvas (height calibrated for above-the-fold visibility) */}
            <div className="relative h-[480px] sm:h-[520px] md:h-[540px] w-full overflow-hidden">
              <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
                {activePage === 'A' ? (
                  <motion.div
                    key="page-a"
                    initial={variants.initial as any}
                    animate={variants.animate as any}
                    exit={variants.exit as any}
                    transition={motionTransition as any}
                    className="absolute inset-0 bg-[#0d0d0d]"
                  >
                    <PageAContent onNavigate={() => handleTabClick('B')} isAnimating={isAnimating} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="page-b"
                    initial={variants.initial as any}
                    animate={variants.animate as any}
                    exit={variants.exit as any}
                    transition={motionTransition as any}
                    className="absolute inset-0 bg-[#f4f4f0]"
                  >
                    <PageBContent onNavigate={() => handleTabClick('A')} isAnimating={isAnimating} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* CODE CONTENT */}
        {activeTab === 'code' && (
          <div className="bg-[#050505] min-h-[480px] sm:min-h-[520px]">
            <InstallBlock slug={transition} />
            <FileBlock
              filename={`components/glidecn/transitions/${transition}.tsx`}
              source={codeToDisplay}
              defaultOpen
              badge="source"
            />
          </div>
        )}
      </section>

      {/* DETAILED OVERVIEW (BELOW DEMO) */}
      {catalog?.longDescription && (
        <section className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-sm">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
          <div className="relative z-10 space-y-2">
            <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)]">
              Transition Overview
            </h2>
            <p className="text-sm sm:text-base font-light text-[var(--text-main)] leading-relaxed max-w-3xl">
              {catalog.longDescription}
            </p>
          </div>
        </section>
      )}

      {/* METRICS & SPECS BENTO */}
      {catalog && (
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Left: Metrics Bento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xl group hover:border-[#fa5c4f]/40 transition-colors">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-10 h-10 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] flex items-center justify-center border border-[#fa5c4f]/20 mb-6">
                  <Zap className="size-4" />
                </div>
                <div>
                  <div className="text-5xl sm:text-6xl font-light font-display text-[var(--text-main)] tracking-tighter">
                    {catalog.metrics.fps} <span className="text-2xl text-[var(--text-muted)]">FPS</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">
                    GPU-Accelerated Compositing
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-xl group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-2xl sm:text-3xl font-light font-display text-[var(--text-main)] mb-1">
                  {catalog.metrics.bundleSize}
                </div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
                  Gzipped Size
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-xl group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-2xl sm:text-3xl font-light font-display text-[var(--text-main)] mb-1">
                  {catalog.metrics.complexity}
                </div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">
                  Complexity
                </p>
              </div>
            </div>
          </div>

          {/* Right: Info & Best For */}
          <div className="flex flex-col gap-4">
            <section className="flex-1 relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 space-y-5">
                <h2 className="text-lg font-light tracking-tight text-[var(--text-main)] font-display">
                  Ideal Use Cases
                </h2>
                <div className="space-y-3">
                  {catalog.useCases.map((useCase, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-[#fa5c4f] font-mono text-xs mt-0.5">0{i + 1}</span>
                      <p className="text-xs sm:text-sm font-light text-[var(--text-muted)] leading-relaxed">
                        {useCase}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10">
                <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3">
                  Best For
                </h2>
                <div className="flex flex-wrap gap-2">
                  {catalog.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-white/10 bg-black/20 text-xs font-mono text-[var(--text-main)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

        </div>
      )}

      {/* FOOTER RELATED */}
      <section className="pt-6 sm:pt-8">
        <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-4 text-center">
          Related Transitions
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {relatedTransitions.map((item) => (
            <Link
              key={item.slug}
              href={`/transition/${item.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 shadow-md hover:border-[#fa5c4f]/40 transition-colors"
            >
              <div className="flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-3">
                  <span className="font-light text-[var(--text-main)] tracking-tight">{item.displayName}</span>
                </div>
                <ArrowRight className="size-4 text-[var(--text-muted)] group-hover:text-[#fa5c4f] transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGH-END EDITORIAL PAGES FOR CINEMATIC DEMOS
// ─────────────────────────────────────────────────────────────────────────────

interface PageContentProps {
  onNavigate: () => void;
  isAnimating: boolean;
}

function PageAContent({ onNavigate, isAnimating }: PageContentProps) {
  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] text-white font-sans select-none">
      <div className="relative flex-1 flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-35 mix-blend-luminosity saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />

        {/* Top subtle bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">
          <span>Studio 01 / Works</span>
          <span className="hidden sm:inline">2026 Archive</span>
        </div>

        {/* Bottom Hero & CTA */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-start space-y-4">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/60 border border-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
            Featured Case Study
          </span>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tighter leading-[0.95] font-display">
            Monolith &<br />
            <span className="italic font-cursive text-white/70">Shadow Form.</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-md font-light leading-relaxed">
            Exploring the intersection of raw concrete, exposed geometry, and digital minimalism.
          </p>

          <button
            type="button"
            onClick={onNavigate}
            disabled={isAnimating}
            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#fa5c4f] hover:text-white transition-all shadow-xl cursor-pointer hover:gap-3"
          >
            <span>Read Article</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PageBContent({ onNavigate, isAnimating }: PageContentProps) {
  return (
    <div className="flex flex-col h-full bg-[#f4f4f0] text-[#1a1a1a] font-sans select-none">
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
        {/* Top subtle bar */}
        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-[0.2em] text-black/50 border-b border-black/10 pb-3">
          <span>Journal / Essay</span>
          <span>5 Min Read</span>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-3xl my-auto space-y-4 pt-2">
          <h2 className="text-3xl sm:text-5xl font-light tracking-tighter leading-[1] font-display">
            Form follows<br />function.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div className="aspect-[16/9] sm:aspect-[4/3] bg-black/5 rounded-xl overflow-hidden relative shadow-lg ring-1 ring-black/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-85 mix-blend-multiply" />
            </div>
            <div className="space-y-3">
              <p className="text-xs sm:text-sm leading-relaxed font-light text-black/70">
                Stripping away superfluous ornamentation leaves us with the raw essence of interface choreography.
              </p>
              <button
                type="button"
                onClick={onNavigate}
                disabled={isAnimating}
                className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#fa5c4f] transition-all shadow-xl cursor-pointer hover:gap-3"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back to Works</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom subtle bar */}
        <div className="text-[10px] font-mono text-black/40 pt-2 border-t border-black/10 flex justify-between">
          <span>Published by Marcus Aris</span>
          <span>GlideCN Motion Engine</span>
        </div>
      </div>
    </div>
  );
}

