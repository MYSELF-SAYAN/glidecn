'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ArrowRight, BookOpen, Layers, Gamepad2 } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from '@/components/theme-toggle';

export function FloatingNavbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-5 z-50 mx-auto max-w-6xl px-4"
    >
      <div className="flex items-center justify-between rounded-full bg-[var(--bg-surface)]/90 backdrop-blur-xl px-5 sm:px-6 py-2.5 shadow-2xl border border-[var(--border-color)] text-[var(--text-main)]">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-105 group">
          <div className="w-8 h-8 rounded-xl bg-[#fa5c4f] flex items-center justify-center text-white shadow-md shadow-[#fa5c4f]/25 group-hover:rotate-6 transition">
            <Logo className="size-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-base font-display text-[var(--text-main)]">
            Morphy
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[var(--text-muted)]">
          <Link href="/docs" className="transition hover:text-[var(--text-main)]">
            Overview
          </Link>
          <Link href="/docs/installation" className="transition hover:text-[var(--text-main)]">
            Quickstart
          </Link>
          <Link href="/docs/transitions" className="transition hover:text-[var(--text-main)] flex items-center gap-1.5">
            <span>Transitions</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] text-[10px] font-bold">33+</span>
          </Link>
          <Link href="/playground/page-1" className="transition hover:text-[var(--text-main)] flex items-center gap-1 text-[var(--text-subtle)] hover:text-[#fa5c4f]">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Playground</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* GitHub Star */}
          <a
            href="https://github.com/morphy/morphy"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-hover)] transition btn-tactile"
          >
            <Github className="size-3.5" />
            <span>9.2k</span>
          </a>

          {/* Primary Documentation CTA */}
          <Link
            href="/docs/installation"
            className="group flex items-center gap-1.5 rounded-full bg-[#fa5c4f] hover:bg-[#e54235] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#fa5c4f]/25 transition-all active:scale-95 btn-tactile"
          >
            <span>Get Started</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

        </div>
      </div>
    </motion.header>
  );
}
