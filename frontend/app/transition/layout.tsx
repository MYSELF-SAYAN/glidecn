import type { ReactNode } from 'react';
import { DocsShell } from '@/components/docs/docs-shell';
import { GlideCN } from '@/components/glidecn';

export default function TransitionLayout({ children }: { children: ReactNode }) {
  return (
    <DocsShell>
      <GlideCN>
        {children}
      </GlideCN>
    </DocsShell>
  );
}
