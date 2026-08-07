'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Github, ArrowRight, Gamepad2, Download } from 'lucide-react';
import { Logo } from './logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState, useEffect } from 'react';

export function FloatingNavbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [stars, setStars] = useState<string>('-');
  const [downloads, setDownloads] = useState<string>('-');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    // Fetch GitHub stars
    fetch('https://api.github.com/repos/MYSELF-SAYAN/glidecn')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStars(new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(data.stargazers_count));
        }
      })
      .catch(() => setStars('0'));

    // Fetch npm downloads
    fetch('https://api.npmjs.org/downloads/point/last-month/glidecn-cli')
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads !== undefined) {
          setDownloads(new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(data.downloads));
        }
      })
      .catch(() => setDownloads('0'));
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-6 z-50 mx-auto max-w-5xl px-4"
    >
      <div 
        className={`flex items-center justify-between rounded-full transition-[background-color,border-color,box-shadow,padding] duration-300 ease-out border ${
          isScrolled 
            ? 'bg-white/70 dark:bg-[#09090b]/70 backdrop-blur-3xl border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-4 py-2.5' 
            : 'bg-white/20 dark:bg-black/20 backdrop-blur-xl border-transparent shadow-none px-6 py-4'
        }`}
      >
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 group">
          <div className="w-8 h-8 rounded-xl bg-[#fa5c4f] flex items-center justify-center text-white shadow-md shadow-[#fa5c4f]/25 group-hover:rotate-12 transition-transform duration-500">
            <Logo className="size-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-sm font-display text-[var(--text-main)] transition-colors">
            GlideCN
          </span>
        </Link>

        {/* Navigation Links - Centered & Glassy */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
          <Link href="/docs" className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white dark:hover:bg-white/10 transition-colors duration-200">
            Docs
          </Link>
          <Link href="/docs/transitions" className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white dark:hover:bg-white/10 transition-colors duration-200 flex items-center gap-1.5 group">
            <span>Transitions</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fa5c4f] group-hover:animate-pulse" />
          </Link>
          <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />
          <Link href="/playground/page-1" className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[var(--text-subtle)] hover:text-[#fa5c4f] hover:bg-[#fa5c4f]/10 transition-colors duration-200 flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Playground</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          <ThemeToggle />

          <a
            href="https://www.npmjs.com/package/glidecn-cli"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/10 transition-[background-color,color,transform] duration-200 active:scale-95 btn-tactile shadow-sm backdrop-blur-md"
            title="NPM Downloads (Last 30 Days)"
          >
            <Download className="size-3.5" />
            <span>{downloads}</span>
          </a>

          <a
            href="https://github.com/MYSELF-SAYAN/glidecn"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/10 transition-[background-color,color,transform] duration-200 active:scale-95 btn-tactile shadow-sm backdrop-blur-md"
            title="GitHub Stars"
          >
            <Github className="size-3.5" />
            <span>{stars}</span>
          </a>

          <Link
            href="/docs/installation"
            className="group hidden sm:flex items-center gap-2 rounded-full bg-[#fa5c4f] hover:bg-[#e54235] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#fa5c4f]/25 transition-[background-color,transform] duration-200 active:scale-95 btn-tactile overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700" />
            <span>Build</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>
      </div>
    </motion.header>
  );
}
