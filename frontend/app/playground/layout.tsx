'use client';

import Link from 'next/link';
import { Morphy } from '@/components/morphy';
import { Logo } from '@/components/landing/logo';
import { PlaygroundTransitionStudio } from '@/components/playground/transition-studio';
import {
  ArrowRightLeft,
  BookOpen,
  Github,
  Sparkles,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPage1 = pathname.includes('page-1') || pathname === '/playground';
  const otherPage = isPage1 ? '/playground/page-2' : '/playground/page-1';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] relative selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f]">
      
      {/* Playground Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[var(--bg-page)]/85 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
              title="Return to Home"
            >
              <div className="w-8 h-8 rounded-xl bg-[#fa5c4f] flex items-center justify-center text-white shadow-md shadow-[#fa5c4f]/25 group-hover:scale-105 transition">
                <Logo className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-base font-display text-[var(--text-main)]">
                MorphyJS
              </span>
            </Link>

            <span className="text-[var(--text-subtle)] font-mono text-xs">/</span>

            <span className="px-2.5 py-1 rounded-lg bg-[var(--badge-bg)] text-[#fa5c4f] border border-[var(--badge-border)] text-xs font-bold font-mono">
              2-Page Playground
            </span>
          </div>

          {/* 2-Page Direct Toggle Bar */}
          <nav className="flex items-center gap-1.5 p-1 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-color)] text-xs font-semibold">
            <Link
              href="/playground/page-1"
              className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 btn-tactile ${
                isPage1
                  ? 'bg-[#fa5c4f] text-white shadow-sm font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <span>🎈 Page 1 (Side A)</span>
            </Link>

            <Link
              href="/playground/page-2"
              className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 btn-tactile ${
                !isPage1
                  ? 'bg-[#fa5c4f] text-white shadow-sm font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <span>🕹️ Page 2 (Side B)</span>
            </Link>
          </nav>

          {/* Action Links */}
          <div className="flex items-center gap-2">
            <Link
              href={otherPage}
              className="px-3.5 py-1.5 rounded-xl bg-[#fa5c4f]/10 text-[#fa5c4f] hover:bg-[#fa5c4f] hover:text-white border border-[#fa5c4f]/30 text-xs font-bold transition flex items-center gap-1.5 btn-tactile"
              title="Flip between the 2 pages"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flip Page</span>
            </Link>

            <Link
              href="/docs"
              className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition hidden md:flex items-center gap-1.5 btn-tactile"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#fa5c4f]" />
              <span>Docs</span>
            </Link>

            <a
              href="https://github.com/morphy/morphy"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition btn-tactile"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Transition Container */}
      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        <Morphy>
          {children}
        </Morphy>
      </main>

      {/* Floating Transition Studio HUD */}
      <PlaygroundTransitionStudio />

    </div>
  );
}
