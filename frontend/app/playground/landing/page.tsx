'use client';

import { Page } from '@/components/morphy';
import { motion } from 'framer-motion';
import { MousePointer2, Move, Target, Grip, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState, useRef } from 'react';

export default function InteractiveStagePage() {
  const [activeShape, setActiveShape] = useState<number | null>(null);
  const constraintRef = useRef<HTMLDivElement>(null);

  const shapes = [
    { id: 1, type: 'circle', label: 'Hero', variant: 'glass', size: 'w-28 h-28', top: '20%', left: '18%' },
    { id: 2, type: 'square', label: 'CTA', variant: 'solid', size: 'w-22 h-22', top: '25%', left: '55%' },
    { id: 3, type: 'rectangle', label: 'Card', variant: 'glass', size: 'w-36 h-20', top: '55%', left: '35%' },
    { id: 4, type: 'circle', label: 'Nav', variant: 'muted', size: 'w-16 h-16', top: '60%', left: '70%' },
    { id: 5, type: 'square', label: 'Tag', variant: 'outline', size: 'w-14 h-14', top: '15%', left: '78%' },
  ];

  // Theme-driven style map — no hardcoded color values
  const variantStyles: Record<string, string> = {
    glass: 'bg-[var(--bg-page)]/80 backdrop-blur-xl border border-[var(--text-main)]/10 shadow-[0_8px_30px_rgba(0,0,0,0.1)]',
    solid: 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-[0_20px_40px_rgba(0,0,0,0.15)]',
    muted: 'bg-[var(--text-muted)]/20 backdrop-blur-md border border-[var(--text-muted)]/15 shadow-[0_8px_20px_rgba(0,0,0,0.06)]',
    outline: 'bg-transparent border-2 border-[var(--text-main)]/20 backdrop-blur-sm shadow-sm',
  };

  return (
    <Page>
      <div data-lenis-prevent="true" className="w-full h-full overflow-y-auto overflow-x-hidden bg-[var(--bg-page)] flex flex-col relative transition-colors duration-700 font-sans">
        
        {/* Section 1 — Hero Header */}
        <header className="px-6 py-10 @md/device:px-10 @md/device:py-14 flex flex-col @md/device:flex-row justify-between items-start @md/device:items-end z-20 gap-4 @md/device:gap-6 shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)] to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <span className="text-[10px] @md/device:text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-3 block">
              Interactive Canvas
            </span>
            <h1 className="text-3xl @md/device:text-5xl font-medium tracking-tight @md/device:tracking-[-0.03em] text-[var(--text-main)]" style={{ fontOpticalSizing: 'auto' }}>
              Motion Stage
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center gap-4 @md/device:gap-5 text-xs text-[var(--text-muted)] relative z-10">
            <span className="flex items-center gap-1.5 font-medium"><Move className="w-3.5 h-3.5 opacity-70" /> Drag</span>
            <span className="flex items-center gap-1.5 font-medium"><MousePointer2 className="w-3.5 h-3.5 opacity-70" /> Hover</span>
            <span className="flex items-center gap-1.5 font-medium"><Target className="w-3.5 h-3.5 opacity-70" /> Bound</span>
          </motion.div>
        </header>

        {/* Section 2 — Drag Sandbox */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16,1,0.3,1] as [number,number,number,number] }} 
          className="mx-4 @md/device:mx-10 shrink-0"
        >
          <div 
            ref={constraintRef}
            className="relative w-full h-[340px] @md/device:h-[460px] border border-[var(--text-main)]/5 rounded-[2rem] overflow-hidden bg-[var(--text-main)]/[0.02] backdrop-blur-3xl"
          >
            {/* Wireframe background */}
            <div className="absolute inset-0 p-6 @md/device:p-10 flex flex-col gap-4 opacity-[0.08] pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--text-main)]" />
                <div className="w-24 h-3 rounded bg-[var(--text-main)]" />
                <div className="ml-auto flex gap-2">
                  <div className="w-12 h-3 rounded bg-[var(--text-main)]" />
                  <div className="w-12 h-3 rounded bg-[var(--text-main)]" />
                  <div className="w-12 h-3 rounded bg-[var(--text-main)]" />
                </div>
              </div>
              <div className="flex-1 flex gap-4 mt-4">
                <div className="flex-1 flex flex-col gap-3">
                  <div className="w-3/4 h-6 rounded bg-[var(--text-main)]" />
                  <div className="w-1/2 h-6 rounded bg-[var(--text-main)]" />
                  <div className="w-full h-3 rounded bg-[var(--text-main)] mt-2" />
                  <div className="w-4/5 h-3 rounded bg-[var(--text-main)]" />
                  <div className="flex gap-3 mt-4">
                    <div className="w-24 h-8 rounded-full bg-[var(--text-main)]" />
                    <div className="w-24 h-8 rounded-full border-2 border-[var(--text-main)]" />
                  </div>
                </div>
                <div className="hidden @md/device:flex flex-1 flex-col gap-3">
                  <div className="flex-1 rounded-2xl bg-[var(--text-main)]/50" />
                </div>
              </div>
            </div>

            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <div className="w-px h-full bg-[var(--text-main)]" />
              <div className="h-px w-full bg-[var(--text-main)] absolute" />
            </div>

            {/* Drag hint badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-page)]/70 backdrop-blur-xl rounded-full border border-[var(--text-main)]/10 z-30 pointer-events-none">
              <Grip className="w-3 h-3 text-[var(--text-muted)]" />
              <span className="text-[10px] font-semibold text-[var(--text-muted)] tracking-wide uppercase">Drag me</span>
            </div>

            {/* Draggable shapes — positioned via CSS, NO animate x/y so drag works properly */}
            {shapes.map((shape, i) => (
              <motion.div
                key={shape.id}
                drag
                dragConstraints={constraintRef}
                dragElastic={0.12}
                dragMomentum={false}
                onDragStart={() => setActiveShape(shape.id)}
                onDragEnd={() => setActiveShape(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.08, type: 'spring', bounce: 0.35 }}
                className={`absolute cursor-grab active:cursor-grabbing flex items-center justify-center ${shape.size} ${variantStyles[shape.variant]} ${
                  shape.type === 'circle' ? 'rounded-full' : 'rounded-2xl'
                } select-none touch-none`}
                style={{ 
                  zIndex: activeShape === shape.id ? 50 : 10 + i,
                  top: shape.top,
                  left: shape.left,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className={`text-[9px] font-bold tracking-widest uppercase ${
                  shape.variant === 'solid' ? 'text-[var(--bg-page)]' : 'text-[var(--text-muted)]'
                }`}>
                  {shape.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section 3 — Floating Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16,1,0.3,1] as [number,number,number,number] }}
          className="mx-4 @md/device:mx-10 mt-6 grid grid-cols-2 @md/device:grid-cols-4 gap-3 @md/device:gap-4 shrink-0"
        >
          {[
            { label: 'Easing Presets', value: '68' },
            { label: 'Spring Physics', value: '24' },
            { label: 'Transition Types', value: '42' },
            { label: 'Active Scenes', value: '5' },
          ].map((stat, i) => (
            <div key={i} className="bg-[var(--text-main)]/[0.03] backdrop-blur-2xl rounded-2xl p-4 @md/device:p-5 border border-[var(--text-main)]/5">
              <div className="text-2xl @md/device:text-3xl font-medium tracking-tight text-[var(--text-main)]">{stat.value}</div>
              <div className="text-[10px] @md/device:text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Section 4 — Capabilities Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16,1,0.3,1] as [number,number,number,number] }}
          className="mx-4 @md/device:mx-10 mt-6 mb-10 grid grid-cols-1 @md/device:grid-cols-2 gap-4 shrink-0"
        >
          {[
            { 
              icon: <Sparkles className="w-5 h-5" />,
              title: 'Physics-Based Motion', 
              desc: 'Every transition is powered by spring dynamics. Adjust mass, stiffness, and damping in real-time from the sidebar.',
            },
            { 
              icon: <ArrowUpRight className="w-5 h-5" />,
              title: 'Live Preview Engine', 
              desc: 'See changes instantly across all lab pages. The playground syncs transition values globally through the Morphy engine.',
            },
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="bg-[var(--text-main)]/[0.03] backdrop-blur-2xl rounded-[1.5rem] p-6 @md/device:p-8 border border-[var(--text-main)]/5 cursor-default group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-page)] border border-[var(--text-main)]/10 flex items-center justify-center text-[var(--text-main)] mb-5 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-base @md/device:text-lg font-semibold text-[var(--text-main)] tracking-tight mb-2">{card.title}</h3>
              <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed opacity-80">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </Page>
  );
}
