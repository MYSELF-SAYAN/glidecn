'use client';

import Link from 'next/link';
import { Logo } from '@/components/landing/logo';
import { Github, Twitter, Heart, ArrowUpRight, Command, Gamepad2, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const FOOTER_LETTERS = ['G', 'L', 'I', 'D', 'E', 'C', 'N'];

function FooterBrandText() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 40, filter: 'blur(8px)', scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-16 sm:pt-20 border-t border-white/10 overflow-hidden group/footer-text select-none">
      {/* Ambient Breathing Under-Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[25vw] max-h-[220px] bg-gradient-to-r from-[#fa5c4f]/30 via-orange-500/20 to-blue-500/20 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-40px' }}
        className="flex items-center justify-center tracking-tighter"
      >
        {FOOTER_LETTERS.map((letter, i) => {
          const isHovered = hoveredIdx === i;
          const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;

          return (
            <motion.span
              key={i}
              variants={letterVariants}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: isHovered ? -16 : isNeighbor ? -6 : 0,
                      scale: isHovered ? 1.05 : isNeighbor ? 1.02 : 1,
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 18,
              }}
              className="inline-block text-[14vw] sm:text-[13vw] leading-[0.85] font-black font-display cursor-default transition-colors duration-200 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 hover:from-[#fa5c4f] hover:via-orange-300 hover:to-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {letter}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

export function SiteFooter({ className = "mt-32" }: { className?: string }) {
  return (
    <footer className={`${className} relative overflow-hidden bg-black text-white pt-24 pb-12 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-white/10 mx-2 sm:mx-4 mb-2 sm:mb-4 shadow-2xl`}>

      {/* Background Cinematic Grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-[#fa5c4f]/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center">

        {/* Bento Grid Links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-24">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-2xl bg-[#fa5c4f] flex items-center justify-center text-white shadow-lg shadow-[#fa5c4f]/20 group-hover:rotate-12 transition-transform duration-500">
                <Logo className="size-5 text-white" />
              </div>
              <span className="font-bold tracking-tight text-xl font-display text-white">
                GlideCN
              </span>
            </Link>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed font-light">
              An open-source React page transition library with a pluggable architecture, designed for maximum compositor performance and cinematic UX.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/MYSELF-SAYAN/glidecn" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <Github className="size-4" />
              </a>
              <a href="https://x.com/itz_sayan_03" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all">
                <Twitter className="size-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/docs" className="group flex items-center text-white/70 hover:text-white transition-colors">
                  <span>Documentation</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/docs/installation" className="group flex items-center text-white/70 hover:text-white transition-colors">
                  <span>Quickstart</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/docs/api-reference" className="group flex items-center text-white/70 hover:text-white transition-colors">
                  <span>API Reference</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/contributing" className="group flex items-center text-white/70 hover:text-white transition-colors">
                  <span>Contributing</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/playground/landing" className="group flex items-center text-[#fa5c4f] hover:text-[#e54235] transition-colors">
                  <span>Playground Area</span>
                  <ArrowUpRight className="size-3 ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Transitions</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/transition#family-Flow" className="text-white/70 hover:text-white transition-colors">Flow</Link></li>
              <li><Link href="/transition#family-Portal" className="text-white/70 hover:text-white transition-colors">Portal</Link></li>
              <li><Link href="/transition#family-Paper" className="text-white/70 hover:text-white transition-colors">Paper</Link></li>
              <li><Link href="/transition#family-Mask" className="text-white/70 hover:text-white transition-colors">Mask</Link></li>
              <li><Link href="/transition#family-Spatial" className="text-white/70 hover:text-white transition-colors">Spatial</Link></li>
              <li><Link href="/transition#family-Dynamic" className="text-white/70 hover:text-white transition-colors">Dynamic</Link></li>
              <li><Link href="/transition#family-Experimental" className="text-white/70 hover:text-white transition-colors">Experimental</Link></li>
            </ul>
          </div>

          {/* Links Col 3 (Cross Promotion) */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">More From Us</h4>
            <a href="https://sectionflow.vercel.app" target="_blank" rel="noreferrer" className="block group relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#fa5c4f]/50 group-hover:bg-[#fa5c4f]/10 transition-colors duration-300">
                  <Command className="size-4 text-white/70 group-hover:text-[#fa5c4f] transition-colors" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white group-hover:text-[#fa5c4f] transition-colors flex items-center gap-1.5">
                    SectionFlow <ArrowUpRight className="size-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mt-0.5">React Scrolling Engine</span>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors font-light">
                Build immersive storytelling pages with our section-based scrolling library.
              </p>
            </a>
          </div>

        </div>

        {/* Oversized Interactive Typography End-Cap */}
        <FooterBrandText />

        {/* Bottom Bar */}
        <div className="w-full mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <p>© {new Date().getFullYear()} GlideCN Engine. MIT License.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="size-3 text-[#fa5c4f]" fill="currentColor" /> for React
          </p>
        </div>

      </div>
    </footer>
  );
}
