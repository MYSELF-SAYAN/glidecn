'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Sparkles, Terminal, ChevronDown, ChevronUp, Layers3, MonitorPlay, WandSparkles, ArrowRight, Zap, Package, Gauge, ShieldCheck, Code2 } from 'lucide-react';
import Link from 'next/link';
import { defaultRegistry } from '@/components/glidecn/core/registry';
import { buildVariants, buildTransition } from '@/components/glidecn/core/animation-engine';
import { mergeConfig } from '@/components/glidecn/core/utils';
import { DEFAULT_TRANSITION_CONFIG } from '@/components/glidecn/constants';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

// Ensure all transitions are registered
import '@/components/glidecn/transitions';
import { getCatalogEntry, TRANSITION_CATALOG } from '@/lib/transition-catalog';
import type { TransitionCatalogEntry } from '@/lib/transition-catalog';

// Ensure transitions are registered

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
        <span role="tooltip" className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#1a1a1a] px-2.5 py-1.5 text-[10px] uppercase font-bold tracking-[0.1em] text-white shadow-xl">
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
    await navigator.clipboard.writeText(command);
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
    await navigator.clipboard.writeText(source);
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
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

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

  const aiPrompt = `Implement the ${transition} transition using glidecn...\n(Mock AI Prompt for Showcase)`;
  const codeToDisplay = sourceCode || `// Mock Source Code for ${transition}.tsx\nimport { motion } from 'framer-motion';\n\nexport default function Transition() {\n  return null;\n}`;

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
    <div className="space-y-12">

      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 sm:p-12 shadow-2xl group">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#fa5c4f]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          {catalog && (
            <div className="text-6xl sm:text-7xl p-6 rounded-3xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-xl mb-2">
              {catalog.emoji}
            </div>
          )}
          <h1 className="text-5xl sm:text-7xl font-light tracking-tighter text-[var(--text-main)] font-display">
            {definition?.metadata.displayName}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-muted)] font-light leading-relaxed max-w-2xl">
            {catalog?.longDescription ?? tagline}
          </p>
        </div>
      </div>

      {/* DEMO / CODE PLAYER */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] shadow-2xl ring-1 ring-white/5">

        {/* Mac-style Window Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-3 relative z-20">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10" />
            <div className="size-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10" />
            <div className="size-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10" />
            <span className="ml-3 font-mono text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">{transition}.preview</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 rounded-full bg-black/50 p-1 ring-1 ring-white/10">
            <button type="button" onClick={() => setActiveTab('demo')} className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${activeTab === 'demo' ? 'bg-[#fa5c4f] text-white shadow-md' : 'text-white/40 hover:text-white'}`}>Preview</button>
            <button type="button" onClick={() => setActiveTab('code')} className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition ${activeTab === 'code' ? 'bg-[#fa5c4f] text-white shadow-md' : 'text-white/40 hover:text-white'}`}>Code</button>
          </div>

          <div className="flex items-center gap-2">
            <Tooltip label={copiedPrompt ? 'Copied!' : 'Copy AI Prompt'}>
              <button type="button" onClick={() => copyToClipboard(aiPrompt, 'prompt')} className="rounded-full bg-white/5 border border-white/10 p-2 text-white/50 transition hover:bg-white/10 hover:text-white">
                {copiedPrompt ? <Check className="size-3.5 text-[#fa5c4f]" /> : <WandSparkles className="size-3.5" />}
              </button>
            </Tooltip>
            <Tooltip label={copiedAll ? 'Copied!' : 'Copy Source'}>
              <button type="button" onClick={() => copyToClipboard(codeToDisplay, 'all')} className="rounded-full bg-white/5 border border-white/10 p-2 text-white/50 transition hover:bg-white/10 hover:text-white">
                {copiedAll ? <Check className="size-3.5 text-[#fa5c4f]" /> : <Code2 className="size-3.5" />}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* DEMO CONTENT */}
        {activeTab === 'demo' && (
          <div className="relative bg-[#0d0d0d]">
            {/* Page Triggers overlay */}
            <div className="absolute top-6 inset-x-0 flex justify-center z-50 pointer-events-none">
              <div className="flex gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 pointer-events-auto shadow-2xl">
                <button onClick={() => handleTabClick('A')} disabled={isAnimating} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activePage === 'A' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>
                  View Issue 04
                </button>
                <button onClick={() => handleTabClick('B')} disabled={isAnimating} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activePage === 'B' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>
                  Read Article
                </button>
              </div>
            </div>

            <div className="relative h-[650px] w-full overflow-hidden">
              <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
                {activePage === 'A' ? (
                  <motion.div key="page-a" initial={variants.initial as any} animate={variants.animate as any} exit={variants.exit as any} transition={motionTransition as any} className="absolute inset-0 bg-[#0d0d0d]">
                    <PageAContent />
                  </motion.div>
                ) : (
                  <motion.div key="page-b" initial={variants.initial as any} animate={variants.animate as any} exit={variants.exit as any} transition={motionTransition as any} className="absolute inset-0 bg-[#f4f4f0]">
                    <PageBContent />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* CODE CONTENT */}
        {activeTab === 'code' && (
          <div className="bg-[#050505] min-h-[650px]">
            <InstallBlock slug={transition} />
            <FileBlock filename={`components/glidecn/transitions/${transition}.tsx`} source={codeToDisplay} defaultOpen badge="source" />
          </div>
        )}
      </section>

      {/* METRICS & DETAILS */}
      {catalog && (
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Left: Metrics Bento */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 shadow-xl group hover:border-[#fa5c4f]/40 transition-colors">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-12 h-12 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] flex items-center justify-center border border-[#fa5c4f]/20 mb-8">
                  <Zap className="size-5" />
                </div>
                <div>
                  <div className="text-6xl font-light font-display text-[var(--text-main)] tracking-tighter">{catalog.metrics.fps} <span className="text-3xl text-[var(--text-muted)]">FPS</span></div>
                  <p className="mt-2 text-sm text-[var(--text-muted)] uppercase tracking-widest font-bold">GPU-Accelerated Compositing</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-xl group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-3xl font-light font-display text-[var(--text-main)] mb-1">{catalog.metrics.bundleSize}</div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Gzipped Size</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-xl group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-3xl font-light font-display text-[var(--text-main)] mb-1">{catalog.metrics.complexity}</div>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Complexity</p>
              </div>
            </div>
          </div>

          {/* Right: Info & Best For */}
          <div className="flex flex-col gap-4">
            <section className="flex-1 relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 shadow-xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-xl font-light tracking-tight text-[var(--text-main)] font-display">
                  Ideal Use Cases
                </h2>
                <div className="space-y-4">
                  {catalog.useCases.map((useCase, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="text-[#fa5c4f] font-mono text-sm mt-0.5">0{i + 1}</span>
                      <p className="text-sm font-light text-[var(--text-muted)] leading-relaxed">{useCase}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-xl">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10">
                <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-4">Best For</h2>
                <div className="flex flex-wrap gap-2">
                  {catalog.bestFor.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-black/20 text-xs font-mono text-[var(--text-main)]">
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
      <section className="pt-12">
        <h2 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-6 text-center">Related Transitions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {relatedTransitions.map((item) => (
            <Link key={item.slug} href={`/docs/transitions/${item.slug}`} className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 shadow-md hover:border-[#fa5c4f]/40 transition-colors">
              <div className="flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
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
// HIGH-END EDITORIAL DUMMY PAGES FOR CINEMATIC DEMOS
// ─────────────────────────────────────────────────────────────────────────────

function PageAContent() {
  return (
    <div className="flex flex-col min-h-full bg-[#0d0d0d] text-white font-sans">
      <div className="relative flex-1 flex flex-col justify-end p-8 sm:p-12 overflow-hidden min-h-[650px]">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-start space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
            Issue No. 04
          </span>
          <h2 className="text-6xl sm:text-8xl font-light tracking-tighter leading-[0.9] font-display">
            Modern<br />
            <span className="italic font-cursive text-white/70">Brutalism.</span>
          </h2>
          <p className="text-sm text-white/60 max-w-md font-light leading-relaxed">
            Exploring the intersection of raw concrete, exposed structures, and digital minimalism in the 21st century. A case study in restraint.
          </p>
        </div>
      </div>
    </div>
  );
}

function PageBContent() {
  return (
    <div className="flex flex-col min-h-full bg-[#f4f4f0] text-[#1a1a1a] font-sans">
      <div className="flex-1 flex flex-col p-8 sm:p-12 min-h-[650px]">
        <div className="w-full max-w-4xl mx-auto space-y-12 mt-12">
          <header className="space-y-6 border-b border-black/10 pb-8">
            <h2 className="text-5xl sm:text-7xl font-light tracking-tighter leading-[1] font-display">
              Form follows<br />function.
            </h2>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">
              <span>By Marcus Aris</span>
              <span>•</span>
              <span>10 Min Read</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="aspect-[4/5] bg-black/5 rounded-xl overflow-hidden relative shadow-2xl ring-1 ring-black/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-90 mix-blend-multiply" />
            </div>
            <div className="space-y-6 pt-2">
              <p className="text-sm leading-relaxed font-light text-black/70">
                The ideology that design should be dictated by its purpose is not new, but in the digital era, it has taken on a profound new meaning.
                Stripping away the superfluous leaves us with the raw essence of the interface.
              </p>
              <p className="text-sm leading-relaxed font-light text-black/70">
                When we embrace constraints, we find freedom. The grid becomes a canvas, typography becomes the voice, and animation becomes the soul of the experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
