'use client';

import React from 'react';
import { Activity, ShieldCheck, Zap, Sliders } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';
import {
  DocHero,
  SectionTwoCol,
  AccordionItem,
  BottomNavCards,
} from '@/components/docs/api-shared';

export function DocsUseAnimationStateView() {
  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO */}
      <DocHero
        badge="React Hook"
        title="useAnimationState()"
        description="A specialized lifecycle hook to track whether a page transition is idle, exiting, entering, or complete in real time."
        importSnippet="import { useAnimationState } from '@/components/glidecn';"
      />

      {/* 2. SIGNATURE & PHASES */}
      <SectionTwoCol
        icon={<Activity className="size-5" />}
        title="Lifecycle States"
        description={
          <p>
            Returns an <code>AnimationState</code> union type that updates as the animation engine progresses through route phases.
          </p>
        }
      >
        <CodeBlock
          badge="Signature"
          code={`const state: 'idle' | 'entering' | 'exiting' | 'complete' = useAnimationState();`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { state: 'idle', desc: 'No animation active; view is stable and interactive.' },
            { state: 'exiting', desc: 'Old view is frozen in DOM and executing exit variants.' },
            { state: 'entering', desc: 'New view has mounted and is animating into position.' },
            { state: 'complete', desc: 'Transition has finished completely.' },
          ].map((item) => (
            <div
              key={item.state}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11] shadow-sm space-y-2"
            >
              <code className="text-sm font-mono font-bold text-[#fa5c4f]">{`"${item.state}"`}</code>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionTwoCol>

      {/* 3. CODE EXAMPLES */}
      <SectionTwoCol
        icon={<Zap className="size-5" />}
        title="Code Examples"
        description={
          <p>
            Practical implementations for navigation guards, interaction locks, and animated status badges.
          </p>
        }
      >
        <div className="space-y-4">
          <AccordionItem
            title="1. Navigation Click Guard"
            description="Prevent accidental double-clicks or form re-submissions while an exit transition is actively playing."
            badge="Interaction Guard"
            code={`import { useAnimationState } from '@/components/glidecn';\n\nexport function TransitionGuard({ children }: { children: React.ReactNode }) {\n  const state = useAnimationState();\n  const isNavigating = state === 'exiting' || state === 'entering';\n\n  return (\n    <div className={isNavigating ? 'pointer-events-none select-none' : ''}>\n      {children}\n    </div>\n  );\n}`}
          />

          <AccordionItem
            title="2. Transition Status Indicator"
            description="Render a live pill badge displaying the active animation phase with pulsing status dots."
            badge="Status Badge"
            code={`import { useAnimationState } from '@/components/glidecn';\n\nexport function StatusIndicator() {\n  const state = useAnimationState();\n\n  const colors = {\n    idle: 'bg-zinc-500',\n    exiting: 'bg-amber-500 animate-pulse',\n    entering: 'bg-blue-500 animate-pulse',\n    complete: 'bg-emerald-500',\n  };\n\n  return (\n    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0f0f11]">\n      <span className={\`size-2 rounded-full \${colors[state]}\`} />\n      <span>{state.toUpperCase()}</span>\n    </div>\n  );\n}`}
          />
        </div>
      </SectionTwoCol>

      {/* 4. BOTTOM NAVIGATION */}
      <BottomNavCards
        prev={{ label: '← useTransitionConfig()', href: '/docs/api/hooks/use-transition-config' }}
        next={{ label: 'TransitionRegistry →', href: '/docs/api/registry' }}
      />
    </div>
  );
}
