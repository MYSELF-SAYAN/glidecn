'use client';

import { Page, useMorphy } from '@/components/morphy';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Plus, Minus, MousePointerClick, Gauge, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function KineticComponentsPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [toggled, setToggled] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const { config } = useMorphy();

  const springConfig = {
    type: 'spring' as const,
    duration: config.duration || 0.6,
    bounce: 0.2
  };

  return (
    <Page>
      <div className="w-full min-h-full bg-[var(--bg-page)] flex flex-col relative transition-colors duration-700 font-sans">
        
        {/* Header */}
        <header className="px-6 py-10 @md/device:px-10 @md/device:py-14 flex flex-col @md/device:flex-row justify-between items-start @md/device:items-end z-20 gap-4 @md/device:gap-6 shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)] to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <span className="text-[10px] @md/device:text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-3 block">
              Interaction Lab
            </span>
            <h1 className="text-3xl @md/device:text-5xl font-medium tracking-tight @md/device:tracking-[-0.03em] text-[var(--text-main)]" style={{ fontOpticalSizing: 'auto' }}>
              Kinetic Surfaces
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center gap-4 @md/device:gap-5 text-xs text-[var(--text-muted)] relative z-10">
            <span className="flex items-center gap-1.5 font-medium"><MousePointerClick className="w-3.5 h-3.5 opacity-70" /> Micro-Interactions</span>
            <span className="flex items-center gap-1.5 font-medium"><Box className="w-3.5 h-3.5 opacity-70" /> Bound Physics</span>
          </motion.div>
        </header>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16,1,0.3,1] }}
          className="mx-4 @md/device:mx-10 flex flex-col gap-5 @md/device:gap-6 shrink-0"
        >

          {/* Accordion Group */}
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl p-5 @md/device:p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
            <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-5 @md/device:mb-6">
              Expandable Surfaces
            </div>
            
            {[
              { id: 1, title: 'Spring Physics Engine', desc: 'Every accordion expansion uses spring dynamics. The duration and bounce values are inherited from the Morphy global config, so adjusting the sidebar sliders changes this animation in real-time.' },
              { id: 2, title: 'Interruption Handling', desc: 'Try rapidly clicking different items. The animation queue handles interrupts gracefully — no jank, no layout shift. Each expansion cleanly cancels the previous one.' },
              { id: 3, title: 'Height Auto Measurement', desc: 'Content height is measured dynamically. No fixed pixel values. The container measures its children and animates to the exact height needed, even if the text reflows at different widths.' },
            ].map((item) => (
              <div key={item.id} className="border-b border-black/5 dark:border-white/10 last:border-0 overflow-hidden">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                  className="w-full py-4 @md/device:py-5 flex items-center justify-between text-left group"
                >
                  <span className="font-semibold text-sm @md/device:text-base text-[var(--text-main)] group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </span>
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors p-2 bg-black/5 dark:bg-white/10 rounded-full group-hover:scale-110 duration-300 shrink-0 ml-4">
                    {openAccordion === item.id ? <Minus className="w-3 h-3 @md/device:w-4 @md/device:h-4" /> : <Plus className="w-3 h-3 @md/device:w-4 @md/device:h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springConfig}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 @md/device:pb-6 text-sm text-[var(--text-muted)] font-medium leading-[1.7] max-w-lg opacity-75">
                        {item.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Toggle + Slider Row */}
          <div className="grid grid-cols-1 @md/device:grid-cols-2 gap-5 @md/device:gap-6">
            
            {/* Toggle Card */}
            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl p-5 @md/device:p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-5 @md/device:mb-6">
                Binary State
              </div>
              
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <span className="font-semibold text-sm @md/device:text-base text-[var(--text-main)] block mb-1">
                    Override Global Sync
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium opacity-70">
                    Trigger custom animation loops
                  </span>
                </div>
                
                {/* iOS Toggle */}
                <button 
                  onClick={() => setToggled(!toggled)}
                  className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 shadow-inner shrink-0 ml-4 ${toggled ? 'bg-[var(--text-main)]' : 'bg-black/10 dark:bg-white/20'}`}
                >
                  <motion.div
                    className="w-6 h-6 bg-white dark:bg-black rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    animate={{ x: toggled ? 24 : 0 }}
                    transition={springConfig}
                  />
                </button>
              </div>

              {/* State indicator */}
              <div className={`mt-5 pt-4 border-t border-black/5 dark:border-white/10 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${toggled ? 'text-emerald-500' : 'text-[var(--text-muted)] opacity-50'}`}>
                {toggled ? '● Active — Custom loop running' : '○ Inactive — Using global config'}
              </div>
            </div>

            {/* Slider Card */}
            <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl p-5 @md/device:p-8 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between mb-5 @md/device:mb-6">
                <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase">
                  Intensity Control
                </div>
                <Gauge className="w-4 h-4 text-[var(--text-muted)] opacity-50" />
              </div>
              
              <div className="text-4xl @md/device:text-5xl font-medium tracking-tight text-[var(--text-main)] mb-6">
                {sliderVal}%
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-black/10 dark:bg-white/15 accent-[var(--text-main)]"
              />

              <div className="flex justify-between mt-3 text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase opacity-50">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Physics Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16,1,0.3,1] }}
          className="mx-4 @md/device:mx-10 mt-5 @md/device:mt-6 mb-10 shrink-0"
        >
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] p-5 @md/device:p-8 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/80 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center justify-center">
                <RotateCcw className="w-3.5 h-3.5 text-[var(--text-main)]" />
              </div>
              <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase">
                Live Physics Config
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xl @md/device:text-2xl font-medium tracking-tight text-[var(--text-main)]">{config.duration?.toFixed(2) || '0.60'}s</div>
                <div className="text-[9px] font-semibold tracking-wider text-[var(--text-muted)] uppercase mt-1 opacity-50">Duration</div>
              </div>
              <div>
                <div className="text-xl @md/device:text-2xl font-medium tracking-tight text-[var(--text-main)]">0.20</div>
                <div className="text-[9px] font-semibold tracking-wider text-[var(--text-muted)] uppercase mt-1 opacity-50">Bounce</div>
              </div>
              <div>
                <div className="text-xl @md/device:text-2xl font-medium tracking-tight text-emerald-500">Active</div>
                <div className="text-[9px] font-semibold tracking-wider text-[var(--text-muted)] uppercase mt-1 opacity-50">Engine</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </Page>
  );
}
