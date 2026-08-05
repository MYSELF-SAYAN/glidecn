'use client';

import { useMorphy, type TransitionDirection } from '@/components/morphy';
import {
  Layers,
  Settings2,
  Sparkles,
  Code2,
  Check,
  Copy,
  LayoutGrid,
  Type,
  Box,
  MonitorPlay,
  Terminal,
  Search,
  Dices,
  Zap,
  ArrowRightLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export const ALL_PLAYGROUND_TRANSITIONS = [
  // Spatial 3D
  { id: 'cube', label: 'Cube 3D', category: 'Spatial' },
  { id: 'flip', label: 'Card Flip', category: 'Spatial' },
  { id: 'ghost', label: 'Ghost Shift', category: 'Spatial' },
  { id: 'glass', label: 'Glass Refract', category: 'Spatial' },
  { id: 'mirror', label: 'Mirror Split', category: 'Spatial' },
  { id: 'shadow', label: 'Shadow Depth', category: 'Spatial' },
  { id: 'spin', label: 'Spin Vortex', category: 'Spatial' },
  // Portal & Aperture
  { id: 'circular-portal', label: 'Circular Portal', category: 'Portal' },
  { id: 'shutter-iris', label: 'Camera Shutter', category: 'Portal' },
  { id: 'wormhole', label: 'Wormhole', category: 'Portal' },
  { id: 'vortex', label: 'Vortex Swirl', category: 'Portal' },
  { id: 'ripple', label: 'Wave Ripple', category: 'Portal' },
  // Paper & Origami
  { id: 'page-curl', label: 'Page Curl', category: 'Paper' },
  { id: 'fold', label: 'Paper Fold', category: 'Paper' },
  { id: 'origami-unfold', label: 'Origami Unfold', category: 'Paper' },
  { id: 'slash', label: 'Blade Slash', category: 'Paper' },
  // Mask & Fluid
  { id: 'ink-spread', label: 'Ink Spread', category: 'Mask' },
  { id: 'liquid-morph', label: 'Liquid Morph', category: 'Mask' },
  { id: 'wave', label: 'Sine Wave', category: 'Mask' },
  { id: 'wobble', label: 'Jelly Wobble', category: 'Mask' },
  // Retro & Glitch
  { id: 'glitch', label: 'Cyber Glitch', category: 'Retro' },
  { id: 'tv-turn-off', label: 'CRT Turn-Off', category: 'Retro' },
  { id: 'pixel', label: 'Pixel Dissolve', category: 'Retro' },
  { id: 'neon', label: 'Neon Flicker', category: 'Retro' },
  // Flow & Bounce
  { id: 'slide', label: 'Slide Flow', category: 'Flow' },
  { id: 'scale', label: 'Scale Zoom', category: 'Flow' },
  { id: 'fade', label: 'Smooth Fade', category: 'Flow' },
  { id: 'bounce', label: 'Elastic Bounce', category: 'Flow' },
  { id: 'dissolve', label: 'Dissolve', category: 'Flow' },
  { id: 'squeeze', label: 'Squeeze & Pop', category: 'Flow' },
  { id: 'stretch', label: 'Taffy Stretch', category: 'Flow' },
  { id: 'swipe', label: 'Card Swipe', category: 'Flow' },
  { id: 'zoom', label: 'Hyperspace Zoom', category: 'Flow' }
];

const EASING_PRESETS = ['easeInOut', 'easeOut', 'linear', 'easeIn'] as const;
const DIRECTION_PRESETS: TransitionDirection[] = ['left', 'right', 'up', 'down'];

export function PlaygroundTransitionStudio() {
  const { currentTransition, setTransition, config, setConfig } = useMorphy();
  const { theme, setTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'shaders' | 'physics' | 'themes' | 'export'>('shaders');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState('zinc');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('morphy-playground-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.searchQuery !== undefined) setSearchQuery(parsed.searchQuery);
        if (parsed.activeCategory) setActiveCategory(parsed.activeCategory);
        if (parsed.transition) setTransition(parsed.transition);
        if (parsed.config) setConfig(parsed.config);
        if (parsed.activeTheme) setActiveTheme(parsed.activeTheme);
        
        const playgroundRoot = document.getElementById('playground-root');
        if (playgroundRoot) {
          playgroundRoot.setAttribute('data-theme', parsed.activeTheme || 'zinc');
        }
      }
    } catch (e) {
      console.error('Failed to parse playground state', e);
    }
  }, [setTransition, setConfig]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('morphy-playground-state', JSON.stringify({
        activeTab,
        searchQuery,
        activeCategory,
        transition: currentTransition,
        config,
        activeTheme
      }));
      
      const playgroundRoot = document.getElementById('playground-root');
      if (playgroundRoot) {
        playgroundRoot.setAttribute('data-theme', activeTheme);
      }
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }, [activeTab, searchQuery, activeCategory, currentTransition, config, activeTheme, isMounted]);

  const categories = ['All', 'Spatial', 'Portal', 'Paper', 'Mask', 'Retro', 'Flow'];
  const filteredTransitions = ALL_PLAYGROUND_TRANSITIONS.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const LABS = [
    { name: 'Interactive Stage', path: '/playground/landing', icon: Terminal },
    { name: 'Bento Matrix', path: '/playground/features', icon: LayoutGrid },
    { name: 'Typography Engine', path: '/playground/pricing', icon: Type },
    { name: 'Kinetic Components', path: '/playground/about', icon: Box },
    { name: 'Media Telemetry', path: '/playground/showcase', icon: MonitorPlay }
  ];

  const currentIndex = LABS.findIndex(p => pathname.includes(p.path));
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % LABS.length;
  const targetPage = LABS[nextIndex].path;

  const handleFlipPage = (customTransition?: string) => {
    if (customTransition) setTransition(customTransition);
    setTimeout(() => router.push(targetPage), 10);
  };

  const handleSurpriseMe = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const preservedConfig = { ...config };
    setTransition(randomTransition.id);
    setConfig(preservedConfig);
    setTimeout(() => router.push(targetPage), 10);
  };

  const handleChaosMode = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const randomDuration = Number((Math.random() * 1.4 + 0.2).toFixed(2));
    const randomDirection = DIRECTION_PRESETS[Math.floor(Math.random() * DIRECTION_PRESETS.length)];
    setTransition(randomTransition.id);
    setConfig({ duration: randomDuration, direction: randomDirection });
    setTimeout(() => router.push(targetPage), 10);
  };

  const duration = config.duration ?? 0.6;
  const direction = config.direction ?? 'left';
  const ease = (config.ease as string) ?? 'easeInOut';

  const exportCodeSnippet = `<Page\n  transition="${currentTransition}"\n  duration={${duration}}\n  direction="${direction}"\n  ease="${ease}"\n>\n  {/* Content */}\n</Page>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col h-full font-sans select-none overflow-hidden relative">
      
      {/* 1. Navigation / Labs */}
      <div className="p-4 border-b border-black/5 dark:border-white/10 space-y-1 overflow-y-auto max-h-[30vh] shrink-0 custom-scrollbar z-10 bg-white/20 dark:bg-black/10 backdrop-blur-md">
        <div className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase mb-3 px-2">Scenes</div>
        {LABS.map((lab) => {
          const isActive = pathname.includes(lab.path);
          return (
            <button
              key={lab.path}
              onClick={() => router.push(lab.path)}
              className="w-full relative px-3 py-2.5 rounded-xl text-sm transition-colors text-left group"
            >
              {isActive && (
                <motion.div
                  layoutId="active-lab"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/10"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
              )}
              <div className={`relative flex items-center gap-3 z-10 ${isActive ? 'text-[var(--text-main)] font-medium' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>
                <lab.icon className="w-4 h-4" />
                {lab.name}
              </div>
            </button>
          )
        })}
      </div>

      {/* 2. Segmented Control Tabs (iOS Style) */}
      <div className="p-4 border-b border-black/5 dark:border-white/10 shrink-0 z-10">
        <div className="flex p-1 gap-1 bg-black/5 dark:bg-white/10 rounded-xl">
          {[
            { id: 'shaders', icon: Layers, label: 'Layers' },
            { id: 'physics', icon: Settings2, label: 'Physics' },
            { id: 'themes', icon: Sparkles, label: 'Themes' },
            { id: 'export', icon: Code2, label: 'Code' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex-1 py-1.5 relative rounded-lg flex justify-center items-center text-xs font-medium transition-colors"
                title={tab.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-black/5 dark:border-white/10"
                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>
                  <tab.icon className="w-4 h-4" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Main Editor Panel (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-24 relative z-0">
        
        {/* TAB 1: SHADERS */}
        {activeTab === 'shaders' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:bg-white dark:focus:bg-black/40 transition-colors shadow-inner"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-colors ${
                    activeCategory === cat
                      ? 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-md'
                      : 'bg-black/5 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredTransitions.map((t) => {
                const active = currentTransition === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleFlipPage(t.id)}
                    className={`p-3.5 rounded-2xl text-left flex flex-col gap-1 transition-all duration-300 relative overflow-hidden group ${
                      active
                        ? 'bg-white dark:bg-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-black/10 dark:border-white/20'
                        : 'bg-white/40 dark:bg-black/20 border border-transparent hover:bg-white/80 dark:hover:bg-zinc-800/80 hover:border-black/5 dark:hover:border-white/10'
                    }`}
                  >
                    <span className={`text-[13px] font-medium tracking-tight ${active ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>
                      {t.label}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wider uppercase opacity-70">
                      {t.category}
                    </span>
                    {active && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 2: PHYSICS */}
        {activeTab === 'physics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
                <span>Duration</span>
                <span className="text-[var(--text-main)] font-mono">{duration.toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.05"
                value={duration}
                onChange={(e) => setConfig({ duration: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-full appearance-none cursor-pointer accent-[var(--text-main)]"
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[0.2, 0.4, 0.6, 1.2].map((val) => (
                  <button
                    key={val}
                    onClick={() => setConfig({ duration: val })}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                      duration === val ? 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-md' : 'bg-black/5 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {val}s
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-black/5 dark:border-white/10">
              <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase block">Vector</span>
              <div className="grid grid-cols-2 gap-2">
                {DIRECTION_PRESETS.map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setConfig({ direction: dir })}
                    className={`py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                      direction === dir ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm border border-black/10 dark:border-white/20' : 'bg-black/5 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] border border-transparent'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-black/5 dark:border-white/10">
              <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase block">Curve</span>
              <div className="grid grid-cols-2 gap-2">
                {EASING_PRESETS.map((easingName) => (
                  <button
                    key={easingName}
                    onClick={() => setConfig({ ease: easingName })}
                    className={`py-2 rounded-xl text-xs font-medium transition-colors ${
                      ease === easingName ? 'bg-white dark:bg-zinc-800 text-[var(--text-main)] shadow-sm border border-black/10 dark:border-white/20' : 'bg-black/5 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] border border-transparent'
                    }`}
                  >
                    {easingName}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 3: THEMES */}
        {activeTab === 'themes' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase block">Accent</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'zinc', label: 'Zinc', hex: '#71717a' },
                  { id: 'slate', label: 'Slate', hex: '#64748b' },
                  { id: 'ocean', label: 'Ocean', hex: '#0ea5e9' },
                  { id: 'indigo', label: 'Indigo', hex: '#6366f1' },
                  { id: 'emerald', label: 'Emerald', hex: '#10b981' },
                  { id: 'teal', label: 'Teal', hex: '#14b8a6' },
                  { id: 'amber', label: 'Amber', hex: '#f59e0b' },
                  { id: 'violet', label: 'Violet', hex: '#8b5cf6' },
                  { id: 'rose', label: 'Rose', hex: '#f43f5e' },
                  { id: 'crimson', label: 'Crimson', hex: '#ef4444' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTheme(t.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                      activeTheme === t.id ? 'bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/20 text-[var(--text-main)] shadow-[0_4px_12px_rgba(0,0,0,0.05)]' : 'bg-white/40 dark:bg-black/20 border border-transparent text-[var(--text-muted)] hover:bg-white/80 dark:hover:bg-zinc-800/80 hover:border-black/5 dark:hover:border-white/10'
                    }`}
                  >
                    {t.label}
                    <span className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: t.hex }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-black/5 dark:border-white/10 pt-6">
              <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase block">Mode</span>
              <div className="flex p-1 gap-1 bg-black/5 dark:bg-white/10 rounded-xl">
                <button
                  onClick={() => setTheme('light')}
                  className="flex-1 py-1.5 relative rounded-lg flex justify-center items-center text-xs font-medium transition-colors"
                >
                  {theme === 'light' && (
                    <motion.div layoutId="active-mode" className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-black/5 dark:border-white/10" transition={{ type: "spring", bounce: 0, duration: 0.3 }} />
                  )}
                  <span className={`relative z-10 ${theme === 'light' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className="flex-1 py-1.5 relative rounded-lg flex justify-center items-center text-xs font-medium transition-colors"
                >
                  {theme === 'dark' && (
                    <motion.div layoutId="active-mode" className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-black/5 dark:border-white/10" transition={{ type: "spring", bounce: 0, duration: 0.3 }} />
                  )}
                  <span className={`relative z-10 ${theme === 'dark' ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Dark</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: EXPORT */}
        {activeTab === 'export' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
              <span className="text-[var(--text-muted)]">Source</span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-full bg-[var(--text-main)] text-[var(--bg-page)] flex items-center gap-1.5 hover:scale-105 transition-transform shadow-md"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="p-5 rounded-2xl bg-white/50 dark:bg-black/30 border border-black/5 dark:border-white/10 text-[var(--text-muted)] font-mono text-[11px] leading-loose overflow-x-auto shadow-inner">
              {exportCodeSnippet}
            </pre>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Copy this snippet and wrap your page content with the <code className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded-md font-mono text-[10px] text-[var(--text-main)]">{'<Page>'}</code> component to apply the current transition in your own application.
            </p>
          </motion.div>
        )}
        
      </div>

      {/* 4. Action Footer (Absolute to bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-2xl grid grid-cols-3 gap-2 z-20">
        <button
          onClick={handleSurpriseMe}
          className="py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] text-[10px] uppercase font-bold tracking-wider flex flex-row items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <Dices className="w-3.5 h-3.5 text-amber-500" /> <span className="hidden sm:inline">Dice</span>
        </button>
        <button
          onClick={handleChaosMode}
          className="py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] text-[10px] uppercase font-bold tracking-wider flex flex-row items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <Zap className="w-3.5 h-3.5 text-purple-500" /> <span className="hidden sm:inline">Chaos</span>
        </button>
        <button
          onClick={() => handleFlipPage()}
          className="py-2.5 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] font-bold text-[10px] uppercase tracking-wider flex flex-row items-center justify-center gap-1.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Flip</span>
        </button>
      </div>

    </div>
  );
}
