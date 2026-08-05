'use client';

import { Page } from '@/components/morphy';
import { Type, AlignLeft, SplitSquareHorizontal, Minus, LetterText } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

export default function TypographyEnginePage() {
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [activeWeight, setActiveWeight] = useState(400);

  const weights = [
    { value: 100, name: 'Thin' },
    { value: 200, name: 'Extra Light' },
    { value: 300, name: 'Light' },
    { value: 400, name: 'Regular' },
    { value: 500, name: 'Medium' },
    { value: 600, name: 'Semi Bold' },
    { value: 700, name: 'Bold' },
    { value: 800, name: 'Extra Bold' },
    { value: 900, name: 'Black' },
  ];

  const typeScale = [
    { size: 'text-5xl @md/device:text-7xl', label: 'Display', px: '72px', tracking: '-0.04em' },
    { size: 'text-4xl @md/device:text-5xl', label: 'Heading 1', px: '48px', tracking: '-0.03em' },
    { size: 'text-2xl @md/device:text-3xl', label: 'Heading 2', px: '30px', tracking: '-0.02em' },
    { size: 'text-xl @md/device:text-2xl', label: 'Heading 3', px: '24px', tracking: '-0.01em' },
    { size: 'text-base @md/device:text-lg', label: 'Body Large', px: '18px', tracking: '0' },
    { size: 'text-sm @md/device:text-base', label: 'Body', px: '16px', tracking: '0' },
    { size: 'text-xs @md/device:text-sm', label: 'Caption', px: '14px', tracking: '0.01em' },
    { size: 'text-[10px] @md/device:text-xs', label: 'Overline', px: '12px', tracking: '0.06em' },
  ];

  return (
    <Page>
      <div className="w-full min-h-full bg-[var(--bg-page)] flex flex-col relative transition-colors duration-700 font-sans">
        
        {/* Header */}
        <header className="px-6 py-10 @md/device:px-10 @md/device:py-14 flex flex-col @md/device:flex-row justify-between items-start @md/device:items-end z-20 gap-4 @md/device:gap-6 shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)] to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <span className="text-[10px] @md/device:text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-3 block">
              Typography Lab
            </span>
            <h1 className="text-3xl @md/device:text-5xl font-medium tracking-tight @md/device:tracking-[-0.03em] text-[var(--text-main)]" style={{ fontOpticalSizing: 'auto' }}>
              Editorial Flow
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center gap-4 @md/device:gap-5 text-xs text-[var(--text-muted)] relative z-10">
            <span className="flex items-center gap-1.5 font-medium"><Type className="w-3.5 h-3.5 opacity-70" /> Fluid Scale</span>
            <span className="flex items-center gap-1.5 font-medium"><AlignLeft className="w-3.5 h-3.5 opacity-70" /> Layout Shift</span>
            <span className="flex items-center gap-1.5 font-medium"><SplitSquareHorizontal className="w-3.5 h-3.5 opacity-70" /> Kerning</span>
          </motion.div>
        </header>

        {/* Section 1 — Hero Type Specimen */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16,1,0.3,1] }}
          className="mx-4 @md/device:mx-10 shrink-0"
        >
          <div className={`bg-white/50 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] p-6 @md/device:p-10 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center'
          }`}>
            <h2 
              className="text-[clamp(2.5rem,10vw,7rem)] leading-[0.9] text-[var(--text-main)] transition-all duration-700"
              style={{ fontWeight: activeWeight, letterSpacing: '-0.04em', fontOpticalSizing: 'auto' }}
            >
              Refined<br />Scale
            </h2>
            <p className="text-base @md/device:text-lg text-[var(--text-muted)] max-w-xl font-medium opacity-70 leading-relaxed mt-4 @md/device:mt-6" style={{ fontWeight: Math.min(activeWeight, 500) }}>
              Experience how fluid typography scales seamlessly across viewport boundaries while maintaining absolute vertical rhythm.
            </p>
            
            {/* Alignment toggles inline */}
            <div className="flex items-center gap-2 mt-6">
              {(['left', 'center', 'right'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAlignment(a)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                    alignment === a 
                      ? 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-md' 
                      : 'bg-black/5 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 2 — Weight Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16,1,0.3,1] }}
          className="mx-4 @md/device:mx-10 mt-6 shrink-0"
        >
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] p-6 @md/device:p-10 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-1">
                  Weight Explorer
                </div>
                <div className="text-sm text-[var(--text-muted)] font-medium opacity-60">
                  Current: {weights.find(w => w.value === activeWeight)?.name} ({activeWeight})
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-center justify-center">
                <LetterText className="w-4 h-4 text-[var(--text-main)]" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {weights.map((w) => (
                <button
                  key={w.value}
                  onClick={() => setActiveWeight(w.value)}
                  className={`relative px-3 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 ${
                    activeWeight === w.value
                      ? 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-lg scale-105'
                      : 'bg-black/5 dark:bg-white/10 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/10 dark:hover:bg-white/15'
                  }`}
                >
                  {w.value}
                </button>
              ))}
            </div>

            {/* Weight preview */}
            <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/10">
              <p className="text-3xl @md/device:text-4xl text-[var(--text-main)] leading-snug transition-all duration-500" style={{ fontWeight: activeWeight }}>
                The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mt-3 transition-all duration-500 opacity-60" style={{ fontWeight: activeWeight }}>
                0123456789 — ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 3 — Type Scale */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-4 @md/device:mx-10 mt-6 mb-10 shrink-0"
        >
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] p-6 @md/device:p-10 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-6 @md/device:mb-8 flex items-center gap-2">
              <Minus className="w-3 h-3" /> Type Scale System
            </div>
            
            <div className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
              {typeScale.map((level, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="py-4 @md/device:py-5 flex flex-col @md/device:flex-row @md/device:items-baseline gap-2 @md/device:gap-6 group cursor-default"
                >
                  <div className="flex items-center gap-3 shrink-0 @md/device:w-32">
                    <span className="text-[9px] font-bold tracking-widest text-[var(--text-muted)] uppercase opacity-50">{level.px}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className={`${level.size} font-medium text-[var(--text-main)] truncate group-hover:text-[var(--text-muted)] transition-colors duration-300`}
                      style={{ letterSpacing: level.tracking, fontWeight: activeWeight }}
                    >
                      {level.label}
                    </div>
                  </div>
                  <div className="shrink-0 hidden @md/device:block">
                    <span className="text-[9px] font-bold tracking-widest text-[var(--text-muted)] uppercase opacity-40 group-hover:opacity-80 transition-opacity">{level.tracking}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </Page>
  );
}
