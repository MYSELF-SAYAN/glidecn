/* ==========================================================================
 * Morphy CLI — Dependency Management
 * Check required dependencies, prompt for installation, execute install.
 * ========================================================================== */

import { execSync } from 'child_process';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import type { PackageManager } from './project.js';
import { PACKAGE_MANAGERS, type PackageJson, hasDependency } from './project.js';

// ---------------------------------------------------------------------------
// Required Dependencies
// ---------------------------------------------------------------------------

export interface DepCheck {
  name: string;
  installed: boolean;
}

/** Dependencies required by Morphy */
const REQUIRED_DEPS = ['react', 'react-dom', 'framer-motion'];

/** Additional deps per adapter */
const ADAPTER_DEPS: Record<string, string[]> = {
  'next-app': ['next'],
  'next-pages': ['next'],
  'react-router': ['react-router-dom'],
  universal: [],
};

// ---------------------------------------------------------------------------
// Check Dependencies
// ---------------------------------------------------------------------------

export function checkDependencies(
  pkg: PackageJson,
  adapter: string,
): { installed: DepCheck[]; missing: DepCheck[] } {
  const allDeps = [...REQUIRED_DEPS, ...(ADAPTER_DEPS[adapter] ?? [])];
  const installed: DepCheck[] = [];
  const missing: DepCheck[] = [];

  for (const dep of allDeps) {
    const check: DepCheck = { name: dep, installed: hasDependency(pkg, dep) };
    if (check.installed) {
      installed.push(check);
    } else {
      missing.push(check);
    }
  }

  return { installed, missing };
}

// ---------------------------------------------------------------------------
// Display Dependency Status
// ---------------------------------------------------------------------------

export function printDepStatus(installed: DepCheck[], missing: DepCheck[]) {
  p.log.info(pc.bold('Dependency check:'));

  for (const dep of installed) {
    p.log.success(`${pc.green('✓')} ${dep.name} ${pc.dim('(installed)')}`);
  }

  for (const dep of missing) {
    p.log.warn(`${pc.red('✗')} ${dep.name} ${pc.dim('(not found)')}`);
  }
}

// ---------------------------------------------------------------------------
// Install Missing Dependencies
// ---------------------------------------------------------------------------

export async function installDependencies(
  missing: DepCheck[],
  pm: PackageManager,
  projectRoot: string,
): Promise<boolean> {
  if (missing.length === 0) return true;

  const depNames = missing.map((d) => d.name).join(', ');
  const shouldInstall = await p.confirm({
    message: `Install missing dependencies? (${depNames})`,
    initialValue: true,
  });

  if (p.isCancel(shouldInstall) || !shouldInstall) {
    p.log.warn('Skipping dependency installation. You\'ll need to install them manually.');
    return false;
  }

  const pmInfo = PACKAGE_MANAGERS[pm];
  const depList = missing.map((d) => d.name).join(' ');
  const cmd = `${pmInfo.addCmd} ${depList}`;

  const s = p.spinner();
  s.start(`Installing with ${pc.bold(pm)}... ${pc.dim(cmd)}`);

  try {
    execSync(cmd, {
      cwd: projectRoot,
      stdio: 'pipe',
      timeout: 120_000,
    });
    s.stop(pc.green('Dependencies installed successfully!'));
    return true;
  } catch (err) {
    s.stop(pc.red('Installation failed'));
    p.log.error(`Failed to run: ${cmd}`);
    p.log.error('Please install the dependencies manually.');
    return false;
  }
}
