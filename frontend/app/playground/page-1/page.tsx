'use client';

import { Page, useMorphy } from '@/components/morphy';
import { ALL_PLAYGROUND_TRANSITIONS } from '@/components/playground/transition-studio';
import {
  ArrowRight,
  Dices,
  Zap,
  Sliders,
  Search,
  Sparkles,
  Command,
  LayoutGrid
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlaygroundPageOne() {
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

  const handleJumpToPageTwo = (transitionId?: string) => {
    if (transitionId) setTransition(transitionId);
    setTimeout(() => router.push('/playground/page-2'), 10);
  };

  const handleSurpriseJump = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const preservedConfig = { ...config };
    setTransition(randomTransition.id);
    setConfig(preservedConfig);
    setTimeout(() => router.push('/playground/page-2'), 10);
  };

  const handleChaosJump = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const randomDuration = Number((Math.random() * 1.4 + 0.2).toFixed(2));
    const directions = ['left', 'right', 'up', 'down'] as const;
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    setTransition(randomTransition.id);
    setConfig({ duration: randomDuration, direction: randomDirection });
    setTimeout(() => router.push('/playground/page-2'), 10);
  };

  return (
    <Page>
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#fa5c4f]/30">
        
        {/* Ambient Background Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#fa5c4f]/10 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-24 sm:py-32 space-y-24">
          
          {/* HEADER HERO */}
          <header className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Live Sandbox Environment</span>
              <span className="border-l border-white/10 h-3 mx-2" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#fa5c4f]">Page 1 / Index</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-light tracking-tighter font-display leading-[1.1]">
                Interactive<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic font-cursive">Transitions.</span>
              </h1>
              <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed font-light">
                Select a shader module below to trigger an immediate route transition. Experience GPU-accelerated page transitions seamlessly traversing into <span className="text-white">Page 2</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleJumpToPageTwo()}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#fa5c4f] hover:bg-[#e54235] text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_40px_rgba(250,92,79,0.3)] transition-all hover:-translate-y-0.5"
              >
                <span>Enter Page 2</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleSurpriseJump}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-xl"
              >
                <Dices className="w-4 h-4 text-amber-500" /> 
                <span>Surprise Me</span>
              </button>

              <button
                onClick={handleChaosJump}
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-xl"
              >
                <Zap className="w-4 h-4 text-purple-500" /> 
                <span>Chaos Mode</span>
              </button>
            </div>
          </header>

          {/* MAIN SHADER MATRIX */}
          <section className="space-y-8 relative">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl sticky top-24 z-30">
              <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-[#fa5c4f]/20 flex items-center justify-center text-[#fa5c4f] border border-[#fa5c4f]/30">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-wide">Shader Matrix</h2>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{filteredTransitions.length} Modules Active</p>
                </div>
              </div>

              <div className="flex flex-1 max-w-md gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search shaders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#fa5c4f]/50 focus:ring-1 focus:ring-[#fa5c4f]/50 transition-all"
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
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-black/20 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
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
                    onClick={() => handleJumpToPageTwo(t.id)}
                    className={`group relative flex flex-col justify-between p-6 rounded-[2rem] border text-left transition-all duration-300 overflow-hidden hover:-translate-y-1 ${
                      isActive
                        ? 'bg-[#fa5c4f]/10 border-[#fa5c4f]/50 ring-1 ring-[#fa5c4f]/30 shadow-[0_0_30px_rgba(250,92,79,0.15)]'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {t.icon ? (
                          <span className="text-xl">{t.icon}</span>
                        ) : (
                          <Command className={`w-5 h-5 ${isActive ? 'text-[#fa5c4f]' : 'text-white/40'}`} />
                        )}
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 font-bold px-2 py-1 rounded-md bg-black/40 border border-white/5">
                        {t.category}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <h4 className={`font-light text-lg tracking-tight ${isActive ? 'text-[#fa5c4f]' : 'text-white'} group-hover:text-white transition-colors`}>
                        {t.label}
                      </h4>
                      <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider font-bold">
                        {t.hint}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between w-full relative z-10">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/30 group-hover:text-[#fa5c4f] transition-colors flex items-center gap-2">
                        Execute Transition
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#fa5c4f] group-hover:translate-x-1 transition-all" />
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
