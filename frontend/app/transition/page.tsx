'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react';
import { Page } from '@/components/glidecn';
import {
  TRANSITION_CATALOG,
  getTransitionsByFamily,
  FAMILIES,
} from '@/lib/transition-catalog';

// Ensure all transitions are registered
import '@/components/glidecn/transitions/fade';
import '@/components/glidecn/transitions/slide';
import '@/components/glidecn/transitions/scale';
import '@/components/glidecn/transitions/circular-portal';
import '@/components/glidecn/transitions/page-curl';
import '@/components/glidecn/transitions/cube';
import '@/components/glidecn/transitions/slash';
import '@/components/glidecn/transitions/wormhole';
import '@/components/glidecn/transitions/ink-spread';
import '@/components/glidecn/transitions/liquid-morph';
import '@/components/glidecn/transitions/dissolve';
import '@/components/glidecn/transitions/swipe';
import '@/components/glidecn/transitions/flip';
import '@/components/glidecn/transitions/spin';
import '@/components/glidecn/transitions/zoom';
import '@/components/glidecn/transitions/bounce';
import '@/components/glidecn/transitions/wobble';
import '@/components/glidecn/transitions/stretch';
import '@/components/glidecn/transitions/squeeze';
import '@/components/glidecn/transitions/ripple';
import '@/components/glidecn/transitions/glass';
import '@/components/glidecn/transitions/ghost';
import '@/components/glidecn/transitions/shadow';
import '@/components/glidecn/transitions/neon';
import '@/components/glidecn/transitions/glitch';
import '@/components/glidecn/transitions/fold';
import '@/components/glidecn/transitions/wave';
import '@/components/glidecn/transitions/pixel';
import '@/components/glidecn/transitions/mirror';
import '@/components/glidecn/transitions/vortex';
import '@/components/glidecn/transitions/tv-turn-off';
import '@/components/glidecn/transitions/shutter-iris';
import '@/components/glidecn/transitions/origami-unfold';
import '@/components/glidecn/transitions/crystal';
import '@/components/glidecn/transitions/paint-drip';
import '@/components/glidecn/transitions/blueprint';
import '@/components/glidecn/transitions/lens-flare';
import '@/components/glidecn/transitions/origami-crush';
import '@/components/glidecn/transitions/gravity';
import '@/components/glidecn/transitions/camera-dive';

export default function TransitionsIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const families = getTransitionsByFamily();

  const filteredFamilies = useMemo(() => {
    const result: Record<string, typeof TRANSITION_CATALOG> = {};
    
    FAMILIES.forEach(family => {
      const items = families[family] || [];
      const filteredItems = items.filter(entry => {
        const matchesSearch =
          !searchQuery.trim() ||
          entry.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
      });

      if (filteredItems.length > 0) {
        result[family] = filteredItems;
      }
    });

    return result;
  }, [searchQuery, families]);

  const readyCount = useMemo(() => {
    return TRANSITION_CATALOG.filter((e) => e.status !== 'coming-soon').length;
  }, []);

  const scrollToFamily = (family: string) => {
    const el = document.getElementById(`family-${family}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Page transition="fade">
      <div className="space-y-16 pb-32 w-full max-w-6xl mx-auto px-6 lg:px-8 pt-8">
        
        {/* Header Banner - Spacious, cinematic */}
        <header className="relative pt-6 pb-8 flex flex-col items-start gap-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors group no-underline"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Documentation</span>
          </Link>

          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl sm:text-7xl font-light tracking-tight text-[var(--text-main)] font-display">
              Transition Gallery 
            </h1>

            <p className="text-lg sm:text-xl font-light text-[var(--text-muted)] leading-relaxed max-w-2xl">
              Explore the complete catalog of {TRANSITION_CATALOG.length}+ GPU-accelerated page transitions. Every ready transition features live parameter controls, interactive canvas preview, and one-line CLI installation.
            </p>
            
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] text-sm font-medium">
                <Sparkles className="size-4" /> {readyCount} Ready Transitions
              </span>
              <span className="font-mono text-sm text-[var(--text-subtle)]">
                Dual-Frame Zero-Jank • 60 FPS
              </span>
            </div>
          </div>
        </header>

        {/* Filter and Search Bar */}
        <div className="sticky top-14 z-20 bg-[var(--bg-page)]/80 backdrop-blur-xl border-b border-[var(--border-color)] py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 -mx-6 px-6 lg:-mx-8 lg:px-8">
          
          {/* Family Anchor Pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar w-full sm:w-auto"
          >
            {Object.keys(filteredFamilies).map((family) => (
              <button
                key={family}
                onClick={() => scrollToFamily(family)}
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition cursor-pointer shrink-0 border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--bg-card)] hover:border-[var(--text-subtle)]"
              >
                {family}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[var(--text-subtle)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search transitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] py-2 pl-10 pr-4 text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:border-[#fa5c4f] focus:outline-none transition shadow-sm"
            />
          </div>
        </div>

        {/* Transition Families */}
        <div className="space-y-24">
          {Object.entries(filteredFamilies).map(([family, entries]) => (
            <section key={family} id={`family-${family}`} className="scroll-mt-32">
              <div className="mb-8 flex items-end gap-4 border-b border-[var(--border-color)] pb-4">
                <h2 className="text-3xl font-light text-[var(--text-main)] font-display">{family}</h2>
                <span className="text-sm font-mono text-[var(--text-subtle)] pb-1">{entries.length} items</span>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => {
                  const isComingSoon = entry.status === 'coming-soon';

                  return (
                    <Link
                      key={entry.slug}
                      href={`/transition/${entry.slug}`}
                      className={`group flex flex-col justify-between p-8 rounded-2xl no-underline relative overflow-hidden transition-all duration-300 ease-out-expo ${
                        isComingSoon
                          ? 'bg-[var(--bg-surface)]/50 opacity-70 hover:opacity-100 border border-dashed border-[var(--border-color)]'
                          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 border border-transparent hover:border-[var(--border-color)]'
                      }`}
                    >
                      <div>
                        {/* Title & Category */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-[var(--text-subtle)] uppercase tracking-widest">
                              {entry.category}
                            </span>
                            {isComingSoon && (
                              <span className="px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                                Coming Soon
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-[var(--text-main)] font-display tracking-tight group-hover:text-[#fa5c4f] transition-colors">
                            {entry.displayName}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                          {entry.description}
                        </p>
                      </div>

                      {/* Bottom Row: Metrics & Action */}
                      <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
                        <span className="font-mono text-[var(--text-subtle)]">
                          {isComingSoon ? 'In Lab' : `${entry.metrics.bundleSize} • ${entry.metrics.fps}FPS`}
                        </span>

                        <span className={`font-medium transition-transform duration-300 flex items-center gap-1.5 ${isComingSoon ? 'text-[var(--text-subtle)]' : 'text-[#fa5c4f] group-hover:translate-x-1'}`}>
                          {isComingSoon ? 'Preview' : 'View Transition'} <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
          
          {Object.keys(filteredFamilies).length === 0 && (
             <div className="text-center py-24 text-[var(--text-muted)]">
                No transitions found matching your search.
             </div>
          )}
        </div>

      </div>
    </Page>
  );
}
