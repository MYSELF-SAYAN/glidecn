'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Check, Star, ChevronDown, Layers, Gamepad2, BookOpen } from 'lucide-react';
import Link from 'next/link';

const PKG_COMMANDS = {
  pnpm: 'pnpm dlx morphyjs-cli@latest add',
  npm: 'npx morphyjs-cli@latest add',
  bun: 'bunx morphyjs-cli@latest add',
  yarn: 'yarn dlx morphyjs-cli@latest add',
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
      
      {/* Structural Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border-color)_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 w-full flex flex-col items-center text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span className="sticker-pill">
            <Star className="size-3 fill-[#fa5c4f] text-[#fa5c4f]" />
            33+ Zero-Jank Shaders
          </span>
          <Link
            href="/playground/page-1"
            className="sticker-pill hover:scale-105 transition-transform cursor-pointer"
          >
            <Gamepad2 className="size-3" />
            Playground Mode
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-main)] font-display leading-[1.05] mb-8 max-w-4xl"
        >
          Page transitions <br className="hidden sm:block" />
          that{' '}
          <span className="relative inline-block font-cursive text-[#fa5c4f] text-6xl sm:text-8xl lg:text-9xl font-normal tracking-normal pr-4">
            flow.
            <motion.svg
              className="absolute -bottom-2 sm:-bottom-4 left-0 w-full text-[#fa5c4f]/40"
              viewBox="0 0 120 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            >
              <path d="M5 8C25 2 45 12 65 6C85 0 105 10 115 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </motion.svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-lg sm:text-xl leading-relaxed text-[var(--text-muted)] mb-12 font-medium"
        >
          The pluggable page transition library for React & Next.js. Copy-paste hardware-accelerated shaders directly into your codebase. No lock-in. No bloat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14"
        >
          <Link
            href="/docs/installation"
            className="w-full sm:w-auto group flex justify-center items-center gap-2 rounded-2xl bg-[#fa5c4f] px-8 py-4 text-sm font-bold text-white btn-tactile hover:shadow-[0_12px_32px_-8px_rgba(250,92,79,0.12)] hover:bg-[#e54235] hover:-translate-y-[2px]"
          >
            <BookOpen className="size-5" />
            Get Started
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/docs/transitions"
            className="w-full sm:w-auto group flex justify-center items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-8 py-4 text-sm font-bold text-[var(--text-main)] btn-tactile hover:shadow-[0_12px_32px_-8px_rgba(250,92,79,0.12)] hover:bg-[var(--bg-card)] hover:border-[#fa5c4f] hover:-translate-y-[2px]"
          >
            <Layers className="size-5 text-[#fa5c4f] group-hover:rotate-12 transition-transform" />
            Browse 33+ Transitions
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
          className="w-full max-w-lg rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-2 shadow-lg backdrop-blur-md mx-auto"
        >
          <div className="flex items-center justify-between px-2 pb-2 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-1">
              {(['pnpm', 'npm', 'bun', 'yarn'] as const).map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setSelectedPkg(pkg)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    selectedPkg === pkg
                      ? 'bg-[#fa5c4f]/10 text-[#fa5c4f]'
                      : 'text-[var(--text-subtle)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-[var(--text-subtle)] font-bold tracking-widest uppercase px-2 hidden sm:block">CLI Installer</span>
          </div>

          <div className="flex items-center justify-between px-4 py-3 font-mono text-sm text-[var(--text-main)] bg-[var(--bg-card)]/50 rounded-b-xl mt-1">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
              <span className="text-[#fa5c4f] font-bold select-none">~</span>
              <span className="whitespace-nowrap">{PKG_COMMANDS[selectedPkg]}</span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 ml-4 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-main)] transition-colors cursor-pointer shrink-0 border border-[var(--border-color)] shadow-sm"
              title="Copy command"
            >
              {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            </button>
          </div>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="size-6 text-[var(--text-subtle)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
