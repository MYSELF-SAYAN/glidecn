'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Search,
  Clock,
  Zap,
  CheckCircle2,
  Cpu,
  Layers,
  Flame,
} from 'lucide-react';
import { Page } from '@/components/morphy';
import {
  TRANSITION_CATALOG,
  getTransitionsByFamily,
  FAMILIES,
} from '@/lib/transition-catalog';

// Ensure all transitions are registered
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
import '@/components/morphy/transitions/crystal';
import '@/components/morphy/transitions/paint-drip';
import '@/components/morphy/transitions/blueprint';
import '@/components/morphy/transitions/lens-flare';
import '@/components/morphy/transitions/origami-crush';

function getFamilyEmoji(family: string): string {
  switch (family) {
    case 'Spatial':
      return '🧊';
    case 'Portal':
      return '🌀';
    case 'Paper':
      return '📜';
    case 'Mask':
      return '🖋️';
    case 'Retro':
      return '📺';
    case 'Basic':
      return '⚡';
    case 'Flow':
      return '🌊';
    case 'Dynamic':
      return '🚀';
    case 'Experimental':
      return '🧪';
    default:
      return '✨';
  }
}

export default function TransitionsIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ready' | 'coming-soon'>('all');

  const filteredEntries = useMemo(() => {
    return TRANSITION_CATALOG.filter((entry) => {
      const isComingSoon = entry.status === 'coming-soon';

      if (statusFilter === 'ready' && isComingSoon) return false;
      if (statusFilter === 'coming-soon' && !isComingSoon) return false;

      const matchesSearch =
        !searchQuery.trim() ||
        entry.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFamily =
        selectedFamily === 'All' || entry.family === selectedFamily;

      return matchesSearch && matchesFamily;
    });
  }, [searchQuery, selectedFamily, statusFilter]);

  const families = getTransitionsByFamily();

  const readyCount = useMemo(() => {
    return TRANSITION_CATALOG.filter((e) => e.status !== 'coming-soon').length;
  }, []);

  const comingSoonCount = useMemo(() => {
    return TRANSITION_CATALOG.filter((e) => e.status === 'coming-soon').length;
  }, []);

  return (
    <Page transition="fade">
      <div className="space-y-8 pb-24 w-full">
        
        {/* Header Banner */}
        <header className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-lg morphy-card">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#fa5c4f] hover:text-[#e54235] no-underline transition group cursor-pointer"
            >
              <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition" />
              <span>Back to Overview</span>
            </Link>

            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="sticker-pill">
                <Sparkles className="size-3 text-[#fa5c4f]" /> {readyCount} Ready Production Shaders
              </span>
              {comingSoonCount > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Clock className="size-3" /> {comingSoonCount} Coming Soon
                </span>
              )}
              <span className="font-mono text-xs text-[var(--text-subtle)]">
                Dual-Frame Zero-Jank • 60 FPS
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
              Transition Gallery 🎭
            </h1>

            <p className="max-w-3xl text-sm text-[var(--text-muted)] leading-relaxed">
              Explore the complete catalog of 33+ GPU-accelerated page transitions. Every ready transition features live parameter controls, interactive canvas preview, and one-line CLI installation.
            </p>
          </div>
        </header>

        {/* Filter and Search Bar */}
        <div className="space-y-4">
          
          {/* Status Tabs + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Ready vs Coming Soon Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] w-fit">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#fa5c4f] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                All ({TRANSITION_CATALOG.length})
              </button>
              <button
                onClick={() => setStatusFilter('ready')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === 'ready'
                    ? 'bg-[#fa5c4f] text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                <Zap className="size-3.5" />
                <span>Ready ({readyCount})</span>
              </button>
              <button
                onClick={() => setStatusFilter('coming-soon')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === 'coming-soon'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                <Clock className="size-3.5" />
                <span>Coming Soon ({comingSoonCount})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[var(--text-subtle)] pointer-events-none" />
              <input
                type="text"
                placeholder="Search transitions, family, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2.5 pl-10 pr-3.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:border-[#fa5c4f] focus:outline-none transition shadow-sm font-medium"
              />
            </div>

          </div>

          {/* Family Filter Pills */}
          <div
            data-lenis-prevent="true"
            data-scrollable="true"
            className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar"
          >
            {['All', ...FAMILIES].map((family) => {
              const count =
                family === 'All'
                  ? TRANSITION_CATALOG.length
                  : (families[family] || []).length;

              const isSelected = selectedFamily === family;
              const emoji = family === 'All' ? '🌟' : getFamilyEmoji(family);

              return (
                <button
                  key={family}
                  onClick={() => setSelectedFamily(family)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#fa5c4f] text-white shadow-md shadow-[#fa5c4f]/25 font-bold'
                      : 'border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <span>{emoji}</span>
                  <span>{family}</span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-white/80' : 'text-[var(--text-subtle)]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center justify-between text-xs text-[var(--text-subtle)] px-1">
          <span>Showing {filteredEntries.length} of {TRANSITION_CATALOG.length} transitions</span>
          {(searchQuery || selectedFamily !== 'All' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFamily('All');
                setStatusFilter('all');
              }}
              className="text-[#fa5c4f] font-semibold hover:text-[#e54235] no-underline transition cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Enhanced Transition Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => {
            const isComingSoon = entry.status === 'coming-soon';
            const familyEmoji = getFamilyEmoji(entry.family);

            return (
              <Link
                key={entry.slug}
                href={`/docs/transitions/${entry.slug}`}
                className={`flex flex-col justify-between p-6 rounded-3xl group no-underline relative overflow-hidden ${
                  isComingSoon
                    ? 'bg-[var(--bg-card)] border border-dashed border-amber-500/40 hover:border-amber-500/70 hover:-translate-y-1 transition-all'
                    : 'morphy-card'
                }`}
              >
                <div>
                  {/* Top Header Row: Emoji & Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="text-3xl p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-xs">
                      {entry.emoji}
                    </span>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {isComingSoon && (
                        <span className="px-2.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1 shadow-xs">
                          <Clock className="size-3" />
                          <span>Coming Soon</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition-colors">
                    {entry.displayName}
                  </h3>

                  {/* Subheading: Category */}
                  <div className="flex items-center gap-2 mt-1 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-[var(--text-subtle)] uppercase tracking-wider">
                      {entry.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-muted)] mt-3 leading-relaxed line-clamp-2">
                    {entry.description}
                  </p>

                  {/* Feature Tags */}
                  {entry.features && entry.features.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                      {entry.features.slice(0, 2).map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[10px] font-medium text-[var(--text-muted)] border border-[var(--border-color)]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Metrics & Action Button */}
                <div className="mt-5 pt-3.5 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
                  <span className="text-xs font-mono text-[var(--text-subtle)]">
                    {isComingSoon ? 'Roadmap • In Lab' : `${entry.metrics.bundleSize} • ${entry.metrics.fps} FPS`}
                  </span>

                  {isComingSoon ? (
                    <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Roadmap Preview <ArrowRight className="size-3.5" />
                    </span>
                  ) : (
                    <span className="font-bold text-[#fa5c4f] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Docs & Code <ArrowRight className="size-3.5" />
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </Page>
  );
}
