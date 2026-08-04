'use client';

import { useMorphy, type TransitionDirection } from '@/components/morphy';
import {
  Sliders,
  X,
  Play,
  Check,
  ChevronUp,
  Dices,
  Search,
  Code2,
  Copy,
  Layers,
  Sparkles,
  Zap,
  ArrowRightLeft,
  Settings2,
  Cpu,
  Command
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const ALL_PLAYGROUND_TRANSITIONS = [
  // Spatial 3D
  { id: 'cube', label: 'Cube 3D', category: 'Spatial', icon: '', hint: '3D isometric box rotate', math: 'perspective: 1200px | rotateY: ±90°' },
  { id: 'flip', label: 'Card Flip', category: 'Spatial', icon: '', hint: 'Vertical axis 3D flip', math: 'rotateY: 90° | perspective: 1000' },
  { id: 'ghost', label: 'Ghost Shift', category: 'Spatial', icon: '', hint: 'Ethereal floating depth blur', math: 'translateZ: -100px | blur: 8px' },
  { id: 'glass', label: 'Glass Refract', category: 'Spatial', icon: '', hint: 'Frosted glass distortion', math: 'backdrop-blur: 24px | scale: 0.95' },
  { id: 'mirror', label: 'Mirror Split', category: 'Spatial', icon: '', hint: 'Symmetrical reflection reveal', math: 'scaleX: -1 → 1' },
  { id: 'shadow', label: 'Shadow Depth', category: 'Spatial', icon: '', hint: 'Deep elevation shadow drop', math: 'box-shadow: 0 40px 100px' },
  { id: 'spin', label: 'Spin Vortex', category: 'Spatial', icon: '', hint: 'Rapid 360° axial rotation', math: 'rotate: 360deg | scale: 0.8' },

  // Portal & Aperture
  { id: 'circular-portal', label: 'Circular Portal', category: 'Portal', icon: '', hint: 'Expanding center iris', math: 'clipPath: circle(0% → 150%)' },
  { id: 'shutter-iris', label: 'Camera Shutter', category: 'Portal', icon: '', hint: 'Mechanical 10-pt aperture', math: 'polygon() mechanical iris' },
  { id: 'wormhole', label: 'Wormhole', category: 'Portal', icon: '', hint: 'Singularity radial suction', math: 'scale: 0.05 | rotate: 180deg' },
  { id: 'vortex', label: 'Vortex Swirl', category: 'Portal', icon: '', hint: 'Centrifugal spiral collapse', math: 'rotate: -720deg | scale: 0.1' },
  { id: 'ripple', label: 'Wave Ripple', category: 'Portal', icon: '', hint: 'Concentric water ring shockwave', math: 'clipPath: radial ripple' },

  // Paper & Origami
  { id: 'page-curl', label: 'Page Curl', category: 'Paper', icon: '', hint: 'Editorial book page curl', math: 'origin: 100% | shadow: 60px' },
  { id: 'fold', label: 'Paper Fold', category: 'Paper', icon: '', hint: 'Origami accordion fold', math: 'rotateX: ±90° | origin: top/bottom' },
  { id: 'origami-unfold', label: 'Origami Unfold', category: 'Paper', icon: '', hint: 'Multi-facet sheet blossom', math: 'rotateY: 90deg | origin: left' },
  { id: 'slash', label: 'Blade Slash', category: 'Paper', icon: '', hint: 'Diagonal split cleave', math: 'polygon() diagonal shear' },

  // Mask & Fluid
  { id: 'ink-spread', label: 'Ink Spread', category: 'Mask', icon: '', hint: 'Organic fluid ink diffusion', math: 'contrast: 1.2 | filter: brightness' },
  { id: 'liquid-morph', label: 'Liquid Morph', category: 'Mask', icon: '', hint: 'Viscous gooey droplet merge', math: 'filter: url(#gooey)' },
  { id: 'wave', label: 'Sine Wave', category: 'Mask', icon: '', hint: 'Curvilinear oscillation wash', math: 'sin() displacement mask' },
  { id: 'wobble', label: 'Jelly Wobble', category: 'Mask', icon: '', hint: 'Elastic gelatin rebound', math: 'skewX: ±15deg | spring' },

  // Retro & Glitch
  { id: 'glitch', label: 'Cyber Glitch', category: 'Retro', icon: '', hint: 'RGB chromatic aberration slice', math: 'translateX: ±20px | clip-path' },
  { id: 'tv-turn-off', label: 'CRT Turn-Off', category: 'Retro', icon: '', hint: 'Vintage tube phosphor collapse', math: 'scaleY: 0.005 → scaleX: 0' },
  { id: 'pixel', label: 'Pixel Dissolve', category: 'Retro', icon: '', hint: '8-bit mosaic pixelation', math: 'mosaic grid dissolve' },
  { id: 'neon', label: 'Neon Flicker', category: 'Retro', icon: '', hint: 'Cyberpunk voltage strobes', math: 'filter: drop-shadow(neon)' },

  // Flow & Bounce
  { id: 'slide', label: 'Slide Flow', category: 'Flow', icon: '', hint: 'Translational directional slide', math: 'translateX: ±100% | spring' },
  { id: 'scale', label: 'Scale Zoom', category: 'Flow', icon: '', hint: 'Cinematic focal zoom', math: 'scale: 0.92 → 1.0 → 1.08' },
  { id: 'fade', label: 'Smooth Fade', category: 'Flow', icon: '', hint: 'Minimalist opacity dissolve', math: 'opacity: 0 → 1' },
  { id: 'bounce', label: 'Elastic Bounce', category: 'Flow', icon: '', hint: 'High-energy rubber ball rebound', math: 'spring(300, 15)' },
  { id: 'dissolve', label: 'Dissolve', category: 'Flow', icon: '', hint: 'Gaussian particle blur crossfade', math: 'blur: 16px | opacity: 0' },
  { id: 'squeeze', label: 'Squeeze & Pop', category: 'Flow', icon: '', hint: 'Squishy horizontal compression', math: 'scaleX: 0.6 | scaleY: 1.4' },
  { id: 'stretch', label: 'Taffy Stretch', category: 'Flow', icon: '', hint: 'Elastic vertical extension', math: 'scaleY: 1.5 | scaleX: 0.8' },
  { id: 'swipe', label: 'Card Swipe', category: 'Flow', icon: '', hint: 'Snappy mobile swipe card', math: 'translateX: 110% | rotate: 5deg' },
  { id: 'zoom', label: 'Hyperspace Zoom', category: 'Flow', icon: '', hint: 'Hyper-speed forward warp', math: 'scale: 3.0 | opacity: 0' },

  // Experimental & Dynamic
  { id: 'blackhole', label: 'Blackhole', category: 'Experimental', icon: '', hint: 'A dynamic blackhole effect.', math: 'custom transition' },
  { id: 'blueprint', label: 'Blueprint', category: 'Dynamic', icon: '', hint: 'The page turns into a glowing architectural blueprint wireframe', math: 'custom transition' },
  { id: 'crystal', label: 'Crystal', category: 'Experimental', icon: '', hint: 'A crystalline structure grows and shatters to reveal the next page', math: 'custom transition' },
  { id: 'dimension', label: 'Dimension', category: 'Experimental', icon: '', hint: 'A dynamic dimension effect.', math: 'custom transition' },
  { id: 'dream', label: 'Dream', category: 'Experimental', icon: '', hint: 'A dynamic dream effect.', math: 'custom transition' },
  { id: 'earth', label: 'Earth', category: 'Experimental', icon: '', hint: 'A dynamic earth effect.', math: 'custom transition' },
  { id: 'fire', label: 'Fire', category: 'Experimental', icon: '', hint: 'A dynamic fire effect.', math: 'custom transition' },
  { id: 'galaxy', label: 'Galaxy', category: 'Experimental', icon: '', hint: 'A dynamic galaxy effect.', math: 'custom transition' },
  { id: 'hologram', label: 'Hologram', category: 'Experimental', icon: '', hint: 'A dynamic hologram effect.', math: 'custom transition' },
  { id: 'ice', label: 'Ice', category: 'Experimental', icon: '', hint: 'A dynamic ice effect.', math: 'custom transition' },
  { id: 'illusion', label: 'Illusion', category: 'Experimental', icon: '', hint: 'A dynamic illusion effect.', math: 'custom transition' },
  { id: 'kaleidoscope', label: 'Kaleidoscope', category: 'Experimental', icon: '', hint: 'A dynamic kaleidoscope effect.', math: 'custom transition' },
  { id: 'laser', label: 'Laser', category: 'Experimental', icon: '', hint: 'A dynamic laser effect.', math: 'custom transition' },
  { id: 'lens-flare', label: 'Lens Flare', category: 'Flow', icon: '', hint: 'A cinematic anamorphic lens flare sweeps across blinding the camera', math: 'custom transition' },
  { id: 'lightning', label: 'Lightning', category: 'Experimental', icon: '', hint: 'A dynamic lightning effect.', math: 'custom transition' },
  { id: 'mosaic', label: 'Mosaic', category: 'Experimental', icon: '', hint: 'A dynamic mosaic effect.', math: 'custom transition' },
  { id: 'nightmare', label: 'Nightmare', category: 'Experimental', icon: '', hint: 'A dynamic nightmare effect.', math: 'custom transition' },
  { id: 'origami-crush', label: 'Origami Crush', category: 'Paper', icon: '', hint: 'The page crumples up into a tiny paper ball and is thrown away', math: 'custom transition' },
  { id: 'paint-drip', label: 'Paint Drip', category: 'Mask', icon: '', hint: 'Virtual paint drips down the screen, washing away the old page', math: 'custom transition' },
  { id: 'planet', label: 'Planet', category: 'Experimental', icon: '', hint: 'A dynamic planet effect.', math: 'custom transition' },
  { id: 'prism', label: 'Prism', category: 'Experimental', icon: '', hint: 'A dynamic prism effect.', math: 'custom transition' },
  { id: 'reality', label: 'Reality', category: 'Experimental', icon: '', hint: 'A dynamic reality effect.', math: 'custom transition' },
  { id: 'shatter', label: 'Shatter', category: 'Experimental', icon: '', hint: 'A dynamic shatter effect.', math: 'custom transition' },
  { id: 'smoke', label: 'Smoke', category: 'Experimental', icon: '', hint: 'A dynamic smoke effect.', math: 'custom transition' },
  { id: 'space', label: 'Space', category: 'Experimental', icon: '', hint: 'A dynamic space effect.', math: 'custom transition' },
  { id: 'spark', label: 'Spark', category: 'Experimental', icon: '', hint: 'A dynamic spark effect.', math: 'custom transition' },
  { id: 'star', label: 'Star', category: 'Experimental', icon: '', hint: 'A dynamic star effect.', math: 'custom transition' },
  { id: 'swirl', label: 'Swirl', category: 'Experimental', icon: '', hint: 'A dynamic swirl effect.', math: 'custom transition' },
  { id: 'time', label: 'Time', category: 'Experimental', icon: '', hint: 'A dynamic time effect.', math: 'custom transition' },
  { id: 'tornado', label: 'Tornado', category: 'Experimental', icon: '', hint: 'A dynamic tornado effect.', math: 'custom transition' },
  { id: 'twirl', label: 'Twirl', category: 'Experimental', icon: '', hint: 'A dynamic twirl effect.', math: 'custom transition' },
  { id: 'universe', label: 'Universe', category: 'Experimental', icon: '', hint: 'A dynamic universe effect.', math: 'custom transition' },
  { id: 'water', label: 'Water', category: 'Experimental', icon: '', hint: 'A dynamic water effect.', math: 'custom transition' },
  { id: 'wind', label: 'Wind', category: 'Experimental', icon: '', hint: 'A dynamic wind effect.', math: 'custom transition' },
  { id: 'wormhole2', label: 'Wormhole2', category: 'Experimental', icon: '', hint: 'A dynamic wormhole2 effect.', math: 'custom transition' },
];

const EASING_PRESETS = ['easeInOut', 'easeOut', 'linear', 'easeIn'] as const;
const DIRECTION_PRESETS: TransitionDirection[] = ['left', 'right', 'up', 'down'];

export function PlaygroundTransitionStudio() {
  const { currentTransition, setTransition, config, setConfig } = useMorphy();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'shaders' | 'physics' | 'export'>('shaders');
  const [searchQuery, setSearchQuery] = useState('');
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
        if (parsed.isOpen !== undefined) setIsOpen(parsed.isOpen);
        if (parsed.activeTab) setActiveTab(parsed.activeTab);
        if (parsed.searchQuery !== undefined) setSearchQuery(parsed.searchQuery);
        if (parsed.activeCategory) setActiveCategory(parsed.activeCategory);
        if (parsed.transition) setTransition(parsed.transition);
        if (parsed.config) setConfig(parsed.config);
      }
    } catch (e) {
      console.error('Failed to parse playground state', e);
    }
  }, [setTransition, setConfig]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('morphy-playground-state', JSON.stringify({
        isOpen,
        activeTab,
        searchQuery,
        activeCategory,
        transition: currentTransition,
        config,
      }));
    } catch (e) {
      console.error('Failed to save playground state', e);
    }
  }, [isOpen, activeTab, searchQuery, activeCategory, currentTransition, config, isMounted]);

  const categories = ['All', 'Spatial', 'Portal', 'Paper', 'Mask', 'Retro', 'Flow'];

  const filteredTransitions = ALL_PLAYGROUND_TRANSITIONS.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const playgroundPages = [
    '/playground/landing',
    '/playground/features',
    '/playground/showcase',
    '/playground/pricing',
    '/playground/about',
  ];

  const currentIndex = playgroundPages.findIndex(p => pathname.includes(p));
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % playgroundPages.length;
  const targetPage = playgroundPages[nextIndex];

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

  const exportCodeSnippet = `// Applied directly to your Page
<Page
  transition="${currentTransition}"
  duration={${duration}}
  direction="${direction}"
  ease="${ease}"
>
  {/* Page Content */}
</Page>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DIRECTIONAL_TRANSITIONS = ['slide', 'swipe', 'stretch', 'squeeze', 'fold', 'flip', 'bounce', 'wave', 'cube'];
  const SPRING_TRANSITIONS = ['bounce', 'wobble'];

  const supportsDirection = DIRECTIONAL_TRANSITIONS.includes(currentTransition);
  const supportsEase = !SPRING_TRANSITIONS.includes(currentTransition);

  return (
    <aside aria-label="Playground Transition Studio" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {isOpen && (
        <div className="w-[420px] max-w-[calc(100vw-2rem)] rounded-[2rem] bg-black/60 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-5 space-y-4 animate-in fade-in zoom-in-95 duration-300 backdrop-blur-3xl text-white">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#fa5c4f]/20 flex items-center justify-center text-[#fa5c4f] border border-[#fa5c4f]/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[11px] font-bold font-mono uppercase tracking-[0.2em] text-white/90">
                  Transition Studio
                </h2>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-0.5">
                  Command Center
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition border border-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub-Tabs (Segmented Control) */}
          <div className="flex p-1 bg-black/40 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest">
            <button
              onClick={() => setActiveTab('shaders')}
              className={`flex-1 py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'shaders'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3 h-3" /> Shaders
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`flex-1 py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'physics'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings2 className="w-3 h-3" /> Physics
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'export'
                  ? 'bg-[#fa5c4f] text-white shadow-md shadow-[#fa5c4f]/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 className="w-3 h-3" /> Export
            </button>
          </div>

          {/* TAB 1: SHADERS */}
          {activeTab === 'shaders' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="SEARCH MODULES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-[#fa5c4f] transition-all"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[9px] font-bold uppercase tracking-widest no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap border ${
                      activeCategory === cat
                        ? 'bg-[#fa5c4f] text-white border-[#fa5c4f]'
                        : 'bg-transparent text-white/40 hover:text-white border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {filteredTransitions.map((t) => {
                  const active = currentTransition === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleFlipPage(t.id)}
                      className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between border relative group ${
                        active
                          ? 'bg-[#fa5c4f]/20 border-[#fa5c4f]/50 shadow-[0_0_15px_rgba(250,92,79,0.2)]'
                          : 'bg-white/5 hover:bg-white/10 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {t.icon ? <span className="text-lg">{t.icon}</span> : <Command className={`w-4 h-4 ${active ? 'text-[#fa5c4f]' : 'text-white/30'}`} />}
                        {active && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#fa5c4f] animate-pulse" />
                        )}
                      </div>
                      <div>
                        <span className={`font-semibold text-xs block tracking-tight ${active ? 'text-white' : 'text-white/80'}`}>{t.label}</span>
                        <span className="text-[9px] uppercase tracking-widest text-white/40 block mt-1 font-mono">{t.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PHYSICS */}
          {activeTab === 'physics' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Duration Engine</span>
                  <span className="font-mono text-xs text-[#fa5c4f] font-bold bg-[#fa5c4f]/10 px-2 py-0.5 rounded-md">{duration.toFixed(2)}s</span>
                </div>

                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={duration}
                  onChange={(e) => setConfig({ duration: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#fa5c4f]"
                />

                <div className="grid grid-cols-4 gap-2">
                  {[0.2, 0.4, 0.6, 1.2].map((val) => (
                    <button
                      key={val}
                      onClick={() => setConfig({ duration: val })}
                      className={`py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                        duration === val
                          ? 'bg-[#fa5c4f] border-[#fa5c4f] text-white'
                          : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                      }`}
                    >
                      {val}s
                    </button>
                  ))}
                </div>
              </div>

              {supportsDirection && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Direction Vector</span>
                  <div className="grid grid-cols-4 gap-2">
                    {DIRECTION_PRESETS.map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setConfig({ direction: dir })}
                        className={`py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all ${
                          direction === dir
                            ? 'bg-[#fa5c4f] border-[#fa5c4f] text-white'
                            : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {supportsEase && (
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">Easing Curve</span>
                  <div className="grid grid-cols-2 gap-2">
                    {EASING_PRESETS.map((easingName) => (
                      <button
                        key={easingName}
                        onClick={() => setConfig({ ease: easingName })}
                        className={`py-1.5 rounded-lg border text-[10px] font-mono font-bold transition-all ${
                          ease === easingName
                            ? 'bg-[#fa5c4f] border-[#fa5c4f] text-white'
                            : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
                        }`}
                      >
                        {easingName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">React Component</span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-full bg-[#fa5c4f]/20 hover:bg-[#fa5c4f] text-[#fa5c4f] hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-black border border-white/10 text-white/70 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
                {exportCodeSnippet}
              </pre>
            </div>
          )}

          {/* Quick Actions Footer */}
          <div className="pt-4 border-t border-white/10">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleSurpriseMe}
                className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all"
              >
                <Dices className="w-3.5 h-3.5 text-amber-500" /> Dice 
              </button>

              <button
                onClick={handleChaosMode}
                className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-purple-500" /> Chaos 
              </button>

              <button
                onClick={() => handleFlipPage()}
                className="py-2.5 rounded-xl bg-[#fa5c4f] hover:bg-[#e54235] text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-lg shadow-[#fa5c4f]/20 transition-all"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" /> Flip
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Floating Launcher HUD Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 pl-5 pr-2 py-2 rounded-full bg-black/60 backdrop-blur-2xl hover:bg-black/80 text-white text-xs font-bold shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 transition-all group"
      >
        <span className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#fa5c4f] shadow-[0_0_10px_rgba(250,92,79,1)] animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-white/50">Active Module:</span>
          <span className="text-[#fa5c4f] font-mono font-bold bg-[#fa5c4f]/10 px-2.5 py-1 rounded-md border border-[#fa5c4f]/20">
            {currentTransition}
          </span>
        </span>
        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#fa5c4f] flex items-center justify-center transition-colors">
          <ChevronUp className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
    </aside>
  );
}
