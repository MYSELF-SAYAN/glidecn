'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Layers,
  Box,
  Braces,
  Sparkles,
  ArrowRight,
  Code2,
  Sliders,
  Activity,
  Cpu,
  FileCode,
  Terminal,
  Search,
  X,
  Command,
  Gamepad2,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocHero } from '@/components/docs/api-shared';

interface ApiItem {
  id: string;
  title: string;
  href: string;
  badge: string;
  category: 'components' | 'hooks' | 'engine' | 'types-cli';
  categoryLabel: string;
  signature: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  keywords: string;
}

const API_ITEMS: ApiItem[] = [
  // 1. Components
  {
    id: 'provider',
    title: '<GlideCNProvider>',
    href: '/docs/api/provider',
    badge: 'Context Root',
    category: 'components',
    categoryLabel: 'Core Component',
    signature: '<GlideCNProvider defaultTransition="slide" defaultConfig={{ duration: 0.5 }}>',
    description: 'The top-level root provider that establishes the transition context, manages global baseline configuration, and detects user reduced-motion preferences.',
    highlights: ['defaultTransition', 'defaultConfig', 'reducedMotion', 'children'],
    icon: Layers,
    keywords: 'provider context root config defaultTransition reduce motion children react',
  },
  {
    id: 'glidecn',
    title: '<GlideCN>',
    href: '/docs/api/glidecn',
    badge: 'Router Adapter',
    category: 'components',
    categoryLabel: 'Core Component',
    signature: '<GlideCN mode="wait" routeKey={pathname}>',
    description: 'The framework-specific router coordinator orchestrating AnimatePresence, freezing exiting DOM trees to prevent white flashes, and handling scroll restoration.',
    highlights: ['mode', 'routeKey', 'restoreScroll', 'className', 'FrozenRouter'],
    icon: Box,
    keywords: 'adapter router glidecn transition manager frozenrouter mode wait scroll restoration next app pages react-router',
  },
  {
    id: 'page',
    title: '<Page>',
    href: '/docs/api/page',
    badge: 'Route Segment',
    category: 'components',
    categoryLabel: 'Core Component',
    signature: '<Page transition="circular-portal" duration={0.8} direction="left">',
    description: 'The route-level wrapper that connects pages to the animation engine and enables per-page transition overrides, directional axes, and GPU hints.',
    highlights: ['transition', 'duration', 'delay', 'ease', 'direction', 'stagger'],
    icon: Sparkles,
    keywords: 'page route segment transition duration delay direction ease stagger custom gpu will-change',
  },

  // 2. React Hooks
  {
    id: 'use-glide',
    title: 'useGlide()',
    href: '/docs/api/hooks/use-glide',
    badge: 'Primary Hook',
    category: 'hooks',
    categoryLabel: 'React Hook',
    signature: 'const { currentTransition, setTransition, config, setConfig } = useGlide();',
    description: 'The primary control hook returning the active transition name, merged configuration, lifecycle status, accessibility state, and runtime mutators.',
    highlights: ['currentTransition', 'setTransition', 'config', 'setConfig', 'animationState'],
    icon: Braces,
    keywords: 'useGlide hook setTransition setConfig currentTransition animationState reducedMotion transitionDefinition',
  },
  {
    id: 'use-transition-config',
    title: 'useTransitionConfig()',
    href: '/docs/api/hooks/use-transition-config',
    badge: 'Config Shortcut',
    category: 'hooks',
    categoryLabel: 'React Hook',
    signature: 'const { config, setConfig } = useTransitionConfig();',
    description: 'Lightweight convenience hook for reading resolved timing parameters and dynamically applying runtime configuration changes without full state overhead.',
    highlights: ['config', 'setConfig', 'duration', 'direction', 'ease'],
    icon: Sliders,
    keywords: 'useTransitionConfig hook config setConfig duration direction ease slider toggle',
  },
  {
    id: 'use-animation-state',
    title: 'useAnimationState()',
    href: '/docs/api/hooks/use-animation-state',
    badge: 'Lifecycle Observer',
    category: 'hooks',
    categoryLabel: 'React Hook',
    signature: "const state: 'idle' | 'entering' | 'exiting' | 'complete' = useAnimationState();",
    description: 'Monitors real-time animation phases for rendering transition loading bars, interaction click guards, and pulsing status indicators.',
    highlights: ['idle', 'entering', 'exiting', 'complete', 'status guard'],
    icon: Activity,
    keywords: 'useAnimationState hook state idle entering exiting complete navigation lock guard',
  },

  // 3. Engine & Registry
  {
    id: 'registry',
    title: 'TransitionRegistry',
    href: '/docs/api/registry',
    badge: 'Registry Engine',
    category: 'engine',
    categoryLabel: 'Engine & Registry',
    signature: 'defaultRegistry.list() / registerTransition(name, def)',
    description: 'The global singleton registry for discovering installed transition names (list, listDefinitions), inspecting metadata, and registering custom transitions.',
    highlights: ['list()', 'listDefinitions()', 'get()', 'has()', 'registerTransition()', 'resolveTransition()'],
    icon: Cpu,
    keywords: 'registry registerTransition resolveTransition getTransition list listDefinitions has custom transitions',
  },
  {
    id: 'animation-engine',
    title: 'Animation Engine',
    href: '/docs/api/animation-engine',
    badge: 'Motion Utilities',
    category: 'engine',
    categoryLabel: 'Engine & Registry',
    signature: 'buildVariants(definition, config, reducedMotion)',
    description: 'Pure utility functions for Framer Motion variant tree compilation, cubic-bezier easing resolution, directional offsets, and GPU will-change hints.',
    highlights: ['buildVariants', 'buildTransition', 'resolveEasing', 'getWillChangeHint'],
    icon: Sliders,
    keywords: 'animation engine buildVariants buildTransition resolveEasing getWillChangeHint getDirectionOffset easing constants',
  },

  // 4. Types & CLI
  {
    id: 'types',
    title: 'TypeScript Types',
    href: '/docs/api/types',
    badge: 'Type Glossaries',
    category: 'types-cli',
    categoryLabel: 'Types & Tools',
    signature: 'import type { TransitionConfig, TransitionDefinition, PageProps }',
    description: 'Complete TypeScript definitions, interface schemas, and prop types for GlideCN. All types are strictly validated and exported directly from the barrel.',
    highlights: ['TransitionConfig', 'TransitionDefinition', 'TransitionVariants', 'PageProps'],
    icon: FileCode,
    keywords: 'types interfaces TransitionConfig TransitionDefinition PageProps GlideCNProviderProps EasingPreset AnimationState',
  },
  {
    id: 'cli',
    title: 'CLI Reference',
    href: '/docs/cli',
    badge: 'CLI Scaffolding',
    category: 'types-cli',
    categoryLabel: 'Types & Tools',
    signature: 'npx glidecn-cli init / add [transitions...] / list',
    description: 'The official glidecn-cli tool generates exact, production-ready source code directly into your repository with zero runtime baggage.',
    highlights: ['init', 'add', 'list', '--all', '--category', '--force'],
    icon: Terminal,
    keywords: 'cli init add list terminal commands npx pnpm bun yarn flags arguments components transitions glidecn-cli',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All References' },
  { id: 'components', label: 'Components (3)' },
  { id: 'hooks', label: 'React Hooks (3)' },
  { id: 'engine', label: 'Engine & Registry (2)' },
  { id: 'types-cli', label: 'Types & CLI (2)' },
] as const;

export function DocsApiReference() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Smart Fuzzy Search Filter
  const filteredItems = useMemo(() => {
    let list = API_ITEMS;

    // Filter by Category Tab
    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q) ||
          item.signature.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q) ||
          item.highlights.some((h) => h.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }, [searchQuery, selectedCategory]);

  const componentsList = useMemo(() => filteredItems.filter((i) => i.category === 'components'), [filteredItems]);
  const hooksList = useMemo(() => filteredItems.filter((i) => i.category === 'hooks'), [filteredItems]);
  const engineList = useMemo(() => filteredItems.filter((i) => i.category === 'engine'), [filteredItems]);
  const typesCliList = useMemo(() => filteredItems.filter((i) => i.category === 'types-cli'), [filteredItems]);

  const isFiltered = searchQuery.trim().length > 0 || selectedCategory !== 'all';

  return (
    <div className="space-y-16 md:space-y-24 pb-24">
      {/* 1. HERO HEADER */}
      <DocHero
        badge="Core API Reference"
        version="v1.0.0 • Strict TypeScript"
        title="API Reference."
        description="Explore the complete, strictly-typed API surface of GlideCN. Every component, hook, registry method, and type schema in one place with zero runtime lock-in."
        importSnippet="import { GlideCNProvider, GlideCN, Page, useGlide, defaultRegistry } from '@/components/glidecn';"
      />

      {/* 2. SMART SEARCH & FILTER BAR */}
      <div className="space-y-4 pt-4">
        {/* Search Input Bar */}
        <div className="relative group max-w-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fa5c4f]/20 to-transparent rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-white dark:bg-[#0f0f11] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-lg shadow-black/[0.03] dark:shadow-black/20 overflow-hidden group-focus-within:border-[#fa5c4f]/50 transition-colors">
            <Search className="absolute left-4 size-5 text-zinc-400 group-focus-within:text-[#fa5c4f] transition-colors" />
            <input
              type="text"
              placeholder="Search components, hooks, methods, props, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-4 pl-12 pr-24 text-sm md:text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none font-medium"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            ) : (
              <div className="absolute right-4 flex items-center gap-1.5 opacity-60">
                <span className="px-2 py-0.5 rounded-md text-xs font-mono bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500">
                  ⌘K
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#fa5c4f] text-white font-bold shadow-md shadow-[#fa5c4f]/25'
                    : 'bg-white dark:bg-[#0f0f11] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          {isFiltered && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-medium text-[#fa5c4f] hover:underline px-3 py-2 shrink-0 cursor-pointer ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 3. PROPERLY GROUPED CARD GRIDS */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-[#0f0f11]/50 space-y-4">
          <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-white/5 mx-auto flex items-center justify-center text-zinc-400">
            <Search className="size-6" />
          </div>
          <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
            No matching API references found
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            Try searching for terms like &quot;provider&quot;, &quot;wait&quot;, &quot;duration&quot;, &quot;useGlide&quot;, or &quot;getNames&quot;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#fa5c4f] text-white text-xs font-bold shadow-md cursor-pointer hover:bg-[#e54235] transition-colors"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="space-y-16">
          {/* GROUP 1: CORE COMPONENTS */}
          {componentsList.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#fa5c4f]">
                    <Layers className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100">
                      Core Components
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Top-level provider, router coordinator, and route segment wrappers.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200/50 dark:border-white/5">
                  {componentsList.length} {componentsList.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {componentsList.map((item) => (
                  <ApiCardItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* GROUP 2: REACT HOOKS */}
          {hooksList.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#fa5c4f]">
                    <Braces className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100">
                      React Hooks
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Runtime state controllers, timing mutators, and animation lifecycle listeners.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200/50 dark:border-white/5">
                  {hooksList.length} {hooksList.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hooksList.map((item) => (
                  <ApiCardItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* GROUP 3: ENGINE & REGISTRY */}
          {engineList.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#fa5c4f]">
                    <Cpu className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100">
                      Engine & Registry
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Transition discovery (getNames, getAll, getByCategory), custom transitions, and motion math.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200/50 dark:border-white/5">
                  {engineList.length} {engineList.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {engineList.map((item) => (
                  <ApiCardItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}

          {/* GROUP 4: TYPES & CLI */}
          {typesCliList.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#fa5c4f]">
                    <FileCode className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100">
                      Types & CLI Tooling
                    </h2>
                    <p className="text-xs text-zinc-500">
                      Strict TypeScript schema glossaries and interactive terminal scaffolding wizard.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 border border-zinc-200/50 dark:border-white/5">
                  {typesCliList.length} {typesCliList.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {typesCliList.map((item) => (
                  <ApiCardItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* 4. SHOWCASE CTA BANNER */}
      <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#fa5c4f]">
            <Sparkles className="size-3.5" /> 69+ Transitions
          </span>
          <h2 className="text-3xl font-display font-medium text-zinc-900 dark:text-zinc-100">
            Ready to test transitions live?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Browse our catalog featuring live portal, spatial 3D, origami, and fluid flow page transitions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
          <Link
            href="/docs/transitions"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] text-xs font-bold text-white shadow-xl shadow-[#fa5c4f]/25 hover:shadow-[#fa5c4f]/40 hover:-translate-y-0.5 transition-all justify-center no-underline cursor-pointer"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href="/playground/landing"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-xs font-bold text-zinc-900 dark:text-zinc-100 transition-all justify-center no-underline cursor-pointer"
          >
            <Gamepad2 className="size-4 text-[#fa5c4f]" />
            <span>Open Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ApiCardItem({ item }: { item: ApiItem }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#fa5c4f]/50 transition-all duration-300 no-underline cursor-pointer"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="size-10 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#fa5c4f] shadow-sm group-hover:scale-105 transition-transform">
            <Icon className="size-5" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5">
            {item.badge}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 group-hover:text-[#fa5c4f] transition-colors">
            {item.title}
          </h3>
          <div className="mt-2.5 p-2 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200/60 dark:border-white/5 overflow-x-auto no-scrollbar">
            <code className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap block">
              {item.signature}
            </code>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
          {item.description}
        </p>

        <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex flex-wrap gap-1.5">
          {item.highlights.map((h) => (
            <span
              key={h}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-4 flex items-center gap-2 text-xs font-bold text-[#fa5c4f] group-hover:translate-x-1 transition-transform">
        <span>Explore Guide</span>
        <ArrowRight className="size-3.5" />
      </div>
    </Link>
  );
}
