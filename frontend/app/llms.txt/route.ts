import { NextResponse } from 'next/server';

const LLMS_TXT = `# GlideCN

> Cinematic page transitions for React & Next.js. 68+ GPU-accelerated transitions with zero layout shift, shadcn/ui style code ownership. Add route animations in seconds.

## Documentation
- [Overview & Architecture](https://glidecn.vercel.app/docs): Core concepts — FrozenRouter, dual-frame rendering, pluggable transition registry
- [Installation & Quickstart](https://glidecn.vercel.app/docs/installation): Add GlideCN to Next.js or React in under 2 minutes
- [API Reference](https://glidecn.vercel.app/docs/api-reference): Components (GlideCNProvider, GlideCN, Page), hooks (useGlide, useTransitionConfig, useAnimationState), registry, types
- [CLI Reference](https://glidecn.vercel.app/docs/cli): glidecn-cli init, add, list, update commands

## Transitions
- [Transitions Catalog](https://glidecn.vercel.app/transition): All 68 transitions organized by family — Flow, Portal, Paper, Mask, Spatial, Dynamic, Retro, Experimental
- [Interactive Playground](https://glidecn.vercel.app/playground/landing): Live preview and comparison of every transition

## Key Concepts
- **Zero Layout Shift (CLS 0.00)**: All animations run on GPU compositor layers (transform, opacity, filter, clip-path)
- **Freeze-Frame Compositing**: FrozenRouter holds exiting page trees in place during exit animations
- **Code Ownership**: CLI generates typed source code into components/glidecn — no monolithic bundle
- **Framework Adapters**: Next.js App Router, Next.js Pages Router, React Router/Vite, TanStack/Universal
- **Accessibility**: Automatically respects prefers-reduced-motion

## Installation
\`\`\`bash
npx glidecn-cli init          # Initialize in your project
npx glidecn-cli add cube      # Add specific transitions
npx glidecn-cli add --all     # Install all 68 transitions
\`\`\`

## Source
- [GitHub Repository](https://github.com/MYSELF-SAYAN/glidecn): Full source code, MIT licensed
- [npm Package](https://www.npmjs.com/package/glidecn-cli): CLI tool on npm
- [Full Documentation](https://glidecn.vercel.app/llms-full.txt): Complete docs aggregated for AI agents

## Optional
- [Contributing Guide](https://glidecn.vercel.app/contributing): How to author and submit new transitions
`;

export async function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
