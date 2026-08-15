'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, ArrowLeft, Copy, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/code-block';
import { copyToClipboard } from '@/lib/copy-to-clipboard';

export interface PropItem {
  name: string;
  type: string;
  defaultVal?: string;
  description: string;
  required?: boolean;
  typeHref?: string;
}

export function PropRow({ name, type, defaultVal, description, required = false, typeHref }: PropItem) {
  // Auto-detect type link if not provided
  let href = typeHref;
  if (!href) {
    if (type.includes('TransitionConfig')) href = '/docs/api/types#transitionconfig';
    else if (type.includes('TransitionDefinition')) href = '/docs/api/types#transitiondefinition';
    else if (type.includes('EasingPreset')) href = '/docs/api/types#easingpreset';
    else if (type.includes('TransitionDirection')) href = '/docs/api/types#transitiondirection';
    else if (type.includes('AnimationState')) href = '/docs/api/types#animationstate';
    else if (type.includes('TransitionVariants')) href = '/docs/api/types#transitionvariants';
  }

  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 md:p-8 border-b border-zinc-200 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors last:border-0">
      <div className="md:col-span-4 flex flex-col gap-2 items-start">
        <div className="flex items-center gap-2">
          <code className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100">{name}</code>
          {required && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              Required
            </span>
          )}
        </div>
        {href ? (
          <Link
            href={href}
            className="text-xs font-mono text-[#fa5c4f] hover:text-[#e54235] hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{type}</span>
            <ExternalLink className="size-2.5 opacity-70" />
          </Link>
        ) : (
          <code className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{type}</code>
        )}
      </div>
      <div className="md:col-span-8 flex flex-col gap-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
        {defaultVal && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Default:</span>
            <code className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 rounded border border-zinc-200/50 dark:border-white/5">
              {defaultVal}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}

export function PropsCard({ title, props }: { title: string; props: PropItem[] }) {
  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/[0.02]">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">{title}</h3>
      </div>
      <div className="flex flex-col">
        {props.map((p) => (
          <PropRow key={p.name} {...p} />
        ))}
      </div>
    </div>
  );
}

