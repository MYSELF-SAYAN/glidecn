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
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        
        {/* Left Side — Code Block */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative overflow-hidden rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 shadow-xl">
            
            {/* Window controls */}
            <div className="mb-4 flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-full bg-red-500/80" />
                <div className="size-3 rounded-full bg-yellow-500/80" />
                <div className="size-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-[11px] text-[var(--text-subtle)]">layout.tsx</span>
              </div>
              
              <button
                onClick={handleCopy}
                aria-label="Copy code snippet"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition cursor-pointer"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <pre className="font-mono text-xs leading-relaxed text-[var(--text-main)] overflow-x-auto no-scrollbar py-2">
              <code dangerouslySetInnerHTML={{
                __html: CODE_SNIPPET
                  .replace(/import/g, '<span class="text-pink-500 font-bold">import</span>')
                  .replace(/from/g, '<span class="text-pink-500 font-bold">from</span>')
                  .replace(/export default function|export function/g, '<span class="text-pink-500 font-bold">$&</span>')
                  .replace(/return/g, '<span class="text-pink-500 font-bold">return</span>')
                  .replace(/Morphy/g, '<span class="text-emerald-600 dark:text-emerald-400 font-bold">Morphy</span>')
                  .replace(/Page/g, '<span class="text-blue-600 dark:text-blue-400 font-bold">Page</span>')
                  .replace(/transition=/g, '<span class="text-[#fa5c4f] font-bold">transition=</span>')
                  .replace(/defaultTransition=/g, '<span class="text-[#fa5c4f] font-bold">defaultTransition=</span>')
                  .replace(/"cube"|"circular-portal"|'@\/components\/morphy'/g, '<span class="text-amber-600 dark:text-amber-300">$&</span>')
                  .replace(/h1/g, '<span class="text-cyan-600 dark:text-cyan-400">h1</span>')
              }} />
            </pre>
          </div>
        </motion.div>

        {/* Right Side — Typography */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-start order-1 lg:order-2 space-y-4"
        >
          <span className="sticker-pill">
            <Code2 className="size-3 text-[#fa5c4f]" /> Clean Architecture
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display leading-[1.12]">
            Minimal boilerplate. <br />
            Maximum flexibility.
          </h2>
          
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
            Wrap your app in <code className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[#fa5c4f] border border-[var(--border-color)] font-mono text-xs">&lt;Morphy&gt;</code>, specify a transition on <code className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] text-[#fa5c4f] border border-[var(--border-color)] font-mono text-xs">&lt;Page&gt;</code>, and let Morphy coordinate frame exits and entries.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#fa5c4f] hover:bg-[#e54235] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#fa5c4f]/25 transition btn-tactile"
            >
              <span>Read Documentation</span>
              <ArrowRight className="size-3.5" />
            </Link>

            <Link
              href="/playground/page-1"
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] px-4 py-2.5 text-xs font-semibold text-[var(--text-main)] transition btn-tactile"
            >
              <span>Try Live in Playground</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
