<div align="center">

# ✨ GlideCN

**Cinematic page transitions for React — with zero layout shift.**

*Own your transition code, shadcn/ui style. 68+ GPU-accelerated transitions for Next.js, Vite, and React Router.*

[![MIT License](https://img.shields.io/badge/license-MIT-fa5c4f?style=flat-square)](./LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Framer Motion 12](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![npm version](https://img.shields.io/npm/v/glidecn-cli?color=emerald&style=flat-square&logo=npm)](https://www.npmjs.com/package/glidecn-cli)

<br />

**[🌐 Live Demo](https://glidecn.vercel.app)** &nbsp;•&nbsp;
**[📖 Documentation](https://glidecn.vercel.app/docs)** &nbsp;•&nbsp;
**[⚡ Interactive Playground](https://glidecn.vercel.app/playground/landing)** &nbsp;•&nbsp;
**[🎭 Transitions Catalog](https://glidecn.vercel.app/docs/transitions)** &nbsp;•&nbsp;
**[📦 npm](https://www.npmjs.com/package/glidecn-cli)**

<br />

```bash
# Initialize GlideCN in your project
npx glidecn-cli init

# Add transitions on demand
npx glidecn-cli add cube liquid-morph circular-portal
```

</div>

---

## 📑 Table of Contents

- [Why GlideCN?](#-why-glidecn)
- [Quick Start](#-quick-start)
- [Framework Adapters](#-framework-adapters)
- [Transitions Catalog (68 Presets)](#-transitions-catalog-68-presets)
- [CLI Reference](#-cli-reference)
- [Core API Snapshot](#-core-api-snapshot)
- [Documentation & Links](#-documentation--links)
- [Contributing & License](#-contributing--license)

---

## 💡 Why GlideCN?

Hard route cuts feel abrupt, while naive animation attempts cause white flashes, layout jumps, and broken scroll positions in React and Next.js App Router.

**GlideCN solves this with zero black boxes:**

- **Code Ownership (shadcn style)**: The CLI generates typed, unbundled source code directly into `components/glidecn`. You inspect and customize everything.
- **Freeze-Frame Compositing**: Uses the `FrozenRouter` pattern to hold exiting page trees in place during exit animations without race conditions.
- **Zero Layout Shift (CLS: 0.00)**: All animations run on GPU compositor layers (`transform`, `opacity`, `filter`, `clip-path`) with automated `will-change` hints.
- **Automatic Scroll Restoration**: Remembers window scroll coordinates in `sessionStorage` and restores them on navigation.
- **Accessibility Built-In**: Automatically respects `prefers-reduced-motion` preferences.

---

## 🚀 Quick Start

### 1. Initialize

Run the interactive setup wizard in your project root:

```bash
npx glidecn-cli init
```

*Supports TypeScript (`.tsx`) and JavaScript (`.jsx`), and auto-detects `pnpm`, `npm`, `bun`, or `yarn`.*

### 2. Wrap Your Root Layout

Add the provider and router adapter to your root layout (`app/layout.tsx` for Next.js App Router):

```tsx
// app/layout.tsx
import { GlideCNProvider, GlideCN } from '@/components/glidecn';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
```

### 3. Wrap Pages with `<Page>`

Wrap any route segment and optionally override the transition:

```tsx
// app/about/page.tsx
import { Page } from '@/components/glidecn';

export default function AboutPage() {
  return (
    <Page transition="circular-portal" duration={0.6}>
      <main>
        <h1>About Us</h1>
        <p>Cinematic transitions with zero layout shift.</p>
      </main>
    </Page>
  );
}
```

---

## 🔌 Framework Adapters

GlideCN includes drop-in adapters for all major React routing architectures:

| Framework / Router | Adapter Component | Setup Target | Docs |
|:---|:---|:---|:---:|
| **Next.js 15 (App Router)** | `<GlideCN>` *(alias for `<GlideCNNextApp>`)* | `app/layout.tsx` | [Guide →](https://glidecn.vercel.app/docs/installation) |
| **Next.js (Pages Router)** | `<GlideCNNextPages routerPath={router.asPath}>` | `pages/_app.tsx` | [Guide →](https://glidecn.vercel.app/docs/installation) |
| **React Router / Vite** | `<GlideCNReactRouter locationKey={location.pathname}>` | `src/App.tsx` | [Guide →](https://glidecn.vercel.app/docs/installation) |
| **TanStack / Universal** | `<GlideCNUniversal routeKey={pathname}>` | Root router component | [Guide →](https://glidecn.vercel.app/docs/installation) |

---

## 🎭 Transitions Catalog (68 Presets)

68 GPU-accelerated transitions organized into 8 families:

| Family | Count | Highlights |
|:---|:---:|:---|
| **🌊 Flow** | 5 | `fade`, `slide`, `scale`, `wave`, `lens-flare` |
| **🌀 Portal** | 3 | `circular-portal`, `shutter-iris`, `wormhole` |
| **📄 Paper** | 3 | `page-curl`, `origami-unfold`, `origami-crush` |
| **🎭 Mask** | 2 | `ink-spread`, `paint-drip` |
| **🧊 Spatial (3D)** | 3 | `cube`, `flip`, `fold` |
| **⚡ Dynamic** | 2 | `blueprint`, `slash` |
| **👾 Retro** | 2 | `pixel`, `tv-turn-off` |
| **🧪 Experimental** | 49 | `liquid-morph`, `crystal`, `glitch`, `dimension`, `blackhole`, `galaxy`, `reality`, `lightning`, `ice`, `fire`, `kaleidoscope`, `prism`, `ripple`, `neon`, etc. |

> 🎨 **[Test all 68 transitions live in the Interactive Playground →](https://glidecn.vercel.app/playground/landing)**

---

## 🛠 CLI Reference

```bash
# Add specific transitions
npx glidecn-cli add cube liquid-morph circular-portal

# Add an entire category (flow, portal, paper, mask, spatial, dynamic, retro, experimental)
npx glidecn-cli add --category spatial

# Install all 68 transitions
npx glidecn-cli add --all

# List all available transitions in terminal
npx glidecn-cli list
```

---

## 📖 Core API Snapshot

### `<GlideCNProvider>`
Root context provider setting the global fallback transition, default config, and motion settings:
```tsx
<GlideCNProvider defaultTransition="slide" defaultConfig={{ duration: 0.5 }}>
  {children}
</GlideCNProvider>
```

### `<Page>`
Route-level wrapper accepting per-page overrides:
```tsx
<Page transition="cube" duration={0.6} direction="right">
  <YourContent />
</Page>
```

### `useGlide()`
Dynamic runtime controller hook:
```tsx
const { currentTransition, setTransition, config, setConfig, animationState } = useGlide();
```

> 📚 **[View the complete API Reference, Hook Recipes & Types →](https://glidecn.vercel.app/docs/api-reference)**

---

## 🌐 Documentation & Links

- **Documentation Hub**: [glidecn.vercel.app/docs](https://glidecn.vercel.app/docs)
- **Interactive Playground**: [glidecn.vercel.app/playground/landing](https://glidecn.vercel.app/playground/landing)
- **Transitions Showcase**: [glidecn.vercel.app/docs/transitions](https://glidecn.vercel.app/docs/transitions)
- **Full API Reference**: [glidecn.vercel.app/docs/api-reference](https://glidecn.vercel.app/docs/api-reference)
- **CLI on npm**: [npmjs.com/package/glidecn-cli](https://www.npmjs.com/package/glidecn-cli)

---

## 🤝 Contributing & License

Contributions are welcome! Please check out the [Contributing Guide](./CONTRIBUTING.md) to get started with authoring new transitions or submitting improvements.

Licensed under the [MIT License](./LICENSE) © GlideCN Contributors.