export function FrameworkTabs({
  tabs,
  layoutIdPrefix,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  layoutIdPrefix: string;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col w-full my-6 rounded-2xl border border-zinc-200/80 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden bg-white dark:bg-[#0f0f11] relative group">
      {/* macOS Window Controls & Tabs Header */}
      <div className="relative flex items-end px-2 pt-2 bg-zinc-100/80 dark:bg-[#161618] border-b border-zinc-200/80 dark:border-white/10 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 px-3 pb-3.5 mb-0.5 opacity-80">
          <div className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 border border-zinc-400/20 dark:border-black/20" />
          <div className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 border border-zinc-400/20 dark:border-black/20" />
          <div className="size-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700/80 border border-zinc-400/20 dark:border-black/20" />
        </div>

        <div className="flex items-end gap-1 flex-1 px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 text-[13px] font-medium transition-all duration-300 rounded-t-xl z-10 cursor-pointer ${
                  isActive
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <>
                    <motion.div
                      layoutId={`active-tab-bg-${layoutIdPrefix}`}
                      className="absolute inset-0 bg-white dark:bg-[#0f0f11] rounded-t-xl border-x border-t border-zinc-200/80 dark:border-white/10"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                    <motion.div
                      layoutId={`active-tab-glow-${layoutIdPrefix}`}
                      className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-[#fa5c4f] to-transparent opacity-60 blur-[0.5px]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                    <motion.div
                      layoutId={`active-tab-line-${layoutIdPrefix}`}
                      className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#fa5c4f] to-transparent opacity-100"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                    <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white dark:bg-[#0f0f11] z-20" />
                  </>
                )}
                <span className="relative z-20 flex items-center gap-2 tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {tabs.find((t) => t.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AccordionItem({
  title,
  description,
  code,
  badge,
  children,
}: {
  title: string;
  description: React.ReactNode;
  code?: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-200/80 dark:border-white/10 rounded-2xl bg-white dark:bg-[#0f0f11] overflow-hidden shadow-sm hover:shadow-md transition-all duration-500">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <span className="font-display font-medium text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', bounce: 0, duration: 0.5 }}>
          <ChevronDown className="size-5 text-zinc-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-zinc-100 dark:border-white/5">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 mt-4">{description}</div>
              {code ? <CodeBlock code={code} badge={badge} /> : children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DocHero({
  badge,
  version = 'v1.0.0 • Strict TypeScript',
  title,
  description,
  importSnippet,
  quickLinks = true,
}: {
  badge: string;
  version?: string;
  title: string;
  description: string;
  importSnippet?: string;
  quickLinks?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!importSnippet) return;
    copyToClipboard(importSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-12 md:pt-20 w-full space-y-8">
      {/* Title & Description Column */}
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/50">
            {badge}
          </span>
          <span className="text-xs font-mono text-zinc-500">{version}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-display font-medium tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.05]">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {description}
        </p>

        {quickLinks && (
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <Link
              href="/docs/api/types"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-[#fa5c4f]/50 hover:text-[#fa5c4f] transition-all no-underline cursor-pointer"
            >
              <span>TypeScript Types</span>
              <ArrowRight className="size-3 text-[#fa5c4f]" />
            </Link>
            <Link
              href="/docs/cli"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-[#fa5c4f]/50 hover:text-[#fa5c4f] transition-all no-underline cursor-pointer"
            >
              <span>CLI Commands</span>
              <ArrowRight className="size-3 text-[#fa5c4f]" />
            </Link>
            <Link
              href="/docs/transitions"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-[#fa5c4f]/50 hover:text-[#fa5c4f] transition-all no-underline cursor-pointer"
            >
              <span>69+ Transitions</span>
              <ArrowRight className="size-3 text-[#fa5c4f]" />
            </Link>
            <Link
              href="/playground/landing"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-[#fa5c4f]/10 border border-[#fa5c4f]/20 text-[#fa5c4f] hover:bg-[#fa5c4f]/20 transition-all no-underline cursor-pointer"
            >
              <span>Interactive Studio</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>
        )}
      </div>

      {/* Full-Width Import Terminal Block */}
      {importSnippet && (
        <div className="w-full max-w-4xl">
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0c] shadow-2xl overflow-hidden group">
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="flex gap-2 shrink-0">
                <div className="size-3 rounded-full bg-[#ff5f56] border border-black/10 dark:border-transparent" />
                <div className="size-3 rounded-full bg-[#ffbd2e] border border-black/10 dark:border-transparent" />
                <div className="size-3 rounded-full bg-[#27c93f] border border-black/10 dark:border-transparent" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400">ES Module Import</span>
            </div>

            <div className="p-5 md:p-6 flex items-center justify-between gap-4 bg-[#0a0a0c]">
              <div className="overflow-x-auto py-1 font-mono text-xs sm:text-sm text-zinc-100 whitespace-pre-wrap break-all leading-relaxed">
                {importSnippet}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                title="Copy import statement"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function SectionTwoCol({
  id,
  icon,
  title,
  description,
  children,
}: {
  id?: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative scroll-mt-32" id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-5 sticky top-32 space-y-6">
          <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm">
            {icon}
          </div>
          <h2 className="text-4xl font-display font-medium tracking-tight text-zinc-900 dark:text-white">{title}</h2>
          <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">{description}</div>
        </div>

        <div className="lg:col-span-7 space-y-8">{children}</div>
      </div>
    </section>
  );
}

export function BottomNavCards({
  prev = { label: 'API Reference Hub', href: '/docs/api-reference' },
  next = { label: 'Explore Transitions', href: '/docs/transitions' },
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <div className="pt-16 border-t border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
      <Link
        href={prev.href}
        className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:border-[#fa5c4f]/50 hover:shadow-lg transition-all w-full sm:w-auto justify-center no-underline cursor-pointer"
      >
        <ArrowLeft className="size-4 text-[#fa5c4f] group-hover:-translate-x-1 transition-transform" />
        <span>{prev.label}</span>
      </Link>

      <Link
        href={next.href}
        className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] text-sm font-bold text-white shadow-xl shadow-[#fa5c4f]/25 hover:shadow-[#fa5c4f]/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center no-underline cursor-pointer"
      >
        <span>{next.label}</span>
        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
