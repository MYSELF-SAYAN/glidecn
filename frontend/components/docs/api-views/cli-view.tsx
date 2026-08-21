'use client';

import React, { useState } from 'react';
import {
  Terminal,
  PackagePlus,
  ListFilter,
  RefreshCw,
  Play,
  Check,
  Copy,
  FolderTree,
  Sliders,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Box,
  FileCode,
  CheckCircle2,
} from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import {
  SectionTwoCol,
  BottomNavCards,
  PropsCard,
  type PropItem,
} from '@/components/docs/api-shared';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { motion } from 'framer-motion';

type PackageManager = 'pnpm' | 'npm' | 'bun' | 'yarn';

const CLI_FLAGS: PropItem[] = [
  {
    name: '--all, -a',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Installs or updates all 70 page and physics transitions in the catalog in a single batch.',
  },
  {
    name: '--yes, -y',
    type: 'boolean',
    defaultVal: 'false',
    description: 'Skips interactive confirmation prompts (ideal for CI/CD and automated upgrade scripts).',
  },
  {
    name: '--category, -c <name>',
    type: 'string',
    description: 'Installs all transitions belonging to a specific family: flow, portal, paper, mask, spatial, dynamic, experimental, retro.',
  },
  {
    name: '--path, -p <dir>',
    type: 'string',
    defaultVal: 'components/glidecn',
    description: 'Specifies a custom destination directory for the generated components and transitions (ideal for monorepos).',
  },
  {
    name: '--help, -h',
    type: 'boolean',
    description: 'Displays help information, usage instructions, and available flags for any command.',
  },
  {
    name: '--version, -V',
    type: 'boolean',
    description: 'Prints the current installed version of the glidecn-cli package.',
  },
];

