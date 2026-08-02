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
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const ALL_PLAYGROUND_TRANSITIONS = [
  // Spatial 3D
  { id: 'cube', label: 'Cube 3D', category: 'Spatial', icon: '🧊', hint: '3D isometric box rotate', math: 'perspective: 1200px | rotateY: ±90°' },
  { id: 'flip', label: 'Card Flip', category: 'Spatial', icon: '🃏', hint: 'Vertical axis 3D flip', math: 'rotateY: 90° | perspective: 1000' },
  { id: 'ghost', label: 'Ghost Shift', category: 'Spatial', icon: '👻', hint: 'Ethereal floating depth blur', math: 'translateZ: -100px | blur: 8px' },
  { id: 'glass', label: 'Glass Refract', category: 'Spatial', icon: '🪟', hint: 'Frosted glass distortion', math: 'backdrop-blur: 24px | scale: 0.95' },
  { id: 'mirror', label: 'Mirror Split', category: 'Spatial', icon: '🪞', hint: 'Symmetrical reflection reveal', math: 'scaleX: -1 → 1' },
  { id: 'shadow', label: 'Shadow Depth', category: 'Spatial', icon: '🌑', hint: 'Deep elevation shadow drop', math: 'box-shadow: 0 40px 100px' },
  { id: 'spin', label: 'Spin Vortex', category: 'Spatial', icon: '💫', hint: 'Rapid 360° axial rotation', math: 'rotate: 360deg | scale: 0.8' },

  // Portal & Aperture
  { id: 'circular-portal', label: 'Circular Portal', category: 'Portal', icon: '🌀', hint: 'Expanding center iris', math: 'clipPath: circle(0% → 150%)' },
  { id: 'shutter-iris', label: 'Camera Shutter', category: 'Portal', icon: '📷', hint: 'Mechanical 10-pt aperture', math: 'polygon() mechanical iris' },
  { id: 'wormhole', label: 'Wormhole', category: 'Portal', icon: '🕳️', hint: 'Singularity radial suction', math: 'scale: 0.05 | rotate: 180deg' },
  { id: 'vortex', label: 'Vortex Swirl', category: 'Portal', icon: '🌪️', hint: 'Centrifugal spiral collapse', math: 'rotate: -720deg | scale: 0.1' },
  { id: 'ripple', label: 'Wave Ripple', category: 'Portal', icon: '🌊', hint: 'Concentric water ring shockwave', math: 'clipPath: radial ripple' },

  // Paper & Origami
  { id: 'page-curl', label: 'Page Curl', category: 'Paper', icon: '📜', hint: 'Editorial book page curl', math: 'origin: 100% | shadow: 60px' },
  { id: 'fold', label: 'Paper Fold', category: 'Paper', icon: '📐', hint: 'Origami accordion fold', math: 'rotateX: ±90° | origin: top/bottom' },
  { id: 'origami-unfold', label: 'Origami Unfold', category: 'Paper', icon: '🦢', hint: 'Multi-facet sheet blossom', math: 'rotateY: 90deg | origin: left' },
  { id: 'slash', label: 'Blade Slash', category: 'Paper', icon: '⚔️', hint: 'Diagonal split cleave', math: 'polygon() diagonal shear' },

  // Mask & Fluid
  { id: 'ink-spread', label: 'Ink Spread', category: 'Mask', icon: '🖋️', hint: 'Organic fluid ink diffusion', math: 'contrast: 1.2 | filter: brightness' },
  { id: 'liquid-morph', label: 'Liquid Morph', category: 'Mask', icon: '🧪', hint: 'Viscous gooey droplet merge', math: 'filter: url(#gooey)' },
  { id: 'wave', label: 'Sine Wave', category: 'Mask', icon: '〰️', hint: 'Curvilinear oscillation wash', math: 'sin() displacement mask' },
  { id: 'wobble', label: 'Jelly Wobble', category: 'Mask', icon: '🍮', hint: 'Elastic gelatin rebound', math: 'skewX: ±15deg | spring' },

  // Retro & Glitch
  { id: 'glitch', label: 'Cyber Glitch', category: 'Retro', icon: '👾', hint: 'RGB chromatic aberration slice', math: 'translateX: ±20px | clip-path' },
  { id: 'tv-turn-off', label: 'CRT Turn-Off', category: 'Retro', icon: '📺', hint: 'Vintage tube phosphor collapse', math: 'scaleY: 0.005 → scaleX: 0' },
  { id: 'pixel', label: 'Pixel Dissolve', category: 'Retro', icon: '🟩', hint: '8-bit mosaic pixelation', math: 'mosaic grid dissolve' },
  { id: 'neon', label: 'Neon Flicker', category: 'Retro', icon: '💡', hint: 'Cyberpunk voltage strobes', math: 'filter: drop-shadow(neon)' },

  // Flow & Bounce
  { id: 'slide', label: 'Slide Flow', category: 'Flow', icon: '➡️', hint: 'Translational directional slide', math: 'translateX: ±100% | spring' },
  { id: 'scale', label: 'Scale Zoom', category: 'Flow', icon: '🔍', hint: 'Cinematic focal zoom', math: 'scale: 0.92 → 1.0 → 1.08' },
  { id: 'fade', label: 'Smooth Fade', category: 'Flow', icon: '✨', hint: 'Minimalist opacity dissolve', math: 'opacity: 0 → 1' },
  { id: 'bounce', label: 'Elastic Bounce', category: 'Flow', icon: '🏀', hint: 'High-energy rubber ball rebound', math: 'spring(300, 15)' },
  { id: 'dissolve', label: 'Dissolve', category: 'Flow', icon: '🌫️', hint: 'Gaussian particle blur crossfade', math: 'blur: 16px | opacity: 0' },
  { id: 'squeeze', label: 'Squeeze & Pop', category: 'Flow', icon: '🍋', hint: 'Squishy horizontal compression', math: 'scaleX: 0.6 | scaleY: 1.4' },
  { id: 'stretch', label: 'Taffy Stretch', category: 'Flow', icon: '🍬', hint: 'Elastic vertical extension', math: 'scaleY: 1.5 | scaleX: 0.8' },
  { id: 'swipe', label: 'Card Swipe', category: 'Flow', icon: '💳', hint: 'Snappy mobile swipe card', math: 'translateX: 110% | rotate: 5deg' },
  { id: 'zoom', label: 'Hyperspace Zoom', category: 'Flow', icon: '🚀', hint: 'Hyper-speed forward warp', math: 'scale: 3.0 | opacity: 0' },
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

  const categories = ['All', 'Spatial', 'Portal', 'Paper', 'Mask', 'Retro', 'Flow'];

  const filteredTransitions = ALL_PLAYGROUND_TRANSITIONS.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Determines the opposite page (flips between page-1 and page-2)
  const isPage1 = pathname.includes('page-1') || pathname === '/playground';
  const targetPage = isPage1 ? '/playground/page-2' : '/playground/page-1';
  const targetPageLabel = isPage1 ? 'Page 2 (Side B)' : 'Page 1 (Side A)';

  const handleFlipPage = (customTransition?: string) => {
    if (customTransition) {
      setTransition(customTransition);
    }
    router.push(targetPage);
  };

  const handleSurpriseMe = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    setTransition(randomTransition.id);
    router.push(targetPage);
  };

  const handleChaosMode = () => {
    const randomTransition = ALL_PLAYGROUND_TRANSITIONS[Math.floor(Math.random() * ALL_PLAYGROUND_TRANSITIONS.length)];
    const randomDuration = Number((Math.random() * 1.4 + 0.2).toFixed(2));
    const randomDirection = DIRECTION_PRESETS[Math.floor(Math.random() * DIRECTION_PRESETS.length)];

    setTransition(randomTransition.id);
    setConfig({
      duration: randomDuration,
      direction: randomDirection,
    });
    router.push(targetPage);
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

  return (
    <aside aria-label="Playground Transition Studio" className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 font-sans">
      {isOpen && (
        <div className="w-[420px] max-w-[calc(100vw-2rem)] rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#fa5c4f] flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#fa5c4f]/25">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs font-bold font-display uppercase tracking-wider text-[var(--text-main)]">
                    Transition Studio
                  </h2>
                  <span className="sticker-pill text-[9px] py-0 px-1.5">33 Shaders</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] font-cursive text-sm -mt-0.5">
                  ~ clicking any shader flips between Page 1 & Page 2 ~
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close studio"
              className="w-7 h-7 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center transition cursor-pointer btn-tactile"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sub-Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-color)] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('shaders')}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-[11px] ${
                activeTab === 'shaders'
                  ? 'bg-[var(--bg-card)] text-[#fa5c4f] shadow-sm font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Layers className="w-3 h-3" /> Shaders ({ALL_PLAYGROUND_TRANSITIONS.length})
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-[11px] ${
                activeTab === 'physics'
                  ? 'bg-[var(--bg-card)] text-[#fa5c4f] shadow-sm font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Sliders className="w-3 h-3" /> Physics
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 text-[11px] ${
                activeTab === 'export'
                  ? 'bg-[var(--bg-card)] text-[#fa5c4f] shadow-sm font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Code2 className="w-3 h-3" /> Export
            </button>
          </div>

          {/* TAB 1: SHADERS */}
          {activeTab === 'shaders' && (
            <div className="space-y-3">
              {/* Search & Category filter */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[var(--text-subtle)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search 33 transitions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none focus:border-[#fa5c4f] transition"
                  />
                </div>

                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition whitespace-nowrap cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-[#fa5c4f] text-white shadow-sm font-bold'
                          : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-color)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shaders Grid */}
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {filteredTransitions.map((t) => {
                  const active = currentTransition === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleFlipPage(t.id)}
                      className={`p-2.5 rounded-2xl text-left text-xs transition cursor-pointer flex flex-col justify-between border btn-tactile relative group ${
                        active
                          ? 'bg-[#fa5c4f]/10 border-[#fa5c4f] text-[var(--text-main)] shadow-sm ring-1 ring-[#fa5c4f]'
                          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base group-hover:scale-125 transition-transform duration-200">{t.icon}</span>
                        {active ? (
                          <span className="w-4 h-4 rounded-full bg-[#fa5c4f] text-white flex items-center justify-center text-[10px] shadow-sm">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        ) : (
                          <span className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)] font-mono">
                            {t.category}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[var(--text-main)] block font-display line-clamp-1">{t.label}</span>
                        <span className="text-[10px] text-[var(--text-muted)] block line-clamp-1 mt-0.5">{t.hint}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PHYSICS */}
          {activeTab === 'physics' && (
            <div className="space-y-4 text-xs">
              {/* Duration */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--text-main)] flex items-center gap-1">
                    Duration: <span className="font-mono text-[#fa5c4f] font-bold">{duration.toFixed(2)}s</span>
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-cursive text-sm">
                    {duration <= 0.3 ? '⚡ snappy' : duration <= 0.7 ? '🌊 smooth' : '🎬 dramatic'}
                  </span>
                </div>

                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={duration}
                  onChange={(e) => setConfig({ duration: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-[var(--bg-surface)] rounded-lg appearance-none cursor-pointer accent-[#fa5c4f]"
                />

                <div className="grid grid-cols-4 gap-1 pt-1 font-mono text-[10px]">
                  {[
                    { label: '0.2s', val: 0.2 },
                    { label: '0.4s', val: 0.4 },
                    { label: '0.6s', val: 0.6 },
                    { label: '1.2s', val: 1.2 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setConfig({ duration: p.val })}
                      className={`py-1 rounded-lg border transition cursor-pointer ${
                        duration === p.val
                          ? 'bg-[#fa5c4f] text-white border-[#fa5c4f] font-bold'
                          : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direction */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]">
                <span className="font-semibold text-[var(--text-main)] block">Direction Vector</span>
                <div className="grid grid-cols-4 gap-1 text-[11px] font-mono">
                  {DIRECTION_PRESETS.map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setConfig({ direction: dir })}
                      className={`py-1.5 rounded-lg border capitalize transition cursor-pointer ${
                        direction === dir
                          ? 'bg-[#fa5c4f] text-white border-[#fa5c4f] font-bold'
                          : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* Easing */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--border-color)]">
                <span className="font-semibold text-[var(--text-main)] block">Easing Curve</span>
                <div className="grid grid-cols-4 gap-1 text-[11px] font-mono">
                  {EASING_PRESETS.map((easingName) => (
                    <button
                      key={easingName}
                      onClick={() => setConfig({ ease: easingName })}
                      className={`py-1.5 px-2 rounded-lg border text-center truncate transition cursor-pointer ${
                        ease === easingName
                          ? 'bg-[#fa5c4f] text-white border-[#fa5c4f] font-bold'
                          : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      {easingName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-main)]">Ready-to-Paste Code</span>
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-main)] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-[var(--border-color)]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-3.5 rounded-2xl bg-[var(--code-bg)] border border-[var(--code-border)] text-[var(--code-text)] font-mono text-[11px] leading-relaxed overflow-x-auto">
                {exportCodeSnippet}
              </pre>
            </div>
          )}

          {/* Quick Actions Footer */}
          <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleSurpriseMe}
                className="py-2 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold text-[11px] flex items-center justify-center gap-1 btn-tactile cursor-pointer"
                title="Random transition & flip"
              >
                <Dices className="w-3.5 h-3.5" /> Dice 🎲
              </button>

              <button
                onClick={handleChaosMode}
                className="py-2 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold text-[11px] flex items-center justify-center gap-1 btn-tactile cursor-pointer"
                title="Random speed & vector"
              >
                <Zap className="w-3.5 h-3.5 text-purple-500" /> Chaos 👾
              </button>

              <button
                onClick={() => handleFlipPage()}
                className="py-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-md shadow-[#fa5c4f]/30 btn-tactile cursor-pointer truncate"
              >
                <ArrowRightLeft className="w-3 h-3" /> Flip Page
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Floating Launcher HUD Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-4 pr-3.5 py-3 rounded-full bg-[var(--bg-card)]/95 backdrop-blur-xl hover:bg-[var(--bg-card-hover)] text-[var(--text-main)] text-xs font-bold shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-[var(--border-color)] transition-all cursor-pointer btn-tactile group"
      >
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fa5c4f] animate-pulse" />
          <span className="text-[var(--text-muted)]">Transition:</span>
          <span className="text-[#fa5c4f] font-mono font-bold bg-[#fa5c4f]/10 px-2 py-0.5 rounded-lg border border-[#fa5c4f]/20">
            {currentTransition}
          </span>
        </span>
        <div className="w-6 h-6 rounded-full bg-[var(--bg-surface)] group-hover:bg-[#fa5c4f] group-hover:text-white flex items-center justify-center transition">
          <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
    </aside>
  );
}
