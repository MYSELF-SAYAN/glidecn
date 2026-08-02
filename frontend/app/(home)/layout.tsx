import type { ReactNode } from 'react';
import { Morphy } from '@/components/morphy';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Morphy>{children}</Morphy>
    </div>
  );
}
