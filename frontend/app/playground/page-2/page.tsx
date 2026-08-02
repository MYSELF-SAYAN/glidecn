'use client';

import { Page, useMorphy } from '@/components/morphy';
import { ALL_PLAYGROUND_TRANSITIONS } from '@/components/playground/transition-studio';
import {
  ArrowLeft,
  ArrowRightLeft,
  Dices,
  Sparkles,
  Zap,
  Gamepad2,
  Sliders,
  Search,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';

export default function PlaygroundPageTwo() {
  const { currentTransition, setTransition, setConfig } = useMorphy();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const categories = ['All', 'Spatial', 'Portal', 'Paper', 'Mask', 'Retro', 'Flow'];

  const filteredTransitions = ALL_PLAYGROUND_TRANSITIONS.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch =
      t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ALL BUTTONS ON PAGE 2 REDIRECT TO PAGE 1
  const handleJumpToPageOne = (transitionId?: string) => {
    if (transitionId) {
      setTransition(transitionId);
    }
    router.push('/playground/page-1');
  };

  const handleSurpriseJump = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    setTransition(randomTransition.id);
    router.push('/playground/page-1');
  };

  const handleChaosJump = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const randomDuration = Number((Math.random() * 1.4 + 0.2).toFixed(2));
    const directions = ['left', 'right', 'up', 'down'] as const;
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    setTransition(randomTransition.id);
    setConfig({ duration: randomDuration, direction: randomDirection });
    router.push('/playground/page-1');
  };

  return (
    <Page className="items-center">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        
        {/* ================= PAGE 2 HERO ================= */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="sticker-pill bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30">
              🕹️ Page 2 (Side B)
            </span>
            <span className="sticker-pill rotate-2 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
              🎮 Retro Arcade Mode
            </span>
            <span className="sticker-pill -rotate-2 bg-[#fa5c4f]/10 text-[#fa5c4f] border-[#fa5c4f]/30 font-mono">
              active: {currentTransition}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-main)] font-display leading-[1.1]">
              You Reached{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#fa5c4f]">
                Page 2 (Beta)
              </span>{' '}
              🕹️
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
              Every button below will trigger a transition and return you to <strong className="text-[var(--text-main)]">Page 1</strong>.
            </p>
          </div>

          {/* Primary Action Buttons (All redirect to Page 1) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleJumpToPageOne()}
              className="px-6 py-3.5 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#fa5c4f]/25 active:scale-95 transition cursor-pointer btn-tactile flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Page 1</span>
            </button>

            <button
              onClick={handleSurpriseJump}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 active:scale-95 transition cursor-pointer btn-tactile flex items-center gap-2"
            >
              <Dices className="w-4 h-4" /> Surprise Jump to Page 1 🎲
            </button>

            <button
              onClick={handleChaosJump}
              className="px-6 py-3.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-bold transition cursor-pointer btn-tactile flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-purple-500" /> Chaos Jump 👾
            </button>
          </div>
        </div>

        {/* ================= INTERACTIVE DUMMY CARDS (ALL REDIRECT TO PAGE 1) ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: Ink Spread */}
          <div
            onClick={() => handleJumpToPageOne('ink-spread')}
            className="morphy-card p-6 rounded-3xl cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl group-hover:scale-125 transition-transform duration-200">🖋️</span>
              <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase">ink-spread</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition">
                Fluid Ink Diffusion
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Organic fluid bleed wash back into Page 1.
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[#fa5c4f]">
              <span>Return to Page 1</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Cyber Glitch */}
          <div
            onClick={() => handleJumpToPageOne('glitch')}
            className="morphy-card p-6 rounded-3xl cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl group-hover:scale-125 transition-transform duration-200">👾</span>
              <span className="text-[10px] font-mono font-bold text-purple-500 uppercase">glitch</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition">
                Cyber Chromatic Glitch
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                RGB chromatic displacement back to Page 1.
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[#fa5c4f]">
              <span>Return to Page 1</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Origami Unfold */}
          <div
            onClick={() => handleJumpToPageOne('origami-unfold')}
            className="morphy-card p-6 rounded-3xl cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl group-hover:scale-125 transition-transform duration-200">🦢</span>
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase">origami</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-main)] font-display group-hover:text-[#fa5c4f] transition">
                Origami Paper Blossom
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                3D multi-facet fold unfold into Page 1.
              </p>
            </div>
            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[#fa5c4f]">
              <span>Return to Page 1</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
            </div>
          </div>

        </div>

        {/* ================= ALL 33 SHADERS MATRIX (ALL REDIRECT TO PAGE 1) ================= */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
            <div>
              <div className="flex items-center gap-2 text-[#fa5c4f] text-xs font-mono font-bold uppercase tracking-wider mb-1">
                <Sliders className="w-4 h-4" /> 33 Shaders
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-main)] font-display tracking-tight">
                Click Any Transition to Return to Page 1
              </h2>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[var(--text-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 33 shaders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#fa5c4f] transition"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer btn-tactile whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#fa5c4f] text-white shadow-sm font-bold'
                    : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-color)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 33 Shaders Grid (Each Button switches transition & returns to Page 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredTransitions.map((t) => {
              const isActive = currentTransition === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleJumpToPageOne(t.id)}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer btn-tactile flex flex-col justify-between space-y-3 group ${
                    isActive
                      ? 'bg-[#fa5c4f]/10 border-[#fa5c4f] text-[var(--text-main)] ring-1 ring-[#fa5c4f]'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-200">{t.icon}</span>
                    <span className="text-[9px] font-mono uppercase text-[var(--text-subtle)]">
                      {t.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[var(--text-main)] font-display line-clamp-1">{t.label}</h4>
                    <span className="text-[10px] text-[var(--text-muted)] block line-clamp-1 mt-0.5">{t.hint}</span>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] w-full">
                    <span className="text-[#fa5c4f] font-bold text-[10px] group-hover:text-[#e54235] transition-colors flex items-center gap-1">
                      ← Return to Page 1
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

      </div>
      <SiteFooter />
    </Page>
  );
}
