import type { ReactNode } from 'react';
import { GlideCN } from '@/components/glidecn';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <GlideCN>{children}</GlideCN>
    </div>
  );
}
