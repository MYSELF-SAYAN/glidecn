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
  Boxes,
  Zap,
} from 'lucide-react';
import { SpriteMascot } from '@/components/landing/sprite-mascot';

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
    <div className="space-y-12">
      
      {/* 1. HERO BANNER: CLI Quickstart */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-xl morphy-card">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-[#fa5c4f]/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="sticker-pill">
                <Terminal className="size-3 text-[#fa5c4f]" /> Quickstart
              </span>
              <span className="text-xs font-mono text-[var(--text-subtle)]">Under 2 minutes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-main)] font-display">
              Install Morphy via CLI
            </h1>
            
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Morphy does not distribute as an NPM runtime dependency. Instead, we generate the exact source code directly into your repository so you own the animation logic completely.
            </p>

            <div className="pt-4 max-w-sm">
              <div className="rounded-2xl border border-[var(--border-color)] bg-[#0e0e11] overflow-hidden shadow-sm">
                <div className="flex items-center gap-1 p-2 border-b border-zinc-800/50 bg-[#151518] overflow-x-auto no-scrollbar">
                  {['pnpm', 'npm', 'bun', 'yarn'].map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setActivePm(pm as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                        activePm === pm
                          ? 'bg-[#fa5c4f] text-white'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0e0e11] group">
                  <code className="text-xs font-mono text-zinc-300">
                    <span className="text-[#fa5c4f]">
                      {activePm === 'npm' ? 'npx' : activePm === 'bun' ? 'bunx' : `${activePm} dlx`}
                    </span> morphyjs-cli@latest init
                  </code>
                  <button
                    onClick={() => copyToClipboard(
                      `${activePm === 'npm' ? 'npx' : activePm === 'bun' ? 'bunx' : `${activePm} dlx`} morphyjs-cli@latest init`,
                      'cli-init'
                    )}
                    className="p-2 -mr-2 rounded-xl text-zinc-500 hover:text-[#fa5c4f] hover:bg-[#fa5c4f]/10 transition"
                  >
                    {copiedCmd === 'cli-init' ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 bg-[#0e0e11] rounded-2xl p-5 border border-zinc-800 shadow-inner flex flex-col gap-3 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-800/50">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-rose-500/20 border border-rose-500/50" />
                <div className="size-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                <div className="size-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
              </div>
              <span className="text-[10px] text-zinc-500">Terminal</span>
            </div>
            <div>
              <span className="text-[#fa5c4f] font-bold">~</span> <span className="text-zinc-500">npx morphyjs-cli@latest init</span>
            </div>
            <div className="text-zinc-400 pl-4 border-l-2 border-zinc-800 space-y-1">
              <div><span className="text-emerald-400">✔</span> Initializing registry...</div>
              <div><span className="text-emerald-400">✔</span> Installing <span className="text-amber-300">framer-motion</span></div>
              <div><span className="text-emerald-400">✔</span> Created <span className="text-blue-300">@/components/morphy</span></div>
            </div>
            <div className="text-emerald-400 font-bold mt-2">
              Success! Ready to animate.
            </div>
          </div>
        </div>
      </div>

      {/* 2. ARCHITECTURE BENTO: Folder Structure */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="morphy-card rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <FolderTree className="size-4" />
              </span>
              <h2 className="text-xl font-bold font-display text-[var(--text-main)]">Zero Black-Box Dependencies</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              When you initialize, Morphy adds exactly the code you need directly into your project's component directory. You own it, you can modify it, and it won't break on upstream updates.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 font-mono text-xs overflow-x-auto shadow-sm">
          <div className="text-[var(--text-subtle)] space-y-2">
            <div className="flex items-center gap-2 text-[var(--text-main)] font-bold">
              <FolderTree className="size-4 text-[#fa5c4f]" /> your-project/
            </div>
            <div className="pl-6 border-l border-[var(--border-color)] space-y-2">
              <div className="flex items-center gap-2">
                <FolderTree className="size-3.5 text-blue-400" /> app/
              </div>
              <div className="flex items-center gap-2">
                <FolderTree className="size-3.5 text-emerald-400" /> components/
              </div>
              <div className="pl-6 border-l border-[var(--border-color)] space-y-2 relative">
                <div className="absolute top-2 -left-[1px] w-4 border-t border-[var(--border-color)]" />
                <div className="flex flex-col gap-1.5 p-2 rounded-xl bg-[#fa5c4f]/5 border border-[#fa5c4f]/20">
                  <div className="flex items-center gap-2 font-bold text-[var(--text-main)]">
                    <FolderTree className="size-3.5 text-[#fa5c4f]" /> morphy/
                  </div>
                  <div className="pl-5 flex items-center gap-2 text-[11px]">
                    <FileCode2 className="size-3 text-zinc-500" /> index.ts
                  </div>
                  <div className="pl-5 flex items-center gap-2 text-[11px]">
                    <FileCode2 className="size-3 text-zinc-500" /> provider.tsx
                  </div>
                  <div className="pl-5 flex items-center gap-2 text-[11px]">
                    <FileCode2 className="size-3 text-zinc-500" /> page.tsx
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STEP-BY-STEP INTEGRATION TABS */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[var(--text-main)] font-display flex items-center gap-2">
            <LayoutTemplate className="size-5 text-[#fa5c4f]" />
            Framework Integration
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Setup requires just two components: a provider and a page wrapper.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-lg morphy-card">
          <div className="flex items-center gap-2 p-3 border-b border-[var(--border-color)] bg-[var(--bg-card)] overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('app')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'app'
                  ? 'bg-[#fa5c4f] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
              }`}
            >
              Next.js App Router
            </button>
            <button
              onClick={() => setActiveTab('pages')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'pages'
                  ? 'bg-[#fa5c4f] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
              }`}
            >
              Next.js Pages Router
            </button>
            <button
              onClick={() => setActiveTab('vite')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'vite'
                  ? 'bg-[#fa5c4f] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]'
              }`}
            >
              React Router (Vite)
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            
            {/* Step 1: Provider */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center size-6 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] text-xs font-bold font-mono">1</span>
                <h3 className="font-bold text-sm text-[var(--text-main)]">Wrap Your Root Layout</h3>
              </div>
              <div className="pl-9 text-xs text-[var(--text-muted)] leading-relaxed">
                Add <code>&lt;MorphyProvider&gt;</code> to coordinate route changes and manage the dual-frame crossfade.
              </div>
              
              <div className="ml-9 rounded-2xl bg-[#0e0e11] border border-zinc-800 p-4 font-mono text-[11px] sm:text-xs text-zinc-300 overflow-x-auto">
                {activeTab === 'app' && (
                  <pre>
<span className="text-zinc-500">// app/layout.tsx</span>
<br/><span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">MorphyProvider</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><br/><span className="text-purple-400">export default function</span> <span className="text-blue-400">RootLayout</span>({'{'} children {'}'}: {'{'} children: React.ReactNode {'}'}) {'{'}
<br/>  <span className="text-purple-400">return</span> (
<br/>    &lt;<span className="text-rose-400">html</span> <span className="text-amber-300">lang</span>=<span className="text-emerald-300">"en"</span>&gt;
<br/>      &lt;<span className="text-rose-400">body</span>&gt;
<br/>        &lt;<span className="text-amber-300">MorphyProvider</span> <span className="text-amber-300">defaultTransition</span>=<span className="text-emerald-300">"cube"</span>&gt;
<br/>          {'{'}children{'}'}
<br/>        &lt;/<span className="text-amber-300">MorphyProvider</span>&gt;
<br/>      &lt;/<span className="text-rose-400">body</span>&gt;
<br/>    &lt;/<span className="text-rose-400">html</span>&gt;
<br/>  );
<br/>{'}'}
                  </pre>
                )}
                {activeTab === 'pages' && (
                  <pre>
<span className="text-zinc-500">// pages/_app.tsx</span>
<br/><span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">MorphyProvider</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><br/><span className="text-purple-400">export default function</span> <span className="text-blue-400">App</span>({'{'} Component, pageProps, router {'}'}: AppProps) {'{'}
<br/>  <span className="text-purple-400">return</span> (
<br/>    &lt;<span className="text-amber-300">MorphyProvider</span> <span className="text-amber-300">key</span>={'{'}router.pathname{'}'} <span className="text-amber-300">defaultTransition</span>=<span className="text-emerald-300">"cube"</span>&gt;
<br/>      &lt;<span className="text-rose-400">Component</span> {'{'}...pageProps{'}'} /&gt;
<br/>    &lt;/<span className="text-amber-300">MorphyProvider</span>&gt;
<br/>  );
<br/>{'}'}
                  </pre>
                )}
                {activeTab === 'vite' && (
                  <pre>
<span className="text-zinc-500">// src/App.tsx</span>
<br/><span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">MorphyProvider</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">useLocation</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'react-router-dom'</span>;
<br/><br/><span className="text-purple-400">export function</span> <span className="text-blue-400">App</span>() {'{'}
<br/>  <span className="text-purple-400">const</span> location = <span className="text-amber-300">useLocation</span>();
<br/>  <span className="text-purple-400">return</span> (
<br/>    &lt;<span className="text-amber-300">MorphyProvider</span> <span className="text-amber-300">key</span>={'{'}location.pathname{'}'} <span className="text-amber-300">defaultTransition</span>=<span className="text-emerald-300">"cube"</span>&gt;
<br/>      <span className="text-zinc-500">{/* Your Routes */}</span>
<br/>    &lt;/<span className="text-amber-300">MorphyProvider</span>&gt;
<br/>  );
<br/>{'}'}
                  </pre>
                )}
              </div>
            </div>

            {/* Step 2: Page */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center size-6 rounded-full bg-[#fa5c4f]/10 text-[#fa5c4f] text-xs font-bold font-mono">2</span>
                <h3 className="font-bold text-sm text-[var(--text-main)]">Wrap Your Pages</h3>
              </div>
              <div className="pl-9 text-xs text-[var(--text-muted)] leading-relaxed">
                Wrap each route segment in <code>&lt;Page&gt;</code> and optionally override the default transition animation per-route.
              </div>
              
              <div className="ml-9 rounded-2xl bg-[#0e0e11] border border-zinc-800 p-4 font-mono text-[11px] sm:text-xs text-zinc-300 overflow-x-auto">
                <pre>
<span className="text-purple-400">import</span> {'{'} <span className="text-amber-300">Page</span> {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-300">'@/components/morphy'</span>;
<br/><br/><span className="text-purple-400">export default function</span> <span className="text-blue-400">Dashboard</span>() {'{'}
<br/>  <span className="text-purple-400">return</span> (
<br/>    &lt;<span className="text-amber-300">Page</span> <span className="text-amber-300">transition</span>=<span className="text-emerald-300">"circular-portal"</span> <span className="text-amber-300">duration</span>={'{'}0.7{'}'}&gt;
<br/>      &lt;<span className="text-rose-400">h1</span>&gt;Dashboard&lt;/<span className="text-rose-400">h1</span>&gt;
<br/>    &lt;/<span className="text-amber-300">Page</span>&gt;
<br/>  );
<br/>{'}'}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. EXTENDABILITY: CLI ADD */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[var(--text-main)] font-display flex items-center gap-2">
            <PackagePlus className="size-5 text-[#fa5c4f]" />
            Curated Shader Registry
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Pull down specific shaders to your project using the CLI without blowing up your bundle size.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { cmd: 'npx morphy add cube', name: '3D Cube', emoji: '🧊' },
            { cmd: 'npx morphy add circular-portal', name: 'Iris Portal', emoji: '🌀' },
            { cmd: 'npx morphy add origami-unfold', name: 'Origami Fold', emoji: '📜' },
            { cmd: 'npx morphy add ink-spread', name: 'Ink Diffusion', emoji: '🖋️' },
          ].map((item) => (
            <div
              key={item.cmd}
              className="group flex items-center justify-between p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] hover:border-[#fa5c4f]/30 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.emoji}</span>
                <code className="text-xs font-mono font-bold text-[var(--text-main)] group-hover:text-[#fa5c4f] transition">
                  {item.cmd}
                </code>
              </div>
              <button
                onClick={() => copyToClipboard(item.cmd, item.cmd)}
                className="p-2 rounded-xl text-[var(--text-subtle)] hover:text-[#fa5c4f] hover:bg-[#fa5c4f]/10 transition"
              >
                {copiedCmd === item.cmd ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. DYNAMIC SWITCHING BENTO */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-md morphy-card">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                <Settings2 className="size-4" />
              </span>
              <h2 className="text-xl font-bold font-display text-[var(--text-main)]">Dynamic Switching Hooks</h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Build user preferences, presentation modals, or context-aware animations by updating the transition programmatically at runtime using the <code>useMorphy()</code> hook.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0 rounded-2xl bg-[#0e0e11] border border-zinc-800 p-4 font-mono text-[11px] text-zinc-300">
<pre>
<span className="text-purple-400">const</span> {'{'} setTransition {'}'} = <span className="text-amber-300">useMorphy</span>();
<br/><br/><span className="text-purple-400">return</span> (
<br/>  &lt;<span className="text-rose-400">button</span> 
<br/>    <span className="text-amber-300">onClick</span>={'{'}() =&gt; <span className="text-blue-400">setTransition</span>(<span className="text-emerald-300">'cube'</span>){'}'}
<br/>  &gt;
<br/>    Switch to Cube
<br/>  &lt;/<span className="text-rose-400">button</span>&gt;
<br/>);
</pre>
          </div>
        </div>
      </div>

    </div>
  );
}
