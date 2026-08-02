'use client';

/* ==========================================================================
 * Props Table — Auto-generated props documentation
 * ========================================================================== */

import type { TransitionPropSchema } from '@/components/morphy/core/types';

interface PropsTableProps {
  props: TransitionPropSchema[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-fd-border">
            <th className="pb-3 text-left font-semibold text-fd-foreground">Prop</th>
            <th className="pb-3 text-left font-semibold text-fd-foreground">Type</th>
            <th className="pb-3 text-left font-semibold text-fd-foreground">Default</th>
            <th className="pb-3 text-left font-semibold text-fd-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-fd-border/50 last:border-0"
            >
              <td className="py-3 pr-4">
                <code className="rounded-md bg-fd-muted px-1.5 py-0.5 text-xs font-mono text-brand-500">
                  {prop.name}
                </code>
              </td>
              <td className="py-3 pr-4">
                <code className="text-xs font-mono text-fd-muted-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="py-3 pr-4">
                <code className="text-xs font-mono text-fd-muted-foreground">
                  {prop.default ?? '—'}
                </code>
              </td>
              <td className="py-3 text-fd-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
