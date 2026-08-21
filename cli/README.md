# GlideCN CLI (`glidecn-cli`)

✨ **Drop-in page transitions for React** — shadcn-style component distribution.

`glidecn-cli` is the official CLI to scaffold GlideCN page transitions directly into your codebase. You own the code; no black-box dependencies.

---

## 🚀 Quick Start

### 1. Initialize GlideCN in your project
Works with **npm**, **pnpm**, **yarn**, and **bun**:

```bash
# npm
npx glidecn-cli init

# pnpm
pnpm dlx glidecn-cli init

# yarn
yarn dlx glidecn-cli init

# bun
bunx glidecn-cli init
```

The interactive wizard will:
1. Ask you to choose your framework adapter:
   - **Next.js App Router** (`app/` directory with `FrozenRouter`)
   - **Next.js Pages Router** (`pages/_app.tsx`)
   - **React Router / Vite** (`react-router-dom`)
   - **TanStack / Universal** (framework-agnostic)
2. Ask where to place components (e.g. `components/glidecn` or `src/components/glidecn`)
3. Let you pick which transitions to install (or select all 33 transitions)
4. Check if required dependencies (`react`, `react-dom`, `framer-motion`) are installed and offer to install missing ones
5. Scaffold the components and generate barrel exports (`index.ts`) with helpful quickstart instructions

---

## 📦 Commands

### `glidecn-cli init`
Run the full setup wizard to configure GlideCN in a project.

```bash
npx glidecn-cli init
```

### `glidecn-cli add [transitions...]`
Chain-install additional transitions into an existing GlideCN setup.

```bash
# Add specific transitions
npx glidecn-cli add cube flip origami-unfold

# Add all transitions from a category
npx glidecn-cli add --category spatial
npx glidecn-cli add --category portal
npx glidecn-cli add --category flow

# Add all 70 available transitions
npx glidecn-cli add --all
```

### `glidecn-cli update`
Update your existing GlideCN core engine files, adapters, and installed transitions to the latest template version.

```bash
# Interactive update
npx glidecn-cli update

# Update and install all 70 transitions
npx glidecn-cli update --all

# Skip prompts (CI / automated scripts)
npx glidecn-cli update --yes
```

### `glidecn-cli list`
List all 70 available transitions categorized with descriptions and emoji tags.

```bash
npx glidecn-cli list
```

---

## 🔄 Syncing CLI Templates

For contributors and maintainers:

To synchronize the CLI's templates and transition catalog with the latest source code in `frontend/components/glidecn`:

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
