'use client';

import { motion } from 'framer-motion';
import { Copy, Check, Sparkles, Terminal, Code2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const CODE_SNIPPET = `import { Morphy, Page } from '@/components/morphy';

export default function RootLayout({ children }) {
  return (
    <Morphy defaultTransition="cube">
      {children}
    </Morphy>
  );
}

// In your page route:
export function ContactPage() {
  return (
    <Page transition="circular-portal">
      <h1>Contact Us</h1>
    </Page>
  );
}`;

export function DxSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        
        {/* Left Side — Code Block (macOS Glassmorphism) */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1 group"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-[#fa5c4f]/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative overflow-hidden rounded-2xl bg-[#0d0d0d]/90 border border-white/10 p-2 shadow-2xl backdrop-blur-2xl ring-1 ring-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
            
            {/* Window controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-t-xl border-b border-white/10 mb-2 relative z-10">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10" />
                <div className="size-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10" />
                <div className="size-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10" />
                <span className="ml-3 font-mono text-[11px] text-white/50 tracking-wider">layout.tsx</span>
              </div>
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <pre className="font-mono text-sm leading-relaxed text-white/80 overflow-x-auto no-scrollbar px-5 py-4 relative z-10">
              <code dangerouslySetInnerHTML={{
                __html: CODE_SNIPPET
                  .replace(/import/g, '<span class="text-pink-400 font-bold">import</span>')
                  .replace(/from/g, '<span class="text-pink-400 font-bold">from</span>')
                  .replace(/export default function|export function/g, '<span class="text-pink-400 font-bold">$&</span>')
                  .replace(/return/g, '<span class="text-pink-400 font-bold">return</span>')
                  .replace(/Morphy/g, '<span class="text-emerald-400 font-bold">Morphy</span>')
                  .replace(/Page/g, '<span class="text-blue-400 font-bold">Page</span>')
                  .replace(/transition=/g, '<span class="text-yellow-200">transition=</span>')
                  .replace(/defaultTransition=/g, '<span class="text-yellow-200">defaultTransition=</span>')
                  .replace(/"cube"|"circular-portal"|'@\/components\/morphy'/g, '<span class="text-amber-300">$&</span>')
                  .replace(/h1/g, '<span class="text-cyan-400">h1</span>')
              }} />
            </pre>
          </div>
        </motion.div>

        {/* Right Side — Typography */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start order-1 lg:order-2 space-y-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] text-[10px] uppercase tracking-widest font-bold">
            <Code2 className="size-3 text-[#fa5c4f]" /> Clean Architecture
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[var(--text-main)] font-display leading-[1.15]">
            Minimal boilerplate. <br />
            Maximum flexibility.
          </h2>
          
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-lg font-light">
            Wrap your app in <code className="px-2 py-1 rounded-md bg-[var(--bg-surface)] text-[#fa5c4f] border border-[var(--border-color)] font-mono text-sm">&lt;Morphy&gt;</code>, specify a transition on <code className="px-2 py-1 rounded-md bg-[var(--bg-surface)] text-[#fa5c4f] border border-[var(--border-color)] font-mono text-sm">&lt;Page&gt;</code>, and let the engine coordinate frame exits and entries. No complex state management required.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/docs"
              className="w-full sm:w-auto group relative flex justify-center items-center gap-2 rounded-full bg-[#fa5c4f] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e54235] hover:shadow-[0_0_30px_-10px_rgba(250,92,79,0.5)] hover:-translate-y-0.5"
            >
              <span>Read Documentation</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/playground/page-1"
              className="w-full sm:w-auto group flex justify-center items-center gap-2 text-sm font-medium text-[var(--text-main)] hover:text-[#fa5c4f] transition-colors"
            >
              <span>Try Live in Playground</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
