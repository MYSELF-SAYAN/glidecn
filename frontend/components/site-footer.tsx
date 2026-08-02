import Link from 'next/link';
import { Logo } from '@/components/landing/logo';
import { Github, Twitter, Heart } from 'lucide-react';

export function SiteFooter({ className = "mt-20" }: { className?: string }) {
  return (
    <footer className={`${className} border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-12 md:py-16`}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-[#fa5c4f] flex items-center justify-center text-white shadow-sm shadow-[#fa5c4f]/20 group-hover:rotate-6 transition">
                <Logo className="size-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-lg font-display text-[var(--text-main)]">
                MorphyJS
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
              An open-source React page transition library with a pluggable architecture, designed for maximum compositor performance.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://github.com/morphy" target="_blank" rel="noreferrer" className="text-[var(--text-subtle)] hover:text-[var(--text-main)] transition">
                <Github className="size-5" />
              </a>
              <a href="https://twitter.com/morphy" target="_blank" rel="noreferrer" className="text-[var(--text-subtle)] hover:text-[#1DA1F2] transition">
                <Twitter className="size-5" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-4">
            <h4 className="font-bold text-[var(--text-main)] font-display">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">Documentation</Link>
              </li>
              <li>
                <Link href="/docs/installation" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">Installation</Link>
              </li>
              <li>
                <Link href="/docs/props" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">API Reference</Link>
              </li>
              <li>
                <Link href="/playground/page-1" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">Playground</Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-[var(--text-main)] font-display">Shaders</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/docs/transitions#spatial" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">Spatial & 3D</Link>
              </li>
              <li>
                <Link href="/docs/transitions#portal" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">Portals</Link>
              </li>
              <li>
                <Link href="/docs/transitions#retro" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">Retro & SVG</Link>
              </li>
              <li>
                <Link href="/docs/transitions#dynamic" className="text-[var(--text-muted)] hover:text-[#fa5c4f] transition-colors">Kinetic Physics</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-subtle)]">
          <p>© {new Date().getFullYear()} MorphyJS Engine. Open source under MIT.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="size-3 text-[#fa5c4f]" fill="currentColor" /> for React & Next.js
          </p>
        </div>

      </div>
    </footer>
  );
}
