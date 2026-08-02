/* ==========================================================================
 * Morphy CLI — `morphy add <transitions...>`
 * Chain-install transitions into an existing Morphy setup.
 * Supports TypeScript (.tsx) and JavaScript (.jsx).
 * ========================================================================== */

import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'path';
import fs from 'fs-extra';
import { findProjectRoot, findExistingInstallation } from '../utils/project.js';
import {
  copyTransitions,
  appendTransitionExports,
  detectProjectLanguage,
} from '../utils/files.js';
import { printBanner, CATEGORY_EMOJI } from '../utils/ui.js';
import {
  TRANSITIONS,
  TRANSITION_NAMES,
  getTransitionsByCategory,
  CATEGORY_LABELS,
} from '../data/transitions.js';

// ---------------------------------------------------------------------------
// Add Command
// ---------------------------------------------------------------------------

export async function addCommand(
  transitionArgs: string[],
  options: { category?: string; all?: boolean },
) {
  printBanner();

  p.intro(pc.bgMagenta(pc.black(' morphy add ')));

  // -----------------------------------------------------------------------
  // 1. Find Project & Existing Installation
  // -----------------------------------------------------------------------

  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    p.log.error('Could not find a package.json. Run this inside a project.');
    p.outro(pc.red('Aborted'));
    process.exit(1);
  }

  const existingPath = findExistingInstallation(projectRoot);
  let morphyDir: string;

  if (existingPath) {
    p.log.info(`Found Morphy at: ${pc.cyan(path.relative(projectRoot, existingPath))}`);
    morphyDir = existingPath;
  } else {
    // Ask where it's installed
    const installPath = await p.text({
      message: 'Where is Morphy installed?',
      placeholder: 'components/morphy',
      defaultValue: 'components/morphy',
    });

    if (p.isCancel(installPath)) {
      p.outro(pc.dim('Cancelled'));
      process.exit(0);
    }

    morphyDir = path.resolve(projectRoot, installPath as string);

    if (!fs.existsSync(morphyDir)) {
      p.log.error(`Directory not found: ${morphyDir}`);
      p.log.info(`Run ${pc.cyan('morphy init')} first to set up Morphy.`);
      p.outro(pc.red('Aborted'));
      process.exit(1);
    }
  }

  // Detect language of existing Morphy setup
  const language = detectProjectLanguage(morphyDir);
  const transitionExt = language === 'js' ? '.jsx' : '.tsx';
  const indexFile = language === 'js' ? 'index.js' : 'index.ts';

  // -----------------------------------------------------------------------
  // 2. Resolve Which Transitions to Add
  // -----------------------------------------------------------------------

  let toAdd: string[] = [];

  if (options.all) {
    // --all flag: install every transition
    toAdd = [...TRANSITION_NAMES];
  } else if (options.category) {
    // --category flag: install all from a category
    const cat = options.category.toLowerCase();
    const catTransitions = TRANSITIONS.filter((t) => t.category === cat);

    if (catTransitions.length === 0) {
      const availableCategories = [...new Set(TRANSITIONS.map((t) => t.category))];
      p.log.error(
        `Unknown category "${cat}". Available: ${availableCategories.join(', ')}`,
      );
      p.outro(pc.red('Aborted'));
      process.exit(1);
    }

    toAdd = catTransitions.map((t) => t.name);
    p.log.info(
      `Adding all ${pc.bold(String(toAdd.length))} transitions from ${pc.cyan(cat)} category`,
    );
  } else if (transitionArgs.length > 0) {
    // Positional args: validate each name
    for (const name of transitionArgs) {
      if (TRANSITION_NAMES.includes(name)) {
        toAdd.push(name);
      } else {
        p.log.warn(
          `Unknown transition "${name}". Skipping. Run ${pc.cyan('morphy list')} to see available transitions.`,
        );
      }
    }
  } else {
    // No args: interactive multi-select
    const categorized = getTransitionsByCategory();
    const options: { value: string; label: string; hint?: string }[] = [];

    for (const [category, transitions] of categorized) {
      const emoji = CATEGORY_EMOJI[category] ?? '📦';
      for (const t of transitions) {
        // Check if already installed
        const isInstalled =
          fs.existsSync(path.join(morphyDir, 'transitions', `${t.name}.tsx`)) ||
          fs.existsSync(path.join(morphyDir, 'transitions', `${t.name}.jsx`));

        options.push({
          value: t.name,
          label: `${emoji} ${pc.bold(t.displayName)}${isInstalled ? pc.dim(' (installed)') : ''}`,
          hint: t.description,
        });
      }
    }

    const selected = await p.multiselect({
      message: 'Which transitions do you want to add?',
      options,
      required: true,
    });

    if (p.isCancel(selected)) {
      p.outro(pc.dim('Cancelled'));
      process.exit(0);
    }

    toAdd = selected as string[];
  }

  if (toAdd.length === 0) {
    p.log.warn('No transitions to add.');
    p.outro(pc.dim('Nothing to do'));
    return;
  }

  // -----------------------------------------------------------------------
  // 3. Filter Out Already Installed
  // -----------------------------------------------------------------------

  const alreadyInstalled: string[] = [];
  const newTransitions: string[] = [];

  for (const name of toAdd) {
    const exists =
      fs.existsSync(path.join(morphyDir, 'transitions', `${name}.tsx`)) ||
      fs.existsSync(path.join(morphyDir, 'transitions', `${name}.jsx`));

    if (exists) {
      alreadyInstalled.push(name);
    } else {
      newTransitions.push(name);
    }
  }

  if (alreadyInstalled.length > 0) {
    p.log.info(
      `Already installed: ${alreadyInstalled.map((n) => pc.dim(n)).join(', ')}`,
    );
  }

  if (newTransitions.length === 0) {
    p.log.success('All requested transitions are already installed!');
    p.outro(pc.green('✨ Nothing to do'));
    return;
  }

  // -----------------------------------------------------------------------
  // 4. Copy & Update Barrel
  // -----------------------------------------------------------------------

  const s = p.spinner();
  s.start(`Adding ${newTransitions.length} transition(s) (${language === 'js' ? 'JavaScript' : 'TypeScript'})...`);

  let copied: string[];
  try {
    copied = await copyTransitions(morphyDir, newTransitions, language);

    // Update barrel exports
    const indexPath = path.join(morphyDir, indexFile);
    if (fs.existsSync(indexPath)) {
      await appendTransitionExports(indexPath, newTransitions);
    }

    s.stop(pc.green(`Added ${copied.length} transition(s)!`));
  } catch (err) {
    s.stop(pc.red('Failed to add transitions'));
    p.log.error(err instanceof Error ? err.message : String(err));
    p.outro(pc.red('Operation aborted'));
    process.exit(1);
  }

  // -----------------------------------------------------------------------
  // 5. Summary
  // -----------------------------------------------------------------------

  console.log('');
  for (const name of copied) {
    const cleanName = name.replace(/\.(tsx|jsx)$/, '');
    const meta = TRANSITIONS.find((t) => t.name === cleanName);
    const emoji = meta ? (CATEGORY_EMOJI[meta.category] ?? '📦') : '✨';
    p.log.success(`${emoji} ${name}`);
  }

  p.outro(
    pc.bold(pc.green('✨ Transitions added!')) +
      pc.dim(' — use them with ') +
      pc.cyan('<Page transition="name">'),
  );
}
