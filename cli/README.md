# Morphy CLI (`morphy`)

✨ **Drop-in page transitions for React** — shadcn-style component distribution.

`morphy` is the official CLI to scaffold Morphy page transitions directly into your codebase. You own the code; no black-box dependencies.

---

## 🚀 Quick Start

### 1. Initialize Morphy in your project
Works with **npm**, **pnpm**, **yarn**, and **bun**:

```bash
# npm
npx morphy init

# pnpm
pnpm dlx morphy init

# yarn
yarn dlx morphy init

# bun
bunx morphy init
```

The interactive wizard will:
1. Ask you to choose your framework adapter:
   - **Next.js App Router** (`app/` directory with `FrozenRouter`)
   - **Next.js Pages Router** (`pages/_app.tsx`)
   - **React Router / Vite** (`react-router-dom`)
   - **TanStack / Universal** (framework-agnostic)
2. Ask where to place components (e.g. `components/morphy` or `src/components/morphy`)
3. Let you pick which transitions to install (or select all 33 transitions)
4. Check if required dependencies (`react`, `react-dom`, `framer-motion`) are installed and offer to install missing ones
5. Scaffold the components and generate barrel exports (`index.ts`) with helpful quickstart instructions

---

## 📦 Commands

### `morphy init`
Run the full setup wizard to configure Morphy in a project.

```bash
npx morphy init
```

### `morphy add [transitions...]`
Chain-install additional transitions into an existing Morphy setup.

```bash
# Add specific transitions
npx morphy add cube flip origami-unfold

# Add all transitions from a category
npx morphy add --category spatial
npx morphy add --category portal
npx morphy add --category flow

# Add all 33 available transitions
npx morphy add --all
```

### `morphy list`
List all 33 available transitions categorized with descriptions and emoji tags.

```bash
npx morphy list
```

---

## 🔄 Syncing CLI Templates

For contributors and maintainers:

To synchronize the CLI's templates and transition catalog with the latest source code in `frontend/components/morphy`:

```bash
cd cli
pnpm sync # or: npx tsx scripts/sync.ts
pnpm build
```

This will:
- Recursively sync all core files, adapters, and transitions to `cli/templates/`
- Re-scan metadata from transition `.tsx` files
- Automatically generate `cli/src/data/transitions.ts`
- Rebuild the single-file distribution bundle in `cli/dist/`
