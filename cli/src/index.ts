/* ==========================================================================
 * GlideCN CLI — Entry Point
 * `npx glidecn init` / `npx glidecn add` / `npx glidecn list`
 * ========================================================================== */

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
  .name('glidecn-cli')
  .description('✨ Drop-in page transitions for React')
  .version('0.1.3');

// ---------------------------------------------------------------------------
// glidecn init
// ---------------------------------------------------------------------------

program
  .command('init')
  .description('Set up GlideCN in your project (interactive wizard)')
  .action(async () => {
    await initCommand();
  });

// ---------------------------------------------------------------------------
// glidecn add [transitions...]
// ---------------------------------------------------------------------------

program
  .command('add [transitions...]')
  .description('Add transitions to an existing GlideCN setup')
  .option('-c, --category <category>', 'Add all transitions from a category')
  .option('-a, --all', 'Add all available transitions')
  .action(async (transitions: string[], options: { category?: string; all?: boolean }) => {
    await addCommand(transitions, options);
  });

// ---------------------------------------------------------------------------
// glidecn list
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
