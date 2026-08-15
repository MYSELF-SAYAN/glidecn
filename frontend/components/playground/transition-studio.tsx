'use client';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { CodeBlock } from '@/components/ui/code-block';
import {
  useGlide,
  type TransitionDirection,
  defaultRegistry,
  EASING_PRESETS as GLIDECN_EASING_PRESETS,
  CATEGORY_LABELS,
} from '@/components/glidecn';
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
import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

/** Capitalize first letter for display (fallback when CATEGORY_LABELS has no entry) */
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Build the playground transition list from the glidecn registry.
 * Each item has { id, label, category } matching what the UI expects.
 */
function buildTransitionList() {
  return defaultRegistry.listDefinitions().map((def) => ({
    id: def.metadata.name,
    label: def.metadata.displayName,
    category: CATEGORY_LABELS[def.metadata.category] ?? capitalize(def.metadata.category),
  }));
}

/** Re-export for any external consumers that previously imported this */
export const ALL_PLAYGROUND_TRANSITIONS = buildTransitionList();

const EASING_PRESETS_LIST = GLIDECN_EASING_PRESETS.filter((e): e is string => typeof e === 'string');
const DIRECTION_PRESETS: TransitionDirection[] = ['left', 'right', 'up', 'down'];

export function PlaygroundTransitionStudio() {
  const { currentTransition, setTransition, config, setConfig, transitionDefinition } = useGlide();

  // Check if the current transition supports direction by inspecting its metadata props
  const supportsDirection = useMemo(() => {
    if (!transitionDefinition?.metadata?.props) return false;
    return transitionDefinition.metadata.props.some((p) => p.name === 'direction');
  }, [transitionDefinition]);
  const { theme, setTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState<'transitions' | 'physics' | 'themes' | 'export'>('transitions');
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
      const saved = localStorage.getItem('glidecn-playground-state');
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
      localStorage.setItem('glidecn-playground-state', JSON.stringify({
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

  const categories = useMemo(() => {
    const uniqueCats = [...new Set(ALL_PLAYGROUND_TRANSITIONS.map((t) => t.category))];
    return ['All', ...uniqueCats];
  }, []);
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
    copyToClipboard(exportCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const key = e.key.toLowerCase();
      if (key === 'f') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Flip', icon: 'flip' } }));
        handleFlipPage();
      } else if (key === 'c') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Chaos Mode', icon: 'zap' } }));
        handleChaosMode();
      } else if (key === 'd') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Surprise Me', icon: 'dices' } }));
        handleSurpriseMe();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [config, activeTheme, activeTab, searchQuery, activeCategory, currentTransition]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col h-full font-sans overflow-hidden relative">
      


      {/* 2. Segmented Control Tabs (iOS Style) */}
      <div className="p-4 border-b border-black/5 dark:border-white/10 shrink-0 z-10 bg-white/40 dark:bg-black/20 backdrop-blur-xl">
        <div className="flex p-1 gap-1 bg-black/5 dark:bg-white/5 rounded-[14px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
          {[
            { id: 'transitions', icon: Layers, label: 'Transitions' },
            { id: 'physics', icon: Settings2, label: 'Physics' },
            { id: 'themes', icon: Sparkles, label: 'Themes' },
            { id: 'export', icon: Code2, label: 'Code' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex-1 py-1.5 relative rounded-[10px] flex justify-center items-center text-xs font-medium transition-all duration-200 ease-out active:scale-[0.96]"
                title={tab.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/10"
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-[var(--text-main)] drop-shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>
                  <tab.icon className="w-4 h-4" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Main Editor Panel (Scrollable) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 pb-24 relative z-0">
        
        {/* TAB 1: TRANSITIONS */}
        {activeTab === 'transitions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="relative group">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[var(--text-main)]" />
              <input
                type="text"
                placeholder="Search transitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-[14px] bg-black/5 dark:bg-white/5 border border-transparent text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:bg-white dark:focus:bg-zinc-800 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] focus:ring-1 focus:ring-black/10 dark:focus:ring-white/20 focus:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all duration-200 active:scale-95 ${
                    activeCategory === cat
                      ? 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
                      : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'
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
                    className={`p-3.5 rounded-2xl text-left flex flex-col gap-1 transition-all duration-300 relative overflow-hidden group active:scale-[0.98] ${
                      active
                        ? 'bg-white dark:bg-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-black/10 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/10'
                        : 'bg-black/[0.02] dark:bg-white/[0.02] border border-transparent hover:bg-white dark:hover:bg-zinc-800 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:border-black/5 dark:hover:border-white/5'
                    }`}
                  >
                    <span className={`text-[13px] font-semibold tracking-tight ${active ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]'}`}>
                      {t.label}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wider uppercase opacity-70">
                      {t.category}
                    </span>
                    {active && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />}
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
              <div className="flex items-center justify-between text-xs font-semibold tracking-tight text-[var(--text-muted)]">
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
                className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-[var(--text-main)] hover:bg-black/15 dark:hover:bg-white/15 transition-colors"
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[0.2, 0.4, 0.6, 1.2].map((val) => (
                  <button
                    key={val}
                    onClick={() => setConfig({ duration: val })}
                    className={`py-1.5 rounded-xl text-[11px] font-semibold transition-all active:scale-95 ${
                      duration === val ? 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {val}s
                  </button>
                ))}
              </div>
            </div>

            {supportsDirection && (
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
            )}

            <div className="space-y-3 pt-6 border-t border-black/5 dark:border-white/10">
              <span className="text-[10px] font-bold tracking-widest text-[var(--text-muted)] uppercase block">Curve</span>
              <div className="grid grid-cols-2 gap-2">
                {EASING_PRESETS_LIST.map((easingName) => (
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
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-between transition-all duration-200 active:scale-[0.98] ${
                      activeTheme === t.id ? 'bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/20 text-[var(--text-main)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] ring-1 ring-black/5 dark:ring-white/10' : 'bg-white/40 dark:bg-black/20 border border-transparent text-[var(--text-muted)] hover:bg-white/90 dark:hover:bg-zinc-800/90 hover:border-black/5 dark:hover:border-white/10 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
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
              <div className="flex p-1 gap-1 bg-black/5 dark:bg-white/5 rounded-[14px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
                <button
                  onClick={() => setTheme('light')}
                  className="flex-1 py-1.5 relative rounded-[10px] flex justify-center items-center text-xs font-medium transition-all active:scale-[0.96]"
                >
                  {theme === 'light' && (
                    <motion.div layoutId="active-mode" className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/10" transition={{ type: "spring", bounce: 0, duration: 0.3 }} />
                  )}
                  <span className={`relative z-10 ${theme === 'light' ? 'text-[var(--text-main)] drop-shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Light</span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className="flex-1 py-1.5 relative rounded-[10px] flex justify-center items-center text-xs font-medium transition-all active:scale-[0.96]"
                >
                  {theme === 'dark' && (
                    <motion.div layoutId="active-mode" className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/10" transition={{ type: "spring", bounce: 0, duration: 0.3 }} />
                  )}
                  <span className={`relative z-10 ${theme === 'dark' ? 'text-[var(--text-main)] drop-shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Dark</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: EXPORT */}
        {activeTab === 'export' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 select-text">
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
              <span className="text-[var(--text-muted)]">Source</span>

            </div>
            <div className="mt-4 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <CodeBlock code={exportCodeSnippet} language="tsx" className="!my-0 !border-none !rounded-none" />
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Copy this snippet and wrap your page content with the <code className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded-md font-mono text-[10px] text-[var(--text-main)]">{'<Page>'}</code> component to apply the current transition in your own application.
            </p>
          </motion.div>
        )}
        
      </div>

      {/* 4. Action Footer (Absolute to bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-black/5 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl grid grid-cols-3 gap-2 z-20">
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Surprise Me', icon: 'dices' } }));
            handleSurpriseMe();
          }}
          title="Dice (D)"
          className="py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[var(--text-muted)] hover:text-[var(--text-main)] text-[10px] uppercase font-bold tracking-wider flex flex-row items-center justify-center gap-1.5 transition-all hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.98] group relative"
        >
          <Dices className="w-3.5 h-3.5 text-amber-500" /> <span className="hidden sm:inline">Dice</span>
          <kbd className="absolute -top-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">D</kbd>
        </button>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Chaos Mode', icon: 'zap' } }));
            handleChaosMode();
          }}
          title="Chaos (C)"
          className="py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[var(--text-muted)] hover:text-[var(--text-main)] text-[10px] uppercase font-bold tracking-wider flex flex-row items-center justify-center gap-1.5 transition-all hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.98] group relative"
        >
          <Zap className="w-3.5 h-3.5 text-purple-500" /> <span className="hidden sm:inline">Chaos</span>
          <kbd className="absolute -top-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-[var(--text-main)] opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">C</kbd>
        </button>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('shortcut-feedback', { detail: { text: 'Flip', icon: 'flip' } }));
            handleFlipPage();
          }}
          title="Flip (F)"
          className="py-2.5 rounded-xl bg-[var(--text-main)] text-[var(--bg-page)] font-bold text-[10px] uppercase tracking-wider flex flex-row items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)] hover:-translate-y-[1px] transition-all active:scale-[0.98] group relative"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Flip</span>
          <kbd className="absolute -top-8 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-zinc-800/90 text-[10px] font-mono text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity border border-black/5 dark:border-white/10 shadow-sm pointer-events-none">F</kbd>
        </button>
      </div>

    </div>
  );
}
