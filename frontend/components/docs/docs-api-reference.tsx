import React from 'react';
import { Layers, Settings, Zap, ArrowRight, Code2, Braces, Sparkles, Box, Clock, Move, Paintbrush } from 'lucide-react';
import Link from 'next/link';

export function DocsApiReference() {
  return (
    <div className="space-y-16">
      
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-xl morphy-card">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="sticker-pill">
              <Code2 className="size-3 text-purple-500" /> API Reference
            </span>
            <span className="text-xs font-mono text-[var(--text-subtle)]">v1.0 API</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
            Props & Configuration
          </h1>
          
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Morphy provides a clean, minimalistic API surface. You only need to interact with two main components and one hook to build incredibly rich transitions.
          </p>
        </div>
      </div>

      {/* 2. MORPHY PROVIDER BENTO */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-8 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Layers className="size-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[var(--text-main)]">
              &lt;MorphyProvider&gt;
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] pl-11 max-w-2xl">
            The root coordinator. It intercepts routing events, manages outgoing freeze-frame snapshots, and handles dual-frame crossfading. Place this high in your component tree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pl-11">
          
          {/* Main required prop */}
          <div className="md:col-span-12 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:border-blue-500/30 transition group flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono font-bold text-blue-500">children</code>
                <span className="text-[10px] font-mono font-bold text-rose-500 uppercase px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/20">Required</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors max-w-md">
                Your application layout and content. This must be the actual router nodes so Morphy can freeze the DOM when a route change is detected.
              </p>
              <code className="text-xs text-zinc-500 block">Type: React.ReactNode</code>
            </div>
            <div className="w-full md:w-auto shrink-0 bg-[#0e0e11] rounded-2xl p-4 border border-zinc-800 text-xs font-mono text-zinc-300">
              <span className="text-zinc-500">&lt;MorphyProvider&gt;</span><br/>
              <span className="pl-4 text-emerald-300">  {'{'}children{'}'}</span><br/>
              <span className="text-zinc-500">&lt;/MorphyProvider&gt;</span>
            </div>
          </div>

          <div className="md:col-span-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:border-blue-500/30 transition group space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Paintbrush className="size-4" /></div>
              <code className="text-sm font-mono font-bold text-blue-500">defaultTransition</code>
              <span className="text-[10px] font-mono font-bold text-[var(--text-subtle)] uppercase px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)]">"fade"</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
              The fallback shader animation used if a &lt;Page&gt; doesn't specify its own transition override. Must match an ID from the shader registry.
            </p>
            <code className="text-xs text-zinc-500 block">Type: string</code>
          </div>

          <div className="md:col-span-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:border-blue-500/30 transition group space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Clock className="size-4" /></div>
              <code className="text-sm font-mono font-bold text-blue-500">defaultDuration</code>
              <span className="text-[10px] font-mono font-bold text-[var(--text-subtle)] uppercase px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)]">0.5</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
              The global animation speed in seconds. This manages exactly how fast the dual-frame crossfade executes across the entire app.
            </p>
            <code className="text-xs text-zinc-500 block">Type: number (seconds)</code>
          </div>

        </div>
      </div>

      {/* 3. PAGE COMPONENT BENTO */}
      <div className="space-y-6 pt-8 border-t border-[var(--border-color)]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-8 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <Box className="size-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[var(--text-main)]">
              &lt;Page&gt;
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] pl-11 max-w-2xl">
            Represents an animatable route segment. Wrap the top-level content of every individual page with this component to enable page-level shader overrides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-11">
          
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:border-emerald-500/30 transition group space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <code className="text-sm font-mono font-bold text-emerald-500">transition</code>
              <span className="text-[10px] font-mono font-bold text-[var(--text-subtle)] uppercase px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)]">Inherits</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
              Overrides the global transition for this specific route. Example: <code className="text-zinc-400">"circular-portal"</code>
            </p>
            <code className="text-xs text-zinc-500 block">Type: string</code>
          </div>

          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:border-emerald-500/30 transition group space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Clock className="size-3" /></div>
              <code className="text-sm font-mono font-bold text-emerald-500">duration</code>
              <span className="text-[10px] font-mono font-bold text-[var(--text-subtle)] uppercase px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)]">Inherits</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
              Overrides the global animation speed for this page. Manage speed uniquely for heavy vs light pages.
            </p>
            <code className="text-xs text-zinc-500 block">Type: number (seconds)</code>
          </div>

          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:border-emerald-500/30 transition group space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Move className="size-3" /></div>
              <code className="text-sm font-mono font-bold text-emerald-500">direction</code>
              <span className="text-[10px] font-mono font-bold text-[var(--text-subtle)] uppercase px-2 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)]">undefined</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
              Defines flow for directional shaders (e.g., slide left vs right).
            </p>
            <code className="text-xs text-zinc-500 block">Type: "left" | "right" | "up" | "down" | "in" | "out"</code>
          </div>

        </div>
      </div>

      {/* 4. HOOK BENTO */}
      <div className="space-y-6 pt-8 border-t border-[var(--border-color)]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center size-8 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Braces className="size-4" />
            </span>
            <h2 className="text-2xl font-bold font-display text-[var(--text-main)]">
              useMorphy()
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)] pl-11 max-w-2xl">
            A custom React hook that allows you to programmatically read and modify the active transition configuration at runtime. Perfect for user preference modals or dynamic route contextual animations.
          </p>
        </div>

        <div className="pl-11">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[#0e0e11] p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center gap-8 justify-between group">
            <div className="space-y-4 w-full">
              {[
                { prop: 'currentTransition', type: 'string', desc: 'The currently active transition ID.' },
                { prop: 'config', type: 'object', desc: 'The global configuration (duration, direction).' },
                { prop: 'setTransition', type: '(id: string) => void', desc: 'Programmatically update the global transition type.' },
                { prop: 'setConfig', type: '(cfg: Config) => void', desc: 'Update global transition options (like speed/duration).' },
              ].map((item) => (
                <div key={item.prop} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-zinc-800/50 last:border-0 gap-2">
                  <div className="flex items-center gap-3">
                    <code className="text-sm font-mono font-bold text-amber-400">{item.prop}</code>
                    <code className="text-[10px] text-zinc-600 border border-zinc-800 px-1.5 py-0.5 rounded-md hidden sm:block">{item.type}</code>
                  </div>
                  <span className="text-sm text-zinc-400 text-left sm:text-right">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-8 flex justify-end">
        <Link
          href="/docs/transitions"
          className="group flex items-center gap-2 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] px-6 py-4 text-sm font-bold text-[var(--text-main)] hover:text-[#fa5c4f] transition btn-tactile shadow-sm"
        >
          <Sparkles className="size-4" />
          <span>Explore Transition Catalog</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
}
