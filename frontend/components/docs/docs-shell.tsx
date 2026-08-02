'use client';

import type { ReactNode } from 'react';
import { DocsSidebar } from './docs-sidebar';
import Link from 'next/link';
import { Logo } from '@/components/landing/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Github, Gamepad2, ArrowLeft } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] font-sans antialiased selection:bg-[#fa5c4f]/20 selection:text-[#fa5c4f]">
      
      {/* Full-Width Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-color)] bg-[var(--bg-surface)]/90 backdrop-blur-md">
        <div className="flex h-14 w-full items-center justify-between px-4 sm:px-8">
          
          {/* Brand & Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#fa5c4f] flex items-center justify-center text-white shadow-sm shadow-[#fa5c4f]/20 group-hover:rotate-6 transition">
                <Logo className="size-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-base font-display text-[var(--text-main)]">
                Morphy
              </span>
            </Link>
            <span className="text-[var(--text-subtle)] text-sm font-mono">/</span>
            <span className="text-sm font-semibold text-[var(--text-muted)]">Documentation</span>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/playground/page-1"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] border border-[#fa5c4f]/30 hover:bg-[#fa5c4f] hover:text-white transition text-xs font-bold btn-tactile"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Playground</span>
            </Link>

            <ThemeToggle className="w-8 h-8" />

            <a
              href="https://github.com/morphy/morphy"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition btn-tactile"
            >
              <Github className="size-4" />
            </a>
          </div>

        </div>
      </header>

      {/* Main Full-Width Split Layout: Full Left Sidebar + Full-Width Content Canvas */}
      <div className="flex min-h-[calc(100vh-3.5rem)] w-full">
        
        {/* Full Left-Side Pinned Sidebar */}
        <DocsSidebar />

        {/* Full-Width Content Area */}
        <main className="flex-1 min-w-0 w-full">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
            {children}
          </div>
        </main>

      </div>

      <SiteFooter className="mt-0" />

    </div>
  );
}
