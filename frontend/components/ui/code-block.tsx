import React from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

interface CodeBlockProps {
  code: string;
  language?: string;
  badge?: string;
  isTabbed?: boolean;
  className?: string;
}

export function CodeBlock({ code, language = 'tsx', badge, isTabbed = false, className }: CodeBlockProps) {
  const inner = (
    <>
      {badge && (
        <div className={`px-5 py-3 border-b border-zinc-200/80 dark:border-white/5 text-[11px] font-mono tracking-wide flex items-center ${isTabbed ? 'bg-[#FAFAFA]/50 dark:bg-transparent' : 'bg-zinc-50 dark:bg-white/[0.02]'} text-zinc-500`}>
          <span className="opacity-80">{badge}</span>
        </div>
      )}
      <DynamicCodeBlock lang={language} code={code} />
    </>
  );

  if (isTabbed) return inner;

  return (
    <div className={`relative w-full overflow-hidden border border-zinc-200/80 dark:border-white/10 shadow-sm bg-white dark:bg-[#0f0f11] rounded-2xl ${className || ''}`}>
      {inner}
    </div>
  );
}
