'use client';

import { Page, useMorphy } from '@/components/morphy';
import { ALL_PLAYGROUND_TRANSITIONS } from '@/components/playground/transition-studio';
import {
  ArrowLeft,
  Dices,
  Zap,
  LayoutGrid,
  Search,
  Command
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlaygroundPageTwo() {
  const { currentTransition, setTransition, config, setConfig } = useMorphy();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const categories = ['All', 'Spatial', 'Portal', 'Paper', 'Mask', 'Retro', 'Flow', 'Experimental', 'Dynamic'];

  const filteredTransitions = ALL_PLAYGROUND_TRANSITIONS.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch =
      t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJumpToPageOne = (transitionId?: string) => {
    if (transitionId) setTransition(transitionId);
    setTimeout(() => router.push('/playground/page-1'), 10);
  };

  const handleSurpriseJump = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const preservedConfig = { ...config };
    setTransition(randomTransition.id);
    setConfig(preservedConfig);
    setTimeout(() => router.push('/playground/page-1'), 10);
  };

  const handleChaosJump = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const randomDuration = Number((Math.random() * 1.4 + 0.2).toFixed(2));
    const directions = ['left', 'right', 'up', 'down'] as const;
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    setTransition(randomTransition.id);
    setConfig({ duration: randomDuration, direction: randomDirection });
    setTimeout(() => router.push('/playground/page-1'), 10);
  };

  return (
    <Page>
      <div className="min-h-screen bg-[#f4f4f0] text-[#1a1a1a] font-sans selection:bg-[#fa5c4f]/20">
        
        {/* Subtle Background Texture */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-24 sm:py-32 space-y-24">
          
          {/* HEADER HERO - EDITORIAL */}
          <header className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-xl shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Live Sandbox Environment</span>
              <span className="border-l border-black/10 h-3 mx-2" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#fa5c4f]">Page 2 / Detail View</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl sm:text-8xl font-light tracking-tighter font-display leading-[0.9]">
                Absolute<br />
                <span className="text-[#fa5c4f] italic font-cursive">Precision.</span>
              </h1>
              <p className="text-sm sm:text-base text-black/60 max-w-xl mx-auto leading-relaxed font-light">
                Notice the stark contrast in lighting and layout. Trigger a module below to execute a return transition back to <span className="font-medium text-black">Page 1</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleJumpToPageOne()}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white hover:bg-black/80 text-xs font-bold uppercase tracking-widest shadow-xl transition-all hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Return to Page 1</span>
              </button>

              <button
                onClick={handleSurpriseJump}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-white/90 border border-black/5 text-black text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
              >
                <Dices className="w-4 h-4 text-amber-500" /> 
                <span>Surprise Me</span>
              </button>

              <button
                onClick={handleChaosJump}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-white/90 border border-black/5 text-black text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
              >
                <Zap className="w-4 h-4 text-purple-500" /> 
                <span>Chaos Mode</span>
              </button>
            </div>
          </header>

          {/* MAIN SHADER MATRIX - LIGHT THEME */}
          <section className="space-y-8 relative">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 rounded-[2rem] border border-black/5 bg-white/70 backdrop-blur-2xl shadow-xl sticky top-24 z-30">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shadow-md">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-black tracking-wide">Shader Matrix</h2>
                  <p className="text-[10px] uppercase tracking-widest text-black/50 font-bold">{filteredTransitions.length} Modules Active</p>
                </div>
              </div>

              <div className="flex flex-1 max-w-md gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-black/30 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search shaders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-black/5 border border-black/10 text-xs text-black placeholder-black/40 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap border ${
                    activeCategory === cat
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white text-black/60 border-black/10 hover:bg-black/5 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTransitions.map((t) => {
                const isActive = currentTransition === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleJumpToPageOne(t.id)}
                    className={`group relative flex flex-col justify-between p-6 rounded-[2rem] border text-left transition-all duration-300 overflow-hidden hover:-translate-y-1 ${
                      isActive
                        ? 'bg-white border-[#fa5c4f] ring-1 ring-[#fa5c4f]/30 shadow-[0_10px_30px_rgba(250,92,79,0.15)]'
                        : 'bg-white border-black/5 hover:border-black/10 shadow-sm hover:shadow-xl'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-black/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-[#f4f4f0] border border-black/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {t.icon ? (
                          <span className="text-xl">{t.icon}</span>
                        ) : (
                          <Command className={`w-5 h-5 ${isActive ? 'text-[#fa5c4f]' : 'text-black/40'}`} />
                        )}
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-black/40 font-bold px-2 py-1 rounded-md bg-black/5 border border-black/5">
                        {t.category}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <h4 className={`font-light text-lg tracking-tight ${isActive ? 'text-[#fa5c4f]' : 'text-black'} group-hover:text-black transition-colors`}>
                        {t.label}
                      </h4>
                      <p className="text-[10px] text-black/50 leading-relaxed uppercase tracking-wider font-bold">
                        {t.hint}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-black/5 flex items-center justify-between w-full relative z-10">
                      <ArrowLeft className="w-3.5 h-3.5 text-black/20 group-hover:text-[#fa5c4f] group-hover:-translate-x-1 transition-all" />
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-black/30 group-hover:text-[#fa5c4f] transition-colors flex items-center gap-2">
                        Execute Return
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </Page>
  );
}
