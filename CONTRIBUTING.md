# Contributing to GlideCN

Thank you for your interest in contributing. Whether you're fixing a typo, adding a transition, or proposing architecture changes — every contribution matters.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) or npm/yarn
- **Git**

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/MYSELF-SAYAN/glidecn.git
cd glidecn

# Install dependencies
cd frontend
pnpm install

# Start the dev server
pnpm run dev
```

The documentation site runs at `http://localhost:3000`. The playground is at `/playground`.

---

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── docs/               # Documentation pages
│   ├── playground/         # Interactive playground
│   └── layout.tsx          # Root layout with GlideCNProvider
├── components/
│   ├── glidecn/            # ← Core library
│   │   ├── core/           # Provider, registry, animation engine, types
│   │   ├── transitions/    # All 68 transition definitions
│   │   ├── page.tsx        # <Page> component
│   │   └── index.ts        # Public API barrel
│   ├── docs/               # Documentation UI components
│   ├── landing/            # Marketing landing page sections
│   └── playground/         # Playground UI components
├── lib/                    # Shared utilities & transition catalog
└── content/                # MDX documentation content
```

---

## Adding a New Transition

This is the most common contribution. Each transition is a single file that self-registers with the engine.

### 1. Create the transition file

```bash
touch frontend/components/glidecn/transitions/your-transition.tsx
```

### 2. Define the transition

Follow the established pattern:

```tsx
import { registerTransition } from '../core/registry';
import type { TransitionDefinition } from '../core/types';

const definition: TransitionDefinition = {
  metadata: {
    name: 'your-transition',
    displayName: 'Your Transition',
    description: 'A brief description of the effect.',
    category: 'flow',       // flow | portal | paper | mask | spatial | dynamic | experimental | retro
    props: [],
  },

  defaultConfig: {
    duration: 0.5,
    ease: 'easeInOut',
  },

  getVariants: (config) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  }),

  getTransition: (config) => ({
    duration: config.duration,
    ease: config.ease,
  }),
};

registerTransition('your-transition', definition);
```

### 3. Register the import

Add your transition to the barrel file:

```typescript
// components/glidecn/transitions/index.ts
import '@/components/glidecn/transitions/your-transition';
```

### 4. Add catalog metadata

Add an entry to `lib/transition-catalog.ts` so it appears in the docs sidebar, gallery, and showcase pages:

```typescript
{
  slug: 'your-transition',
  displayName: 'Your Transition',
  description: 'One-liner tagline.',
  longDescription: 'Extended description for the documentation page.',
  category: 'flow',
  family: 'Flow',
  emoji: '🎯',
  featured: false,
  metrics: { fps: 60, bundleSize: '~0.5kb', complexity: 'Low' },
  useCases: ['Describe when to use this transition'],
  whySpecial: 'What makes this transition unique.',
  bestFor: ['Tag1', 'Tag2'],
  features: ['GPU-accelerated', 'SSR-safe', 'Reduced-motion aware'],
  status: 'done',
}
```

### 5. Test it

- Visit `/docs/transitions/your-transition` to verify the docs page renders
- Try it in the playground at `/playground`
- Ensure it animates at 60 FPS without layout shift

---

## Code Style

- **TypeScript** — All code must be typed. No `any` unless absolutely unavoidable.
- **Framer Motion** — Transitions use Framer Motion variants. Prefer `transform` and `opacity` properties for GPU compositing.
- **GPU-first** — Animate `transform` and `opacity` only. Avoid animating `width`, `height`, `top`, `left`, or any property that triggers layout recalculation.
- **Self-contained** — Each transition file must be fully independent. No cross-transition imports.
- **Reduced motion** — The engine handles `prefers-reduced-motion` automatically, but ensure your transition degrades gracefully (e.g., falls back to a simple opacity fade).

---

## Pull Request Guidelines

### Before Submitting

1. Run the dev server and verify your changes work
2. Test on both light and dark themes
3. Check that the docs page renders correctly for new transitions
4. Ensure no TypeScript errors

### PR Template

```markdown
## What

Brief description of what this PR does.

## Why

Context on why this change is needed.

## How

Technical approach taken.

## Testing

How you verified this works.
```

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add ripple-wave transition
fix: correct exit animation timing for cube
docs: update API reference for useGlide hook
refactor: simplify animation engine variant builder
```

---

## Reporting Issues

When filing an issue, include:

- **Browser and OS** — e.g., Chrome 125 on macOS 15
- **Steps to reproduce** — Exact sequence of actions
- **Expected vs. actual behavior** — What you expected and what happened
- **Screenshots or recordings** — Especially useful for animation bugs
- **Transition name** — If the issue is specific to a transition

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
