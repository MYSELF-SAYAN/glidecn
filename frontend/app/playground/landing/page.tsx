'use client';

import { Page } from '@/components/morphy';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export default function LandingPage() {
  return (
    <Page>
      <div className="min-h-[100dvh] w-full bg-[#050505] text-[#FAFAFA] font-sans relative overflow-hidden flex flex-col justify-center">
        
        {/* Massive Cinematic Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />
        
        {/* Premium Noise Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-10" 
             style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

        {/* Cinematic Center Hero */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-20 w-full px-6 flex flex-col items-center text-center py-32 md:py-48"
        >
          
          <motion.h1 
            variants={itemVariants}
            className="w-full max-w-6xl text-[clamp(3.5rem,8vw,9rem)] font-medium tracking-tighter leading-[0.9] text-white mb-12"
          >
            Spatial choreography <br /> for the modern web.
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-white/40 font-light max-w-2xl leading-relaxed mb-16"
          >
            A framework for continuous interface mechanics. Engineered to eliminate loading states and synthesize physical transitions between routes.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4">
            <Link href="/playground/features" className="group px-10 py-5 bg-white text-black rounded-full font-medium tracking-tight hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] flex items-center justify-center">
              Explore Engine
            </Link>
          </motion.div>
        </motion.main>
      </div>
    </Page>
  );
}
