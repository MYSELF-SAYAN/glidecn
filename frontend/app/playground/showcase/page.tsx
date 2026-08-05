'use client';

import { Page } from '@/components/morphy';
import { motion, Variants } from 'framer-motion';
import { Image as ImageIcon, Scaling, Layers } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  }
};

const images = [
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
];

export default function MediaTelemetryPage() {
  return (
    <Page>
      <div className="w-full min-h-full bg-[var(--bg-page)] flex flex-col relative transition-colors duration-700 font-sans">
        
        {/* Header */}
        <header className="px-6 py-10 @md/device:px-10 @md/device:py-14 flex flex-col @md/device:flex-row justify-between items-start @md/device:items-end z-20 gap-4 @md/device:gap-6 shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-page)] via-[var(--bg-page)] to-transparent pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
            <span className="text-[10px] @md/device:text-xs font-semibold tracking-widest text-[var(--text-muted)] uppercase mb-3 block">
              Media Lab
            </span>
            <h1 className="text-3xl @md/device:text-5xl font-medium tracking-tight @md/device:tracking-[-0.03em] text-[var(--text-main)]" style={{ fontOpticalSizing: 'auto' }}>
              Visual Telemetry
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center gap-4 @md/device:gap-5 text-xs text-[var(--text-muted)] relative z-10">
            <span className="flex items-center gap-1.5 font-medium"><ImageIcon className="w-3.5 h-3.5 opacity-70" /> Bit-Depth</span>
            <span className="flex items-center gap-1.5 font-medium"><Scaling className="w-3.5 h-3.5 opacity-70" /> Auto-Scale</span>
            <span className="flex items-center gap-1.5 font-medium"><Layers className="w-3.5 h-3.5 opacity-70" /> Stacking</span>
          </motion.div>
        </header>

        {/* Image Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-4 @md/device:mx-10 grid grid-cols-1 @md/device:grid-cols-2 gap-4 @md/device:gap-5 shrink-0"
        >
          {images.map((img, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 0.98, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative h-[260px] @md/device:h-[320px] group overflow-hidden bg-black/5 dark:bg-white/5 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer border border-black/5 dark:border-white/10"
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={img} 
                  alt={`Telemetry Asset 0${i + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
              </div>
              
              {/* Label */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-white/20 dark:bg-black/20 backdrop-blur-md p-3 @md/device:p-4 rounded-2xl border border-white/20 dark:border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
                <span className="text-[10px] @md/device:text-xs font-bold tracking-widest text-white uppercase">Asset 0{i + 1}</span>
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Media Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16,1,0.3,1] }}
          className="mx-4 @md/device:mx-10 mt-6 mb-10 shrink-0"
        >
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-2xl rounded-[2rem] p-5 @md/device:p-8 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[10px] @md/device:text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase mb-5">
              Render Pipeline
            </div>
            <div className="grid grid-cols-2 @md/device:grid-cols-4 gap-4">
              {[
                { label: 'Format', value: 'WebP' },
                { label: 'Quality', value: '80%' },
                { label: 'Lazy Load', value: 'On' },
                { label: 'CDN Cache', value: '24h' },
              ].map((spec, i) => (
                <div key={i}>
                  <div className="text-xl @md/device:text-2xl font-medium tracking-tight text-[var(--text-main)]">{spec.value}</div>
                  <div className="text-[10px] font-semibold tracking-wider text-[var(--text-muted)] uppercase mt-1 opacity-50">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </Page>
  );
}
