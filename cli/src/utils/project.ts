/* ==========================================================================
 * Morphy CLI — Project Detection Utilities
 * Find project root, detect package manager, resolve paths.
 * ========================================================================== */

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Package Manager Types
// ---------------------------------------------------------------------------

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface PackageManagerInfo {
  name: PackageManager;
  installCmd: string;
  addCmd: string;
  execCmd: string;
  lockfile: string;
}

export const PACKAGE_MANAGERS: Record<PackageManager, PackageManagerInfo> = {
  npm: {
    name: 'npm',
    installCmd: 'npm install',
    addCmd: 'npm install',
    execCmd: 'npx',
    lockfile: 'package-lock.json',
  },
  pnpm: {
    name: 'pnpm',
    installCmd: 'pnpm install',
    addCmd: 'pnpm add',
    execCmd: 'pnpm dlx',
    lockfile: 'pnpm-lock.yaml',
  },
  yarn: {
    name: 'yarn',
    installCmd: 'yarn install',
    addCmd: 'yarn add',
    execCmd: 'yarn dlx',
    lockfile: 'yarn.lock',
  },
  bun: {
    name: 'bun',
    installCmd: 'bun install',
    addCmd: 'bun add',
    execCmd: 'bunx',
    lockfile: 'bun.lockb',
  },
};

// ---------------------------------------------------------------------------
// Project Root Detection
// ---------------------------------------------------------------------------

/**
 * Walk up from `cwd` looking for `package.json`.
 * Returns the directory containing it, or `null` if not found.
 */
export function findProjectRoot(cwd: string = process.cwd()): string | null {
  let dir = path.resolve(cwd);

  while (true) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }

    const parent = path.dirname(dir);
    if (parent === dir) break; // reached filesystem root
    dir = parent;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Package Manager Detection
// ---------------------------------------------------------------------------

/**
 * Detect the package manager by checking for lockfiles.
 * Walks up from `cwd`. Returns `null` if no lockfile is found.
 */
export function detectPackageManager(cwd: string = process.cwd()): PackageManager | null {
  let dir = path.resolve(cwd);

  // Priority order for lockfile detection
  const lockfileMap: [string, PackageManager][] = [
    ['bun.lockb', 'bun'],
    ['bun.lock', 'bun'],
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['package-lock.json', 'npm'],
  ];

  while (true) {
    for (const [lockfile, pm] of lockfileMap) {
      if (fs.existsSync(path.join(dir, lockfile))) {
        return pm;
      }
    }

    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Morphy Installation Detection
// ---------------------------------------------------------------------------

/**
 * Look for an existing Morphy installation.
 * Returns the path to the morphy directory, or `null` if not found.
 */
export function findExistingInstallation(projectRoot: string): string | null {
  // Common locations
  const candidates = [
    path.join(projectRoot, 'components', 'morphy'),
    path.join(projectRoot, 'src', 'components', 'morphy'),
    path.join(projectRoot, 'app', 'components', 'morphy'),
  ];

  for (const candidate of candidates) {
    if (
      fs.existsSync(candidate) &&
      fs.existsSync(path.join(candidate, 'core')) &&
      fs.existsSync(path.join(candidate, 'constants.ts'))
    ) {
      return candidate;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Package.json Helpers
// ---------------------------------------------------------------------------

export interface PackageJson {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
}

export function readPackageJson(projectRoot: string): PackageJson | null {
  const pkgPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;

  try {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Check if a dependency exists in package.json (deps or devDeps).
 */
export function hasDependency(pkg: PackageJson, name: string): boolean {
  return !!(pkg.dependencies?.[name] || pkg.devDependencies?.[name]);
}
