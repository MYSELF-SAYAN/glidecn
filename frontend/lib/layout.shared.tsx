import { GitBranch } from 'lucide-react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared navigation options used by both the home layout and docs layout.
 * Synced with the coral brand palette.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2.5 font-bold">
          <svg viewBox="-6 -6 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
            <rect x="-6" y="-6" width="40" height="40" rx="10" fill="#fa5c4f" />
            <rect x="1" y="1" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.9" />
            <rect x="16" y="1" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.6" />
            <rect x="1" y="16" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.7" />
            <rect x="16" y="16" width="11" height="11" rx="3.5" fill="#ffffff" opacity="0.4" />
          </svg>
          GlideCN
        </span>
      ),
    },
    links: [
      {
        text: 'Overview',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Transitions',
        url: '/docs/transitions/fade',
        active: 'nested-url',
      },
      {
        type: 'icon',
        text: 'Github',
        label: 'Github',
        icon: <GitBranch className="size-5" />,
        url: 'https://github.com/MYSELF-SAYAN/glidecn',
        external: true,
      },
    ],
  };
}
