'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Check, Star, ChevronDown, Sparkles, Play, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const PKG_COMMANDS = {
  pnpm: 'pnpm dlx glidecn-cli@latest init',
  npm: 'npx glidecn-cli@latest init',
  bun: 'bunx glidecn-cli@latest init',
  yarn: 'yarn dlx glidecn-cli@latest init',
};

export function Hero() {
  const [selectedPkg, setSelectedPkg] = useState<keyof typeof PKG_COMMANDS>('pnpm');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PKG_COMMANDS[selectedPkg]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center pt-24 pb-16">
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#fa5c4f]/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full flex flex-col items-center text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] text-xs font-medium tracking-wide">
            <Sparkles className="size-3 text-[#fa5c4f]" /> 
            v1.0 is live
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl lg:text-9xl font-light tracking-tight text-[var(--text-main)] font-display leading-[1.05] mb-8 max-w-5xl"
        >
          Page transitions <br className="hidden sm:block" />
          that{' '}
          <span className="relative inline-block font-cursive text-[#fa5c4f] font-normal tracking-normal pr-4 scale-110">
            flow.
            <motion.svg
              className="absolute -bottom-1 sm:-bottom-3 left-0 w-full text-[#fa5c4f]/60"
              viewBox="0 0 120 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.path 
                d="M5 8C25 2 45 12 65 6C85 0 105 10 115 5" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
              />
            </motion.svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-lg sm:text-2xl leading-relaxed text-[var(--text-muted)] mb-14 font-light"
        >
          The pluggable page transition library for React & Next.js. Hardware-accelerated shaders that drop straight into your codebase. No lock-in. No bloat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-6 w-full sm:w-auto mb-20"
        >
          {/* Primary CTA — Playground */}
          <Link
            href="/playground/landing"
            className="group relative flex justify-center items-center gap-3 rounded-full bg-[#fa5c4f] px-10 py-5 text-base font-bold text-white transition-[background-color,transform,box-shadow] duration-300 hover:bg-[#e54235] hover:-translate-y-1 active:scale-[0.97] shadow-[0_0_0_4px_rgba(250,92,79,0.15),0_0_60px_-12px_rgba(250,92,79,0.4)]"
          >
            {/* Animated glow ring */}
            <span className="absolute -inset-1 rounded-full bg-[#fa5c4f]/20 animate-pulse pointer-events-none" />
            <span className="absolute -inset-2 rounded-full bg-[#fa5c4f]/10 animate-[pulse_2s_ease-in-out_infinite_0.5s] pointer-events-none" />
            <Gamepad2 className="size-5 relative z-10" />
            <span className="relative z-10">Try the Playground</span>
            <ArrowRight className="size-4 relative z-10 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA — Docs */}
          <Link
            href="/docs/installation"
            className="group flex justify-center items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <span>or start building →</span>
          </Link>
        </motion.div>

        {/* Glassmorphic CLI Installer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
          className="w-full max-w-lg relative group"
        >
          {/* Subtle glowing shadow behind the box */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#fa5c4f]/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]/80 p-2 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
            
            <div className="relative flex items-center justify-between px-3 pb-2 pt-1 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                {(['pnpm', 'npm', 'bun', 'yarn'] as const).map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPkg(pkg)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-[background-color,color,box-shadow,transform] duration-150 cursor-pointer ${
                      selectedPkg === pkg
                        ? 'bg-[var(--text-main)] text-[var(--bg-page)] shadow-sm'
                        : 'text-[var(--text-subtle)] hover:text-[var(--text-main)] active:scale-[0.97]'
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-between px-5 py-4 font-mono text-sm text-[var(--text-main)]">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                <span className="text-[var(--text-subtle)] font-medium select-none">$</span>
                <span className="whitespace-nowrap">{PKG_COMMANDS[selectedPkg]}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 ml-4 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--border-color)] transition-colors cursor-pointer shrink-0"
                title="Copy command"
              >
                {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="size-5 text-[var(--text-subtle)] opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
