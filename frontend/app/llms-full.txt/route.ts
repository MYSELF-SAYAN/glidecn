import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function stripMdxImports(content: string): string {
  return content
    // Remove import lines
    .replace(/^import\s+.*$/gm, '')
    // Remove JSX component usage like <Cards>, <Card>, <Steps>, <Step>, <Tabs>, <Tab>, <Callout>, <TransitionCount />
    .replace(/<(Cards|Card|Steps|Step|Tabs|Tab|Callout|TransitionCount)\s*[^>]*\/?>/g, '')
    .replace(/<\/(Cards|Card|Steps|Step|Tabs|Tab|Callout)>/g, '')
    // Remove YAML frontmatter
    .replace(/^---[\s\S]*?---\n*/m, '')
    // Collapse multiple blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function GET() {
  const docsDir = path.join(process.cwd(), 'content', 'docs');

  const docFiles = [
    { file: 'index.mdx', title: 'Overview & Architecture' },
    { file: 'installation.mdx', title: 'Installation & Quickstart' },
    { file: 'api-reference.mdx', title: 'API Reference' },
    { file: 'cli.mdx', title: 'CLI Reference' },
  ];

  const sections: string[] = [];

  sections.push('# GlideCN — Complete Documentation\n');
  sections.push(
    '> This file contains the full text of all GlideCN documentation, aggregated for AI agents and LLMs.\n'
  );
  sections.push(
    '> Source: https://glidecn.vercel.app | GitHub: https://github.com/MYSELF-SAYAN/glidecn\n'
  );

  for (const doc of docFiles) {
    const filePath = path.join(docsDir, doc.file);
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const cleaned = stripMdxImports(raw);
      sections.push(`\n---\n\n## ${doc.title}\n\n${cleaned}`);
    } catch {
      // Skip missing files silently
    }
  }

  // Add transition families summary
  sections.push(`\n---\n\n## Transitions Catalog (68 Presets)\n`);
  sections.push(`
GlideCN ships 68 GPU-accelerated transitions organized into 8 families:

### Flow (5 transitions)
fade, slide, scale, wave, lens-flare

### Portal (3 transitions)
circular-portal, shutter-iris, wormhole

### Paper (3 transitions)
page-curl, origami-unfold, origami-crush

### Mask (2 transitions)
ink-spread, paint-drip

### Spatial / 3D (3 transitions)
cube, flip, fold

### Dynamic (2 transitions)
blueprint, slash

### Retro (2 transitions)
pixel, tv-turn-off

### Experimental (49 transitions)
liquid-morph, crystal, glitch, dimension, blackhole, galaxy, reality, lightning, ice, fire, kaleidoscope, prism, ripple, neon, gravity, and more.

All transitions run exclusively on GPU compositor properties (transform, opacity, clip-path, filter) for 60fps performance with zero layout shift (CLS: 0.00).
`);

  // Add quick reference
  sections.push(`\n---\n\n## Quick Reference\n`);
  sections.push(`
### Install
\`\`\`bash
npx glidecn-cli init
npx glidecn-cli add cube circular-portal liquid-morph
npx glidecn-cli add --all
\`\`\`

### Root Layout Setup (Next.js App Router)
\`\`\`tsx
import { GlideCNProvider, GlideCN } from '@/components/glidecn';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlideCNProvider defaultTransition="slide">
          <GlideCN>{children}</GlideCN>
        </GlideCNProvider>
      </body>
    </html>
  );
}
\`\`\`

### Per-Page Transition
\`\`\`tsx
import { Page } from '@/components/glidecn';

export default function AboutPage() {
  return (
    <Page transition="circular-portal" duration={0.6}>
      <main><h1>About</h1></main>
    </Page>
  );
}
\`\`\`

### Runtime Switching
\`\`\`tsx
const { currentTransition, setTransition, config, setConfig, animationState } = useGlide();
\`\`\`

### Framework Adapters
- Next.js App Router: <GlideCN>
- Next.js Pages Router: <GlideCNNextPages routerPath={router.asPath}>
- React Router / Vite: <GlideCNReactRouter locationKey={location.pathname}>
- TanStack / Universal: <GlideCNUniversal routeKey={pathname}>
`);

  const fullText = sections.join('\n');

  return new NextResponse(fullText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
