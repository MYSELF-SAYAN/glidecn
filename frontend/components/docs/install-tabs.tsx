'use client';

/* ==========================================================================
 * Install Tabs — Package manager install commands
 * ========================================================================== */

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface InstallTabsProps {
  packages?: string;
}

const MANAGERS = [
  { name: 'pnpm', cmd: 'pnpm add' },
  { name: 'npm', cmd: 'npm install' },
  { name: 'yarn', cmd: 'yarn add' },
  { name: 'bun', cmd: 'bun add' },
] as const;

export function InstallTabs({ packages = 'glidecn' }: InstallTabsProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const command = `${MANAGERS[active].cmd} ${packages}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose my-6">
      {/* Tabs */}
      <div className="flex gap-1 rounded-t-xl border border-b-0 border-fd-border bg-fd-muted/50 p-1">
        {MANAGERS.map((pm, i) => (
          <button
            key={pm.name}
            onClick={() => setActive(i)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              active === i
                ? 'bg-fd-background text-fd-foreground shadow-sm'
                : 'text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            {pm.name}
          </button>
        ))}
      </div>

      {/* Code area */}
      <div className="group relative rounded-b-xl border border-fd-border bg-fd-card p-4">
        <code className="font-mono text-sm text-fd-foreground">{command}</code>
        <button
          onClick={handleCopy}
          className="copy-button absolute right-3 top-3 rounded-lg border border-fd-border bg-fd-background p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Copy command"
        >
          {copied ? (
            <Check className="size-4 text-emerald-500" />
          ) : (
            <Copy className="size-4 text-fd-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
