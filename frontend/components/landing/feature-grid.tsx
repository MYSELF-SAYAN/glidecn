'use client';

import { motion } from 'framer-motion';
import { Zap, Layers, Sparkles, Terminal, Sliders, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Sliders,
    title: '33+ Shader Transitions',
    description: 'Spatial 3D cubes, radial iris portals, origami folds, CRT phosphors, and fluid inks.',
    colorClass: 'text-[#fa5c4f]',
    bgClass: 'bg-[#fa5c4f]/10 border-[#fa5c4f]/20',
  },
  {
    icon: Terminal,
    title: 'shadcn/ui-Style CLI',
    description: 'Direct code ownership. Run "npx morphy add" to copy code straight into your repo.',
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Layout Shift',
    description: 'Viewport-stable morphing with synchronized exit and enter frames at locked 60 FPS.',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Zap,
    title: 'Dynamic State Hook',
    description: 'Switch transitions at runtime using the ergonomic useMorphy() React context hook.',
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-500/10 border-purple-500/20',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 md:py-16">
      <motion.div
        variants={containerVariants as any}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-60px' }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={itemVariants as any}
              className="morphy-card p-6 rounded-3xl group flex flex-col justify-between space-y-4"
            >
              <div className={`size-11 rounded-2xl flex items-center justify-center border ${feature.bgClass} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`size-5 ${feature.colorClass}`} strokeWidth={2.2} />
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-[var(--text-main)] font-display mb-1.5 group-hover:text-[#fa5c4f] transition">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
