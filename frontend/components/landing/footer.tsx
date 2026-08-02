'use client';

import Link from 'next/link';
import { ArrowRight, Github, Gamepad2, BookOpen, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpriteMascot } from './sprite-mascot';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 sm:px-6 pb-12 pt-8 md:pb-16 md:pt-12 space-y-12">
      
      {/* Big CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a] text-white p-8 sm:p-12 md:p-14 shadow-2xl border border-white/10"
      >
        {/* Subtle glow */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#fa5c4f]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text */}
          <div className="max-w-lg text-center md:text-left space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display leading-[1.12]">
              Ready to elevate your <br className="hidden sm:block" />
              page transitions?
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Explore all 33+ transitions or test them live in the 2-page interactive playground.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/playground/page-1"
              className="group inline-flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#fa5c4f]/30 active:scale-95 transition btn-tactile"
            >
              <Gamepad2 className="size-4" />
              <span>Launch Playground</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-3.5 text-xs sm:text-sm font-bold text-white transition btn-tactile"
            >
              <BookOpen className="size-4 text-[#fa5c4f]" />
              <span>Read Docs</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Bottom Footer Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#fa5c4f] flex items-center justify-center text-white">
            <Logo className="size-3 text-white" />
          </div>
          <span className="font-bold font-display text-[var(--text-main)]">Morphy</span>
          <span className="text-[var(--text-subtle)] font-mono">v1.0.0</span>
        </div>

        <div className="flex items-center gap-6 font-semibold">
          <Link href="/docs" className="hover:text-[var(--text-main)] transition">Docs</Link>
          <Link href="/docs/transitions" className="hover:text-[var(--text-main)] transition">Transitions</Link>
          <Link href="/playground/page-1" className="hover:text-[var(--text-main)] transition">Playground</Link>
          <a
            href="https://github.com/morphy/morphy"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-main)] transition flex items-center gap-1"
          >
            <Github className="size-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

    </footer>
  );
}
