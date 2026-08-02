/* ==========================================================================
 * Morphy CLI — `morphy list`
 * Display the full transition catalog, grouped by category.
 * ========================================================================== */

import pc from 'picocolors';
import { printBanner, CATEGORY_EMOJI, printDivider } from '../utils/ui.js';
import {
  TRANSITIONS,
  getTransitionsByCategory,
  CATEGORY_LABELS,
} from '../data/transitions.js';

// ---------------------------------------------------------------------------
// List Command
// ---------------------------------------------------------------------------

export function listCommand() {
  printBanner();

  console.log(
    pc.bold(`  🎨 morphy transitions — ${pc.cyan(String(TRANSITIONS.length))} available`),
  );
  console.log('');
  printDivider();
  console.log('');

  const categorized = getTransitionsByCategory();

  for (const [category, transitions] of categorized) {
    const emoji = CATEGORY_EMOJI[category] ?? '📦';
    const label = CATEGORY_LABELS[category] ?? category;

    console.log(`  ${emoji} ${pc.bold(pc.underline(label))} ${pc.dim(`(${transitions.length})`)}`);
    console.log('');

    for (const t of transitions) {
      const name = t.name.padEnd(20);
      console.log(`     ${pc.cyan(name)} ${pc.dim(t.description)}`);
    }

    console.log('');
  }

  printDivider();
  console.log('');
  console.log(
    `  ${pc.dim('Add transitions:')} ${pc.cyan('morphy add cube flip origami-unfold')}`,
  );
  console.log(
    `  ${pc.dim('Add by category:')} ${pc.cyan('morphy add --category spatial')}`,
  );
  console.log(
    `  ${pc.dim('Add all:')}         ${pc.cyan('morphy add --all')}`,
  );
  console.log('');
}
