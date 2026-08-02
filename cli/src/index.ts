/* ==========================================================================
 * Morphy CLI — Entry Point
 * `npx morphy init` / `npx morphy add` / `npx morphy list`
 * ========================================================================== */

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('morphyjs-cli')
  .description('✨ Drop-in page transitions for React')
  .version('0.1.3');

// ---------------------------------------------------------------------------
// morphy init
// ---------------------------------------------------------------------------

program
  .command('init')
  .description('Set up Morphy in your project (interactive wizard)')
  .action(async () => {
    await initCommand();
  });

// ---------------------------------------------------------------------------
// morphy add [transitions...]
// ---------------------------------------------------------------------------

program
  .command('add [transitions...]')
  .description('Add transitions to an existing Morphy setup')
  .option('-c, --category <category>', 'Add all transitions from a category')
  .option('-a, --all', 'Add all available transitions')
  .action(async (transitions: string[], options: { category?: string; all?: boolean }) => {
    await addCommand(transitions, options);
  });

// ---------------------------------------------------------------------------
// morphy list
// ---------------------------------------------------------------------------

program
  .command('list')
  .description('List all available transitions')
  .action(() => {
    listCommand();
  });

// ---------------------------------------------------------------------------
// Parse & Run
// ---------------------------------------------------------------------------

program.parse();