function CliTerminalBlock({
  command,
  badge = 'Terminal Command',
  comment,
}: {
  command: (pm: PackageManager) => string;
  badge?: string;
  comment?: string;
}) {
  const [pm, setPm] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);

  const rawCmd = command(pm);

  const handleCopy = () => {
    copyToClipboard(rawCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#0a0a0c] shadow-xl overflow-hidden group">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-950">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 shrink-0">
            <div className="size-2.5 rounded-full bg-[#ff5f56]" />
            <div className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="size-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] font-mono text-zinc-400 ml-2">{badge}</span>
        </div>

        {/* Package Manager Selector */}
        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
          {(['pnpm', 'npm', 'bun', 'yarn'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setPm(item)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                pm === item
                  ? 'bg-zinc-800 text-[#fa5c4f] font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
        <div className="space-y-1 font-mono text-xs sm:text-sm text-zinc-100 overflow-x-auto py-0.5">
          {comment && (
            <div className="text-zinc-500 text-[11px] select-none">{`# ${comment}`}</div>
          )}
          <div className="whitespace-pre flex items-center gap-2">
            <span className="text-[#fa5c4f] font-bold select-none">$</span>
            <span>{rawCmd}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors shrink-0 cursor-pointer mt-0.5"
          title="Copy command"
        >
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  );
}

export function DocsCliView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO HEADER */}
      <section className="relative pt-12 md:pt-20 w-full space-y-8">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/50">
              <Terminal className="size-3 text-[#fa5c4f]" /> CLI Tooling
            </span>
            <span className="text-xs font-mono text-zinc-500">v1.0.0 • Scaffolding Engine</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] font-display font-medium tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[1.05]">
            CLI Reference.
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            The official <code>glidecn-cli</code> scaffolds transition pipelines, downloads transition recipes, and auto-wires Framer Motion into your project with zero runtime dependencies.
          </p>
        </div>

        {/* Global Quickstart Terminal */}
        <div className="w-full max-w-4xl">
          <CliTerminalBlock
            badge="Initialization Quickstart"
            comment="Initialize GlideCN in your project directory"
            command={(pm) => {
              if (pm === 'pnpm') return 'pnpm dlx glidecn-cli init';
              if (pm === 'bun') return 'bunx glidecn-cli init';
              if (pm === 'yarn') return 'yarn dlx glidecn-cli init';
              return 'npx glidecn-cli init';
            }}
          />
        </div>
      </section>

      {/* 2. INIT COMMAND WIZARD */}
      <SectionTwoCol
        icon={<Terminal className="size-5" />}
        title="1. Project Initialization (init)"
        description={
          <div className="space-y-4">
            <p>
              <code>glidecn-cli init</code> executes an interactive setup wizard that detects your framework, installs peer dependencies (<code>framer-motion</code>, <code>lucide-react</code>), and creates the core motion barrel.
            </p>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/5 text-xs text-zinc-500 space-y-2">
              <span className="font-bold text-zinc-700 dark:text-zinc-300 block">Interactive Prompts:</span>
              <ul className="list-disc list-inside space-y-1">
                <li>TypeScript or JavaScript</li>
                <li>Framework Adapter (Next.js App / Next.js Pages / React Router)</li>
                <li>Target directory (default: <code>components/glidecn</code>)</li>
                <li>Default baseline transition (<code>fade</code>)</li>
              </ul>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <CliTerminalBlock
            badge="Interactive Setup Wizard"
            command={(pm) => {
              if (pm === 'pnpm') return 'pnpm dlx glidecn-cli init';
              if (pm === 'bun') return 'bunx glidecn-cli init';
              if (pm === 'yarn') return 'yarn dlx glidecn-cli init';
              return 'npx glidecn-cli init';
            }}
          />

          <div className="p-6 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#fa5c4f]">
              <FolderTree className="size-4" />
              <span>Generated Project Structure</span>
            </div>
            <pre className="p-4 rounded-2xl bg-zinc-50 dark:bg-black/50 border border-zinc-200/50 dark:border-white/5 text-xs font-mono text-zinc-700 dark:text-zinc-300 leading-relaxed overflow-x-auto">
{`components/
└── glidecn/
    ├── index.ts                 # Barrel exports (GlideCN, Page, useGlide)
    ├── provider.tsx             # <GlideCNProvider>
    ├── adapters/
    │   └── next-app.tsx         # <GlideCN> Adapter
    ├── core/
    │   ├── animation-engine.ts  # Variant builders & GPU hints
    │   ├── registry.ts          # TransitionRegistry
    │   ├── types.ts             # Strict TypeScript types
    │   └── utils.ts             # Easing & Math utilities
    └── transitions/
        └── fade.ts              # Default baseline transition`}
            </pre>
          </div>
        </div>
      </SectionTwoCol>

      {/* 3. ADD COMMAND (OPEN CARDS, NO COLLAPSED TOGGLES) */}
      <SectionTwoCol
        icon={<PackagePlus className="size-5" />}
        title="2. Installing Transitions (add)"
        description={
          <div className="space-y-3">
            <p>
              <code>glidecn-cli add</code> downloads individual transitions, batches, or entire family categories directly into <code>components/glidecn/transitions</code> and auto-updates the barrel registry.
            </p>
            <p className="text-xs text-zinc-500">
              All commands below support <code>pnpm</code>, <code>npm</code>, <code>bun</code>, and <code>yarn</code>.
            </p>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Card A: Single Transition */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                Single Transition Installation
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5">
                Single Transition
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Install a specific transition by its name.
            </p>
            <CliTerminalBlock
              badge="Single Transition"
              command={(pm) => {
                const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
                return `${runner} glidecn-cli add circular-portal`;
              }}
            />
          </div>

          {/* Card B: Multi-Transition Batch */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                Multi-Transition Batch Installation
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5">
                Multi-Transition
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Install multiple transitions simultaneously separated by a space.
            </p>
            <CliTerminalBlock
              badge="Batch Install"
              command={(pm) => {
                const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
                return `${runner} glidecn-cli add cube liquid-morph glitch page-curl slice-reveal`;
              }}
            />
          </div>

          {/* Card C: Category Bundle */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                Category Bundle Installation (--category)
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5">
                Family Category
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Install all transitions belonging to a specific family (e.g. <code>spatial</code>, <code>portal</code>, <code>flow</code>).
            </p>
            <CliTerminalBlock
              badge="Category Flag"
              command={(pm) => {
                const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
                return `${runner} glidecn-cli add --category spatial`;
              }}
            />
          </div>

          {/* Card D: Complete 70 Suite */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                Complete Catalog Installation (--all)
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#fa5c4f]/10 text-[#fa5c4f] border border-[#fa5c4f]/20">
                All 70 Transitions
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Installs the entire transition suite into your project in one shot.
            </p>
            <CliTerminalBlock
              badge="Full Suite"
              command={(pm) => {
                const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
                return `${runner} glidecn-cli add --all`;
              }}
            />
          </div>
        </div>
      </SectionTwoCol>

      {/* 3. UPDATE COMMAND */}
      <SectionTwoCol
        icon={<RefreshCw className="size-5" />}
        title="3. Updating Existing Codebase (update)"
        description={
          <div className="space-y-4">
            <p>
              <code>glidecn-cli update</code> auto-detects your existing installation, checks your project language and framework adapter, and refreshes all core engine files, adapters, and installed transitions with the latest improvements and bugfixes.
            </p>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/5 text-xs text-zinc-500 space-y-2">
              <span className="font-bold text-zinc-700 dark:text-zinc-300 block">What gets updated:</span>
              <ul className="list-disc list-inside space-y-1">
                <li>Core engine (<code>transition-manager</code>, <code>transition-context</code>, etc.)</li>
                <li>Framework adapters (<code>adapters/next-app</code>, etc.)</li>
                <li>All currently installed transitions (or all 70 with <code>--all</code>)</li>
                <li>Barrel exports (<code>index.ts</code> / <code>index.js</code>)</li>
              </ul>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Interactive Update */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                Interactive Project Update
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5">
                Interactive
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Refreshes your core engine and existing transitions with interactive confirmation.
            </p>
            <CliTerminalBlock
              badge="Update Command"
              command={(pm) => {
                const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
                return `${runner} glidecn-cli update`;
              }}
            />
          </div>

          {/* Update + All Transitions */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                Update & Upgrade to All 70 Transitions
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#fa5c4f]/10 text-[#fa5c4f] border border-[#fa5c4f]/20">
                --all Flag
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Refreshes the core and installs the full suite of all 70 transitions.
            </p>
            <CliTerminalBlock
              badge="Full Upgrade"
              command={(pm) => {
                const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
                return `${runner} glidecn-cli update --all`;
              }}
            />
          </div>

          {/* Non-interactive CI update */}
          <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-zinc-900 dark:text-zinc-100">
                Automated / CI Update (--yes)
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-white/5">
                CI / Headless
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Skips prompts for automated upgrade scripts and GitHub Actions workflows.
            </p>
            <CliTerminalBlock
              badge="Non-interactive"
              command={(pm) => {
                const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
                return `${runner} glidecn-cli update --yes`;
              }}
            />
          </div>
        </div>
      </SectionTwoCol>

      {/* 4. LIST COMMAND */}
      <SectionTwoCol
        icon={<ListFilter className="size-5" />}
        title="4. Catalog Explorer (list)"
        description={
          <p>
            <code>glidecn-cli list</code> inspects available transitions, prints family statistics, and prints terminal snippets.
          </p>
        }
      >
        <div className="space-y-6">
          <CliTerminalBlock
            badge="Browse Catalog"
            comment="Print the full transition catalog"
            command={(pm) => {
              const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
              return `${runner} glidecn-cli list`;
            }}
          />
        </div>
      </SectionTwoCol>

      {/* 5. COMPLETE FLAGS MATRIX */}
      <SectionTwoCol
        icon={<Sliders className="size-5" />}
        title="5. Flags & Options Reference"
        description={
          <p>
            Complete matrix of all command-line flags and arguments supported by <code>glidecn-cli</code>.
          </p>
        }
      >
        <PropsCard title="glidecn-cli Command Flags" props={CLI_FLAGS} />
      </SectionTwoCol>

      {/* 6. MONOREPOS & PATH CONFIGURATION */}
      <SectionTwoCol
        icon={<Box className="size-5" />}
        title="6. Monorepos & Custom Paths"
        description={
          <div className="space-y-3">
            <p>
              Use the <code>--path</code> option to direct files into a shared UI package in Turborepo, Nx, or pnpm workspaces.
            </p>
            <p className="text-xs text-zinc-500">
              The CLI creates the target directory if it doesn&apos;t exist.
            </p>
          </div>
        }
      >
        <CliTerminalBlock
          badge="Shared Monorepo Installation"
          comment="Scaffold inside shared packages/ui directory"
          command={(pm) => {
            const runner = pm === 'pnpm' ? 'pnpm dlx' : pm === 'bun' ? 'bunx' : pm === 'yarn' ? 'yarn dlx' : 'npx';
            return `${runner} glidecn-cli init --path packages/ui/src/components/glidecn`;
          }}
        />
      </SectionTwoCol>

      {/* 7. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← Quickstart / Install', href: '/docs/installation' }}
        next={{ label: 'API Reference Hub →', href: '/docs/api-reference' }}
      />
    </div>
  );
}
