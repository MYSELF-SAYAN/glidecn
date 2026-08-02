/* ==========================================================================
 * Morphy CLI — Terminal UI Helpers
 * Banner, boxes, styled output for the playful CLI experience.
 * ========================================================================== */

import pc from 'picocolors';

// ---------------------------------------------------------------------------
// ASCII Art Banner
// ---------------------------------------------------------------------------

const MORPHY_ART = `
  ${pc.magenta('███')}${pc.cyan('╗')}   ${pc.magenta('███')}${pc.cyan('╗')} ${pc.yellow('██████')}${pc.cyan('╗')} ${pc.green('██████')}${pc.cyan('╗')} ${pc.blue('██████')}${pc.cyan('╗')} ${pc.red('██')}${pc.cyan('╗')}  ${pc.red('██')}${pc.cyan('╗')} ${pc.magenta('██')}${pc.cyan('╗')}  ${pc.magenta('██')}${pc.cyan('╗')}
  ${pc.magenta('████')}${pc.cyan('╗')} ${pc.magenta('████')}${pc.cyan('║')}${pc.yellow('██')}${pc.cyan('╔═══')}${pc.yellow('██')}${pc.cyan('╗')}${pc.green('██')}${pc.cyan('╔══')}${pc.green('██')}${pc.cyan('╗')}${pc.blue('██')}${pc.cyan('╔══')}${pc.blue('██')}${pc.cyan('╗')}${pc.red('██')}${pc.cyan('║')}  ${pc.red('██')}${pc.cyan('║')} ${pc.magenta('╚██')}${pc.cyan('╗')}${pc.magenta('██')}${pc.cyan('╔╝')}
  ${pc.magenta('██')}${pc.cyan('╔')}${pc.magenta('████')}${pc.cyan('╔')}${pc.magenta('██')}${pc.cyan('║')}${pc.yellow('██')}${pc.cyan('║   ')}${pc.yellow('██')}${pc.cyan('║')}${pc.green('██████')}${pc.cyan('╔╝')}${pc.blue('██████')}${pc.cyan('╔╝')}${pc.red('██████')}${pc.cyan('╗')}  ${pc.magenta('╚███')}${pc.cyan('╔╝')}
  ${pc.magenta('██')}${pc.cyan('║╚')}${pc.magenta('██')}${pc.cyan('╔╝')}${pc.magenta('██')}${pc.cyan('║')}${pc.yellow('██')}${pc.cyan('║   ')}${pc.yellow('██')}${pc.cyan('║')}${pc.green('██')}${pc.cyan('╔══')}${pc.green('██')}${pc.cyan('╗')}${pc.blue('██')}${pc.cyan('╔═══╝ ')}${pc.red('██')}${pc.cyan('╔══')}${pc.red('██')}${pc.cyan('╗')} ${pc.magenta('██')}${pc.cyan('╔')}${pc.magenta('██')}${pc.cyan('╗')}
  ${pc.magenta('██')}${pc.cyan('║ ╚═╝ ')}${pc.magenta('██')}${pc.cyan('║')}${pc.yellow('╚██████')}${pc.cyan('╔╝')}${pc.green('██')}${pc.cyan('║  ')}${pc.green('██')}${pc.cyan('║')}${pc.blue('██')}${pc.cyan('║     ')}${pc.red('██')}${pc.cyan('║  ')}${pc.red('██')}${pc.cyan('║')}${pc.magenta('██')}${pc.cyan('╔╝ ')}${pc.magenta('██')}${pc.cyan('╗')}
  ${pc.cyan('╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝')}
`;

export function printBanner() {
  console.log(MORPHY_ART);
  console.log(
    pc.dim('  ') +
      pc.bold(pc.white('✨ Page transitions for React')) +
      pc.dim(' — drop-in, own your code'),
  );
  console.log('');
}

// ---------------------------------------------------------------------------
// Box Drawing
// ---------------------------------------------------------------------------

export function printBox(title: string, lines: string[]) {
  const maxLen = Math.max(title.length, ...lines.map((l) => stripAnsi(l).length));
  const width = maxLen + 4;
  const top = '┌' + '─'.repeat(width) + '┐';
  const bottom = '└' + '─'.repeat(width) + '┘';
  const titlePad = ' '.repeat(width - stripAnsi(title).length - 2);

  console.log(pc.dim(top));
  console.log(pc.dim('│') + '  ' + pc.bold(title) + titlePad + pc.dim('│'));
  console.log(pc.dim('│') + ' '.repeat(width) + pc.dim('│'));
  for (const line of lines) {
    const pad = ' '.repeat(width - stripAnsi(line).length - 2);
    console.log(pc.dim('│') + '  ' + line + pad + pc.dim('│'));
  }
  console.log(pc.dim(bottom));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function label(text: string): string {
  return pc.bold(pc.cyan(text));
}

export function success(text: string): string {
  return pc.bold(pc.green('✔')) + ' ' + text;
}

export function warning(text: string): string {
  return pc.bold(pc.yellow('⚠')) + ' ' + pc.yellow(text);
}

export function error(text: string): string {
  return pc.bold(pc.red('✖')) + ' ' + pc.red(text);
}

export function dim(text: string): string {
  return pc.dim(text);
}

export function highlight(text: string): string {
  return pc.bold(pc.magenta(text));
}

export function accent(text: string): string {
  return pc.cyan(text);
}

export function stripAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

export function printDivider() {
  console.log(pc.dim('─'.repeat(56)));
}

// ---------------------------------------------------------------------------
// Category Emoji
// ---------------------------------------------------------------------------

export const CATEGORY_EMOJI: Record<string, string> = {
  flow: '🌊',
  portal: '🌀',
  paper: '📄',
  mask: '🎭',
  spatial: '🧊',
  dynamic: '⚡',
  experimental: '🧪',
};
