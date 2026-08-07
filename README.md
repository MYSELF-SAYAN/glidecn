<div align="center">

# GlideCN

**Cinematic page transitions for React.**

68 GPU-accelerated transitions. One `<Page>` component. Zero layout shift.

[![MIT License](https://img.shields.io/badge/license-MIT-fa5c4f?style=flat-square)](./LICENSE)
[![Built with Next.js](https://img.shields.io/badge/built%20with-Next.js%2015-000?style=flat-square&logo=next.js)](https://nextjs.org)
[![Framer Motion](https://img.shields.io/badge/powered%20by-Framer%20Motion-0055FF?style=flat-square)](https://www.framer.com/motion/)

[Live Demo](https://glidecn.vercel.app) · [Documentation](https://glidecn.vercel.app/docs) · [Playground](https://glidecn.vercel.app/playground)

</div>

---

## The Problem

Page transitions in React apps are either non-existent (hard cuts between routes) or require hundreds of lines of boilerplate to orchestrate entry, exit, and freeze-frame logic. Most solutions break scroll position, cause layout shift, or fight with the App Router.

## The Solution

GlideCN gives you production-ready page transitions with two components and one hook. Wrap your layout in `<GlideCNProvider>`, wrap your pages in `<Page>`, and choose from 68 transitions — from subtle fades to cinematic portals.

```tsx
// app/layout.tsx
import { GlideCNProvider } from '@/components/glidecn';

export default function RootLayout({ children }) {
  return (
    <GlideCNProvider defaultTransition="slide">
      {children}
    </GlideCNProvider>
  );
}

// app/about/page.tsx
import { Page } from '@/components/glidecn';

export default function AboutPage() {
  return (
    <Page transition="circular-portal">
      <h1>About Us</h1>
    </Page>
  );
}
```

That's it. The engine handles exit freezing, enter orchestration, and GPU compositing automatically.

---

## Transitions

68 transitions across 10 families, each GPU-accelerated at 60 FPS:

| Family | Transitions | Examples |
|--------|------------|----------|
| **Flow** | Directional movement | `slide`, `swipe`, `bounce` |
| **Basic** | Foundational effects | `fade`, `scale`, `dissolve`, `zoom` |
| **Portal** | Dramatic reveals | `circular-portal`, `wormhole`, `blackhole` |
| **Paper** | Physical paper | `page-curl`, `fold`, `origami-unfold` |
| **Mask** | Shape-based reveals | `ink-spread`, `shutter-iris`, `slash` |
| **Spatial** | 3D transforms | `cube`, `flip`, `prism` |
| **Kinetic** | Physics-driven | `wobble`, `stretch`, `squeeze`, `ripple` |
| **Dynamic** | Material effects | `liquid-morph`, `glass`, `neon`, `glitch` |
| **Retro** | Nostalgic effects | `tv-turn-off`, `pixel`, `vortex` |
| **Experimental** | Elemental & cosmic | `fire`, `ice`, `galaxy`, `lightning` |

[Browse all transitions →](https://glidecn.vercel.app/docs/transitions)

---

## Features

- **68 transitions** — From subtle to cinematic, each one GPU-accelerated
- **Two-component API** — `<GlideCNProvider>` + `<Page>`. No boilerplate
- **Runtime control** — Change transitions programmatically via the `useGlide` hook
- **Pluggable architecture** — Register custom transitions with `registerTransition()`
- **Reduced motion aware** — Automatically respects `prefers-reduced-motion`
- **SSR-safe** — Works with Next.js App Router and static generation
- **Zero layout shift** — Freeze-frame compositing prevents content jump
- **Type-safe** — Full TypeScript definitions for every transition and config

---

## Quick Start

### 1. Install

```bash
npx glidecn-cli add fade slide circular-portal
```

### 2. Add the Provider

Wrap your root layout:

```tsx
import { GlideCNProvider } from '@/components/glidecn';

export default function RootLayout({ children }) {
  return (
    <GlideCNProvider defaultTransition="fade">
      {children}
    </GlideCNProvider>
  );
}
```

### 3. Use on Any Page

Override the default per-route:

```tsx
import { Page } from '@/components/glidecn';

export default function ContactPage() {
  return (
    <Page transition="cube" duration={0.8}>
      <main>Contact content here</main>
    </Page>
  );
}
```

### 4. Control at Runtime

```tsx
import { useGlide } from '@/components/glidecn';

function CheckoutButton() {
  const { setTransition } = useGlide();
  const router = useRouter();

  return (
    <button onClick={() => {
      setTransition('circular-portal');
      router.push('/success');
    }}>
      Complete Purchase
    </button>
  );
}
```

---

## Architecture

```
components/glidecn/
├── core/
│   ├── provider.tsx        # GlideCNProvider — context + orchestration
│   ├── registry.ts         # Transition registry (name → definition)
│   ├── animation-engine.ts # Variant builder + transition resolver
│   ├── types.ts            # Full TypeScript definitions
│   └── utils.ts            # Config merging utilities
├── transitions/
│   ├── fade.tsx             # Each transition is a self-registering module
│   ├── slide.tsx
│   ├── circular-portal.tsx
│   └── ...                  # 68 total
├── page.tsx                 # <Page> component
├── constants.ts             # Default configs
└── index.ts                 # Public API barrel
```

Each transition is a standalone file that calls `registerTransition()` on import. No central switch statement, no configuration file to maintain. Add a file, import it, done.

---

## API Reference

### `<GlideCNProvider>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultTransition` | `string` | `"fade"` | Fallback transition for pages without an override |
| `defaultConfig` | `TransitionConfig` | `{}` | Global config (duration, easing, direction) |
| `reducedMotion` | `boolean` | auto | Force reduced motion on/off |

### `<Page>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `transition` | `string` | inherited | Override the provider's default |
| `duration` | `number` | `0.5` | Animation duration in seconds |
| `direction` | `"left" \| "right" \| "up" \| "down"` | — | For directional transitions |
| `ease` | `EasingPreset` | `"easeInOut"` | Easing function or cubic-bezier tuple |

### `useGlide()`

```tsx
const { currentTransition, config, setTransition, setConfig } = useGlide();
```

Returns the current state and setters for runtime transition control.

---

## Contributing

We welcome contributions of all kinds — new transitions, bug fixes, documentation, or ideas.

Read the [Contributing Guide](./CONTRIBUTING.md) to get started.

---

## License

[MIT](./LICENSE) © GlideCN Contributors
