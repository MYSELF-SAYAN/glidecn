import type { ReactNode } from 'react';
import { DocsShell } from '@/components/docs/docs-shell';
import { Morphy } from '@/components/morphy';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsShell>
      <Morphy>
        {children}
      </Morphy>
    </DocsShell>
  );
}
