'use client';

import { Page } from '@/components/morphy';
import { motion, Variants } from 'framer-motion';
import { LayoutGrid, Maximize, GitMerge, ArrowUpRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  }
};

export default function BentoMatrixPage() {
  const blocks = [
    { span: '@md/device:col-span-8 @md/device:row-span-2', label: 'Primary Node', desc: 'Hero section component — the largest element anchors the visual hierarchy.', type: 'hero' },
    { span: '@md/device:col-span-4 @md/device:row-span-1', label: 'Metrics A', desc: 'Conversion rate', type: 'data' },
    { span: '@md/device:col-span-4 @md/device:row-span-1', label: 'Metrics B', desc: 'Bounce rate', type: 'data' },
    { span: '@md/device:col-span-4 @md/device:row-span-1', label: 'Module 01', desc: 'Navigation component', type: 'unit' },
    { span: '@md/device:col-span-4 @md/device:row-span-1', label: 'Module 02', desc: 'Sidebar layout', type: 'unit' },
    { span: '@md/device:col-span-4 @md/device:row-span-1', label: 'Module 03', desc: 'Footer section', type: 'unit' },
  ];

  return (
    <Page>
      <div data-lenis-prevent="true" className="w-full h-full overflow-y-auto overflow-x-hidden bg-[var(--bg-page)] flex flex-col relative transition-colors duration-700 font-sans">
        
        {/* Header */}
        <header className="px-6 py-10 @md/device:px-10 @md/device:py-14 flex flex-col @md/device:flex-row justify-between items-start @md/device:items-end z-20 gap-4 @md/device:gap-6 shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)] to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <span className="text-[10px] @md/device:text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-3 block">
              Bento Architecture
            </span>
            <h1 className="text-3xl @md/device:text-5xl font-medium tracking-tight @md/device:tracking-[-0.03em] text-[var(--text-main)]" style={{ fontOpticalSizing: 'auto' }}>
              Structural Matrix
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center gap-4 @md/device:gap-5 text-xs text-[var(--text-muted)] relative z-10">
            <span className="flex items-center gap-1.5 font-medium"><LayoutGrid className="w-3.5 h-3.5 opacity-70" /> CSS Grid</span>
            <span className="flex items-center gap-1.5 font-medium"><Maximize className="w-3.5 h-3.5 opacity-70" /> Fluid Scale</span>
            <span className="flex items-center gap-1.5 font-medium"><GitMerge className="w-3.5 h-3.5 opacity-70" /> Dense Flow</span>
          </motion.div>
        </header>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-4 @md/device:mx-10 grid grid-cols-1 @md/device:grid-cols-12 gap-4 @md/device:gap-5 @md/device:grid-flow-dense shrink-0"
        >
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 0.98, y: -4 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`bg-white/50 dark:bg-black/30 backdrop-blur-2xl ${block.span} p-6 @md/device:p-8 rounded-[2rem] flex flex-col justify-between cursor-pointer border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:bg-white/80 dark:hover:bg-black/50 transition-all min-h-[160px] @md/device:min-h-[180px] group`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)]">0{i + 1}</span>
                <span className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/20 group-hover:bg-[var(--text-main)] group-hover:scale-150 transition-all duration-300" />
              </div>
              
              <div className="mt-4 @md/device:mt-auto">
                <h3 className={`font-medium tracking-tight ${block.type === 'hero' ? 'text-2xl @md/device:text-3xl @md/device:tracking-[-0.02em]' : 'text-lg @md/device:text-xl'} text-[var(--text-main)]`}>
                  {block.label}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-2 font-medium opacity-70 leading-relaxed">{block.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16,1,0.3,1] }}
          className="mx-4 @md/device:mx-10 mt-6 mb-10 shrink-0"
        >
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] p-6 @md/device:p-8 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-5">
              Grid Specifications
            </div>
            <div className="grid grid-cols-2 @md/device:grid-cols-4 gap-4">
              {[
                { label: 'Columns', value: '12' },
                { label: 'Gutter', value: '20px' },
                { label: 'Margin', value: '40px' },
                { label: 'Breakpoint', value: '768px' },
              ].map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl @md/device:text-3xl font-medium tracking-tight text-[var(--text-main)]">{spec.value}</span>
                  <span className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase mt-1 opacity-60">{spec.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </Page>
  );
}
