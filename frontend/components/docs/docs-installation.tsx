'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Copy,
  Check,
  FolderTree,
  LayoutTemplate,
  FileCode2,
  PackagePlus,
  Settings2,
  ArrowRight,
} from 'lucide-react';

export function DocsInstallation() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'app' | 'pages' | 'vite'>('app');
  const [activePm, setActivePm] = useState<'pnpm' | 'npm' | 'bun' | 'yarn'>('pnpm');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-24 w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center w-full">
          
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/50">
                <Terminal className="size-3" />
                Quickstart
              </span>
              <span className="text-xs font-mono text-zinc-500">Under 2 minutes</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-display font-medium tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.05] mb-8">
              Install via CLI.
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              Morphy does not distribute as an NPM runtime dependency. Instead, we generate the exact source code directly into your repository so you own the animation logic completely.
            </p>
          </div>

          <div className="flex-1 w-full min-w-0">
            {/* Premium Full-Width Terminal */}
            <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0c] shadow-2xl overflow-hidden group">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex gap-2 shrink-0">
                  <div className="size-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="size-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="size-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                
                <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-950 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar">
                  {['pnpm', 'npm', 'bun', 'yarn'].map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setActivePm(pm as any)}
                      className={`px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-colors whitespace-nowrap ${
                        activePm === pm
                          ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-[13px] text-zinc-300 bg-[#0a0a0c]">
                <div className="flex items-center justify-between mb-6 group/cmd">
                  <code className="text-zinc-300">
                    <span className="text-emerald-500 mr-2">~</span>
                    <span className="text-zinc-500">
                      {activePm === 'npm' ? 'npx' : activePm === 'bun' ? 'bunx' : `${activePm} dlx`}
                    </span>{' '}
                    <span className="text-zinc-100 font-medium">morphyjs-cli@latest init</span>
                  </code>
                  <button
                    onClick={() => copyToClipboard(
                      `${activePm === 'npm' ? 'npx' : activePm === 'bun' ? 'bunx' : `${activePm} dlx`} morphyjs-cli@latest init`,
                      'cli-init'
                    )}
                    className="p-2 -mr-2 rounded-lg text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors opacity-0 group-hover/cmd:opacity-100"
                  >
                    {copiedCmd === 'cli-init' ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                  </button>
                </div>
                
                <div className="pl-2 border-l-2 border-zinc-800/50 space-y-2 py-1 text-zinc-400">
                  <div className="animate-in fade-in slide-in-from-left-2 duration-500"><span className="text-zinc-500 mr-2">✔</span> Initializing registry...</div>
                  <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-150"><span className="text-zinc-500 mr-2">✔</span> Installing <span className="text-zinc-300">framer-motion</span></div>
                  <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-300"><span className="text-zinc-500 mr-2">✔</span> Created <span className="text-zinc-300">@/components/morphy</span></div>
                </div>
                
                <div className="mt-6 text-zinc-100 font-medium flex items-center gap-2 animate-in fade-in duration-500 delay-500">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Success. Ready to animate.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURE BENTO */}
      <section className="space-y-8">
        <div className="grid md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          
          <div className="bg-zinc-50 dark:bg-[#09090b] p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-6">
              <FolderTree className="size-6 text-zinc-400 dark:text-zinc-500" />
              <div>
                <h2 className="text-2xl font-display font-medium text-zinc-900 dark:text-zinc-50 mb-3">Zero Black-Box Dependencies</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  When you initialize, Morphy adds exactly the code you need directly into your project's component directory. You own it, you can modify it, and it won't break on upstream updates.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#09090b] p-8 md:p-12 font-mono text-sm overflow-x-auto flex items-center">
            <div className="text-zinc-500 space-y-3 w-full">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium">
                <FolderTree className="size-4" /> your-project/
              </div>
              <div className="pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-2">
                  <FolderTree className="size-4" /> app/
                </div>
                <div className="flex items-center gap-2">
                  <FolderTree className="size-4" /> components/
                </div>
                <div className="pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-2 relative">
                  <div className="absolute top-2 -left-[1px] w-4 border-t border-zinc-200 dark:border-zinc-800" />
                  <div className="flex flex-col gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50">
                    <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100">
                      <FolderTree className="size-4" /> morphy/
                    </div>
                    <div className="pl-6 flex items-center gap-2 text-xs">
                      <FileCode2 className="size-3.5 text-zinc-400" /> index.ts
                    </div>
                    <div className="pl-6 flex items-center gap-2 text-xs">
                      <FileCode2 className="size-3.5 text-zinc-400" /> provider.tsx
                    </div>
                    <div className="pl-6 flex items-center gap-2 text-xs">
                      <FileCode2 className="size-3.5 text-zinc-400" /> page.tsx
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. STEP-BY-STEP TABS */}
      <section className="space-y-8">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-3">
            <LayoutTemplate className="size-6 text-zinc-400" />
            Framework Integration
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Setup requires just two components: a provider and a page wrapper.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b] overflow-hidden">
          <div className="flex items-center gap-6 px-6 pt-4 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar">
            {['app', 'pages', 'vite'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50'
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
                }`}
              >
                {tab === 'app' ? 'Next.js App' : tab === 'pages' ? 'Next.js Pages' : 'Vite (React Router)'}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-10 space-y-12">
            
            {/* Step 1: Provider */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex shrink-0 items-center justify-center size-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-medium">1</span>
                <div>
                  <h3 className="font-medium text-base text-zinc-900 dark:text-zinc-50 mb-1">Wrap Your Root Layout</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                    Add <code>&lt;MorphyProvider&gt;</code> to coordinate route changes and manage the dual-frame crossfade.
                  </p>
                </div>
              </div>
              
              <div className="ml-12 rounded-xl bg-[#0d0d0d] border border-zinc-800 p-6 font-mono text-[13px] text-zinc-300 overflow-x-auto leading-loose">
                {activeTab === 'app' && (
                  <pre>
<span className="text-zinc-500">// app/layout.tsx</span>
<br/><span className="text-pink-400">import</span> {'{'} <span className="text-amber-200">MorphyProvider</span> {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><br/><span className="text-pink-400">export default function</span> <span className="text-blue-300">RootLayout</span>({'{'} children {'}'}: {'{'} children: React.ReactNode {'}'}) {'{'}
<br/>  <span className="text-pink-400">return</span> (
<br/>    &lt;<span className="text-blue-300">html</span> <span className="text-amber-200">lang</span>=<span className="text-emerald-300">"en"</span>&gt;
<br/>      &lt;<span className="text-blue-300">body</span>&gt;
<br/>        &lt;<span className="text-amber-200">MorphyProvider</span> <span className="text-amber-200">defaultTransition</span>=<span className="text-emerald-300">"cube"</span>&gt;
<br/>          {'{'}children{'}'}
<br/>        &lt;/<span className="text-amber-200">MorphyProvider</span>&gt;
<br/>      &lt;/<span className="text-blue-300">body</span>&gt;
<br/>    &lt;/<span className="text-blue-300">html</span>&gt;
<br/>  );
<br/>{'}'}
                  </pre>
                )}
                {activeTab === 'pages' && (
                  <pre>
<span className="text-zinc-500">// pages/_app.tsx</span>
<br/><span className="text-pink-400">import</span> {'{'} <span className="text-amber-200">MorphyProvider</span> {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><br/><span className="text-pink-400">export default function</span> <span className="text-blue-300">App</span>({'{'} Component, pageProps, router {'}'}: AppProps) {'{'}
<br/>  <span className="text-pink-400">return</span> (
<br/>    &lt;<span className="text-amber-200">MorphyProvider</span> <span className="text-amber-200">key</span>={'{'}router.pathname{'}'} <span className="text-amber-200">defaultTransition</span>=<span className="text-emerald-300">"cube"</span>&gt;
<br/>      &lt;<span className="text-blue-300">Component</span> {'{'}...pageProps{'}'} /&gt;
<br/>    &lt;/<span className="text-amber-200">MorphyProvider</span>&gt;
<br/>  );
<br/>{'}'}
                  </pre>
                )}
                {activeTab === 'vite' && (
                  <pre>
<span className="text-zinc-500">// src/App.tsx</span>
<br/><span className="text-pink-400">import</span> {'{'} <span className="text-amber-200">MorphyProvider</span> {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><span className="text-pink-400">import</span> {'{'} <span className="text-amber-200">useLocation</span> {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'react-router-dom'</span>;
<br/><br/><span className="text-pink-400">export function</span> <span className="text-blue-300">App</span>() {'{'}
<br/>  <span className="text-pink-400">const</span> location = <span className="text-amber-200">useLocation</span>();
<br/>  <span className="text-pink-400">return</span> (
<br/>    &lt;<span className="text-amber-200">MorphyProvider</span> <span className="text-amber-200">key</span>={'{'}location.pathname{'}'} <span className="text-amber-200">defaultTransition</span>=<span className="text-emerald-300">"cube"</span>&gt;
<br/>      <span className="text-zinc-500">{/* Your Routes */}</span>
<br/>    &lt;/<span className="text-amber-200">MorphyProvider</span>&gt;
<br/>  );
<br/>{'}'}
                  </pre>
                )}
              </div>
            </div>

            {/* Step 2: Page */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex shrink-0 items-center justify-center size-8 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-medium">2</span>
                <div>
                  <h3 className="font-medium text-base text-zinc-900 dark:text-zinc-50 mb-1">Wrap Your Pages</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                    Wrap each route segment in <code>&lt;Page&gt;</code> and optionally override the default transition animation per-route.
                  </p>
                </div>
              </div>
              
              <div className="ml-12 rounded-xl bg-[#0d0d0d] border border-zinc-800 p-6 font-mono text-[13px] text-zinc-300 overflow-x-auto leading-loose">
                <pre>
<span className="text-pink-400">import</span> {'{'} <span className="text-amber-200">Page</span> {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><br/><span className="text-pink-400">export default function</span> <span className="text-blue-300">Dashboard</span>() {'{'}
<br/>  <span className="text-pink-400">return</span> (
<br/>    &lt;<span className="text-amber-200">Page</span> <span className="text-amber-200">transition</span>=<span className="text-emerald-300">"circular-portal"</span> <span className="text-amber-200">duration</span>={'{'}0.7{'}'}&gt;
<br/>      &lt;<span className="text-blue-300">h1</span>&gt;Dashboard&lt;/<span className="text-blue-300">h1</span>&gt;
<br/>    &lt;/<span className="text-amber-200">Page</span>&gt;
<br/>  );
<br/>{'}'}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. EXTENDABILITY */}
      <section className="space-y-8">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-3">
            <PackagePlus className="size-6 text-zinc-400" />
            Curated Shader Registry
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Pull down specific shaders to your project using the CLI without blowing up your bundle size.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { cmd: 'npx morphy add cube', name: '3D Cube' },
            { cmd: 'npx morphy add circular-portal', name: 'Iris Portal' },
            { cmd: 'npx morphy add origami-unfold', name: 'Origami Fold' },
            { cmd: 'npx morphy add ink-spread', name: 'Ink Diffusion' },
          ].map((item) => (
            <div
              key={item.cmd}
              className="group flex items-center justify-between p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#09090b] hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-zinc-500">{item.name}</span>
                <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100">
                  {item.cmd}
                </code>
              </div>
              <button
                onClick={() => copyToClipboard(item.cmd, item.cmd)}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {copiedCmd === item.cmd ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DYNAMIC SWITCHING */}
      <section className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-px bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          
          <div className="w-full lg:w-1/2 bg-zinc-50 dark:bg-[#09090b] p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-6 max-w-sm">
              <Settings2 className="size-6 text-zinc-400 dark:text-zinc-500" />
              <div>
                <h2 className="text-2xl font-display font-medium text-zinc-900 dark:text-zinc-50 mb-3">Dynamic Hooks</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  Build user preferences, presentation modals, or context-aware animations by updating the transition programmatically at runtime using the <code>useMorphy()</code> hook.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-[#0d0d0d] p-8 md:p-12 font-mono text-[13px] leading-loose overflow-x-auto flex items-center text-zinc-300">
            <pre>
<span className="text-pink-400">const</span> {'{'} setTransition {'}'} = <span className="text-amber-200">useMorphy</span>();
<br/><br/><span className="text-pink-400">return</span> (
<br/>  &lt;<span className="text-blue-300">button</span> 
<br/>    <span className="text-amber-200">onClick</span>={'{'}() =&gt; <span className="text-blue-300">setTransition</span>(<span className="text-emerald-300">'cube'</span>){'}'}
<br/>  &gt;
<br/>    Switch to Cube
<br/>  &lt;/<span className="text-blue-300">button</span>&gt;
<br/>);
            </pre>
          </div>

        </div>
      </section>

    </div>
  );
}
