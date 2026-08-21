/* ==========================================================================
 * GlideCN CLI — `glidecn update`
 * Updates core files, adapters, and transitions to the latest template version.
 * Supports TypeScript (.tsx/.ts) and JavaScript (.jsx/.js).
 * ========================================================================== */

import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'node:path';
import fs from 'node:fs';
import {
  findProjectRoot,
  findExistingInstallation,
  detectInstalledAdapter,
  detectPackageManager,
  readPackageJson,
  type PackageManager,
} from '../utils/project.js';
import {
  checkDependencies,
  installDependencies,
  printDepStatus,
} from '../utils/dependencies.js';
import {
  copyCore,
  copyAdapter,
  copyTransitions,
  generateBarrelExport,
  detectProjectLanguage,
  getInstalledTransitions,
} from '../utils/files.js';
import { printBanner, CATEGORY_EMOJI } from '../utils/ui.js';
import { TRANSITIONS, TRANSITION_NAMES } from '../data/transitions.js';

// ---------------------------------------------------------------------------
// Update Command Handler
// ---------------------------------------------------------------------------

export async function updateCommand(options: { all?: boolean; yes?: boolean }) {
  printBanner();

  p.intro(pc.bgBlue(pc.black(' glidecn update ')));

  // -----------------------------------------------------------------------
  // 1. Find Project Root & Existing Installation
  // -----------------------------------------------------------------------

  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    p.log.error('Could not find a package.json. Make sure you run this command inside a project.');
    p.outro(pc.red('Update aborted'));
    process.exit(1);
  }

  const existingPath = findExistingInstallation(projectRoot);
  let glidecnDir: string;

  if (existingPath) {
    p.log.info(`Found GlideCN at: ${pc.cyan(path.relative(projectRoot, existingPath))}`);
    glidecnDir = existingPath;
  } else {
    // Ask where it's installed
    const installPath = await p.text({
      message: 'Where is GlideCN installed in your project?',
      placeholder: 'components/glidecn',
      defaultValue: 'components/glidecn',
    });

    if (p.isCancel(installPath)) {
      p.outro(pc.dim('Cancelled'));
      process.exit(0);
    }

    glidecnDir = path.resolve(projectRoot, installPath as string);

    if (!fs.existsSync(glidecnDir) || !fs.existsSync(path.join(glidecnDir, 'core'))) {
      p.log.error(`GlideCN installation not found at: ${glidecnDir}`);
      p.log.info(`Run ${pc.cyan('glidecn init')} first to set up GlideCN.`);
      p.outro(pc.red('Aborted'));
      process.exit(1);
    }
  }

  // -----------------------------------------------------------------------
  // 2. Detect Current Configuration
  // -----------------------------------------------------------------------

  const language = detectProjectLanguage(glidecnDir);
  const adapter = detectInstalledAdapter(glidecnDir, projectRoot);
  const installedTransitions = getInstalledTransitions(glidecnDir);

  p.log.message(
    `  ${pc.dim('Language:')}    ${pc.bold(language === 'ts' ? 'TypeScript' : 'JavaScript')}\n` +
    `  ${pc.dim('Adapter:')}     ${pc.bold(adapter)}\n` +
    `  ${pc.dim('Transitions:')} ${pc.bold(String(installedTransitions.length))} installed`,
  );

  // -----------------------------------------------------------------------
  // 3. Resolve Target Transitions
  // -----------------------------------------------------------------------

  let targetTransitions: string[] = [];

  if (options.all) {
    targetTransitions = [...TRANSITION_NAMES];
  } else if (options.yes) {
    targetTransitions = installedTransitions.length > 0 ? installedTransitions : ['fade'];
  } else {
    const updateChoice = await p.select({
      message: 'What would you like to update?',
      options: [
        {
          value: 'existing',
          label: `${pc.bold(`Update existing setup`)} ${pc.dim(`(Core, ${adapter} adapter, ${installedTransitions.length} transitions)`)}`,
          hint: 'keeps your installed transition list and refreshes code',
        },
        {
          value: 'all',
          label: `${pc.bold(`Update & install ALL transitions`)} ${pc.dim(`(70 transitions)`)}`,
          hint: 'installs the complete transition suite',
        },
      ],
    });

    if (p.isCancel(updateChoice)) {
      p.outro(pc.dim('Cancelled'));
      process.exit(0);
    }

    if (updateChoice === 'all') {
      targetTransitions = [...TRANSITION_NAMES];
    } else {
      targetTransitions = installedTransitions.length > 0 ? installedTransitions : ['fade'];
    }
  }

  // Ensure fade is always present as fallback
  if (!targetTransitions.includes('fade')) {
    targetTransitions.unshift('fade');
  }

  // Confirmation if not in --yes mode
  if (!options.yes) {
    const confirm = await p.confirm({
      message: `Ready to update ${pc.cyan(path.relative(projectRoot, glidecnDir))} with the latest version? (Existing files will be refreshed)`,
      initialValue: true,
    });

    if (p.isCancel(confirm) || !confirm) {
      p.outro(pc.dim('Update cancelled'));
      process.exit(0);
    }
  }

  // -----------------------------------------------------------------------
  // 4. Perform Update
  // -----------------------------------------------------------------------

  const s = p.spinner();
  s.start(`Updating GlideCN (${language === 'js' ? 'JavaScript' : 'TypeScript'})...`);

  let coreResult: { dirs: string[]; files: string[] };
  let adapterFiles: string[];
  let transitionFiles: string[];

  try {
    // 1. Refresh core
    coreResult = await copyCore(glidecnDir, language);

    // 2. Refresh adapter
    adapterFiles = await copyAdapter(glidecnDir, adapter, language);

    // 3. Refresh / add transitions
    transitionFiles = await copyTransitions(glidecnDir, targetTransitions, language);

    // 4. Re-generate public barrel export (index.ts / index.js)
    await generateBarrelExport(glidecnDir, adapter, targetTransitions, language);

    s.stop(pc.green(`GlideCN updated to the latest version!`));
  } catch (err) {
    s.stop(pc.red('Failed to update GlideCN files'));
    p.log.error(err instanceof Error ? err.message : String(err));
    p.outro(pc.red('Update aborted'));
    process.exit(1);
  }

  // -----------------------------------------------------------------------
  // 5. Check & Install Dependencies
  // -----------------------------------------------------------------------

  const pkg = readPackageJson(projectRoot);
  if (pkg) {
    const { installed, missing } = checkDependencies(pkg, adapter);
    if (missing.length > 0) {
      p.log.warn(`Missing dependencies detected: ${missing.join(', ')}`);
      let pm = detectPackageManager(projectRoot);
      if (!pm) {
        pm = 'npm';
      }
      const installDeps = options.yes ? true : await p.confirm({
        message: `Install missing dependencies using ${pc.bold(pm)}?`,
        initialValue: true,
      });

      if (installDeps && !p.isCancel(installDeps)) {
        await installDependencies(missing, pm as PackageManager, projectRoot);
      }
    }
  }

  // -----------------------------------------------------------------------
  // 6. Summary Output
  // -----------------------------------------------------------------------

  console.log('');
  p.log.success(pc.bold('Updated files:'));
  p.log.message(
    `  ${pc.cyan('core/')}          ${pc.dim(`(${coreResult.files.length} engine files refreshed)`)}`,
  );
  p.log.message(
    `  ${pc.cyan('adapters/')}      ${pc.dim(`(${adapterFiles.length} files — ${adapter})`)}`,
  );
  p.log.message(
    `  ${pc.cyan('transitions/')}   ${pc.dim(`(${transitionFiles.length} transitions updated)`)}`,
  );

  const jsExt = language === 'js' ? '.js' : '.ts';
  const ext = language === 'js' ? '.jsx' : '.tsx';
  p.log.message(`  ${pc.cyan('page' + ext)}`);
  p.log.message(`  ${pc.cyan('constants' + jsExt)}`);
  p.log.message(`  ${pc.cyan('index' + jsExt)}`);

  console.log('');
  p.outro(
    pc.bold(pc.green('✨ Update complete!')) +
    pc.dim(' — all engine files and transitions are on the latest version'),
  );
}
