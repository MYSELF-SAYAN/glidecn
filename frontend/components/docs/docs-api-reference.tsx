import React from 'react';
import { Layers, Box, Braces, Sparkles, ArrowRight, Code2, Paintbrush, Clock, Move } from 'lucide-react';
import Link from 'next/link';

export function DocsApiReference() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/50">
              <Code2 className="size-3" />
              API Reference
            </span>
            <span className="text-xs font-mono text-zinc-500">v1.0 API</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-medium tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.05] mb-8">
            Props & Configuration
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Morphy provides a clean, minimalistic API surface. You only need to interact with two main components and one hook to build incredibly rich transitions.
          </p>
        </div>
      </section>

      {/* 2. MORPHY PROVIDER */}
      <section className="space-y-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-3">
            <Layers className="size-6 text-zinc-400" />
            &lt;MorphyProvider&gt;
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The root coordinator. It intercepts routing events, manages outgoing freeze-frame snapshots, and handles dual-frame crossfading. Place this high in your component tree.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          
          {/* Main required prop */}
          <div className="lg:col-span-12 bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">children</code>
                <span className="text-[10px] font-mono font-bold text-zinc-900 dark:text-zinc-50 uppercase px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700">Required</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your application layout and content. This must be the actual router nodes so Morphy can freeze the DOM when a route change is detected.
              </p>
              <code className="text-xs font-mono text-zinc-500">React.ReactNode</code>
            </div>
            <div className="w-full md:w-auto shrink-0 bg-[#0d0d0d] rounded-xl p-5 border border-zinc-800 text-[13px] font-mono text-zinc-300 leading-loose">
              <span className="text-zinc-500">&lt;MorphyProvider&gt;</span><br/>
              <span className="pl-4 text-emerald-300">  {'{'}children{'}'}</span><br/>
              <span className="text-zinc-500">&lt;/MorphyProvider&gt;</span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <Paintbrush className="size-4 text-zinc-400" />
              <code className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">defaultTransition</code>
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">"fade"</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The fallback shader animation used if a &lt;Page&gt; doesn't specify its own transition override. Must match an ID from the shader registry.
            </p>
            <code className="text-xs font-mono text-zinc-500">string</code>
          </div>

          <div className="lg:col-span-6 bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-zinc-400" />
              <code className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">defaultDuration</code>
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">0.5</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The global animation speed in seconds. This manages exactly how fast the dual-frame crossfade executes across the entire app.
            </p>
            <code className="text-xs font-mono text-zinc-500">number</code>
          </div>

        </div>
      </section>

      {/* 3. PAGE COMPONENT */}
      <section className="space-y-8 pt-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-3">
            <Box className="size-6 text-zinc-400" />
            &lt;Page&gt;
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Represents an animatable route segment. Wrap the top-level content of every individual page with this component to enable page-level shader overrides.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          
          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 space-y-4">
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">transition</code>
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">Inherits</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Overrides the global transition for this specific route.
            </p>
            <code className="text-xs font-mono text-zinc-500 block">string</code>
          </div>

          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 space-y-4">
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">duration</code>
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">Inherits</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Overrides the global animation speed for this page.
            </p>
            <code className="text-xs font-mono text-zinc-500 block">number</code>
          </div>

          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-10 space-y-4">
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">direction</code>
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">undefined</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Defines flow for directional shaders.
            </p>
            <code className="text-[11px] font-mono text-zinc-500 block">"left" | "right" | "up" | "down" | "in" | "out"</code>
          </div>

        </div>
      </section>

      {/* 4. USEMORPHY HOOK */}
      <section className="space-y-8 pt-12 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-3">
            <Braces className="size-6 text-zinc-400" />
            useMorphy()
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A custom React hook that allows you to programmatically read and modify the active transition configuration at runtime.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b] p-6 md:p-10 overflow-hidden">
          <div className="space-y-1">
            {[
              { prop: 'currentTransition', type: 'string', desc: 'The currently active transition ID.' },
              { prop: 'config', type: 'object', desc: 'The global configuration (duration, direction).' },
              { prop: 'setTransition', type: '(id: string) => void', desc: 'Programmatically update the global transition type.' },
              { prop: 'setConfig', type: '(cfg: Config) => void', desc: 'Update global transition options (like speed/duration).' },
            ].map((item) => (
              <div key={item.prop} className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-zinc-200 dark:border-zinc-800/50 last:border-0 gap-4">
                <div className="flex items-center gap-4">
                  <code className="text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100">{item.prop}</code>
                  <code className="text-[11px] font-mono text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-md hidden md:block">{item.type}</code>
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="pt-12 flex justify-end">
        <Link
          href="/docs/transitions"
          className="group flex items-center gap-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 px-6 py-4 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <Sparkles className="size-4" />
          Explore Transition Catalog
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </div>
  );
}
