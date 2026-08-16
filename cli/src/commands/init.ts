/* ==========================================================================
 * GlideCN CLI — `glidecn init`
 * Interactive setup wizard for initializing GlideCN in a project.
 * Supports TypeScript (.tsx/.ts) and JavaScript (.jsx/.js).
 * ========================================================================== */

import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'node:path';
import fs from 'node:fs';
import {
  findProjectRoot,
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
} from '../utils/files.js';
import {
  printBanner,
  CATEGORY_EMOJI,
} from '../utils/ui.js';
import {
  TRANSITIONS,
  getTransitionsByCategory,
  CATEGORY_LABELS,
} from '../data/transitions.js';

// ---------------------------------------------------------------------------
// Init Command Handler
// ---------------------------------------------------------------------------

export async function initCommand() {
  printBanner();

  p.intro(pc.bgCyan(pc.black(' glidecn init ')));

  // -----------------------------------------------------------------------
  // 1. Find Project Root
  // -----------------------------------------------------------------------

  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    p.log.error(
      'Could not find a package.json. Make sure you run this command inside a project.',
    );
    p.outro(pc.red('Setup cancelled'));
    process.exit(1);
  }

  p.log.info(`Project root: ${pc.dim(projectRoot)}`);

  // -----------------------------------------------------------------------
  // 2. Select Language (TypeScript vs JavaScript)
  // -----------------------------------------------------------------------

  const hasTsConfig = fs.existsSync(path.join(projectRoot, 'tsconfig.json'));

  const languageChoice = await p.select({
    message: 'Which language are you using?',
    initialValue: hasTsConfig ? 'ts' : 'js',
    options: [
      {
        value: 'ts',
        label: `${pc.bold('TypeScript')}`,
        hint: '.tsx / .ts files with full type safety',
      },
      {
        value: 'js',
        label: `${pc.bold('JavaScript')}`,
        hint: '.jsx / .js files without TypeScript types',
      },
    ],
  });

  if (p.isCancel(languageChoice)) {
    p.outro(pc.dim('Setup cancelled'));
    process.exit(0);
  }

  const language = languageChoice as 'ts' | 'js';

  // -----------------------------------------------------------------------
  // 3. Select Framework Adapter
  // -----------------------------------------------------------------------

  const adapter = await p.select({
    message: 'Which framework adapter do you need?',
    options: [
      {
        value: 'next-app',
        label: `${pc.bold('Next.js App Router')}`,
        hint: 'app/ directory, layout file',
      },
      {
        value: 'next-pages',
        label: `${pc.bold('Next.js Pages Router')}`,
        hint: '_app file, pages/ directory',
      },
      {
        value: 'react-router',
        label: `${pc.bold('React Router / Vite')}`,
        hint: 'react-router-dom v6/v7',
      },
      {
        value: 'universal',
        label: `${pc.bold('TanStack / Universal')}`,
        hint: 'any React setup, manual key',
      },
    ],
  });

  if (p.isCancel(adapter)) {
    p.outro(pc.dim('Setup cancelled'));
    process.exit(0);
  }

  // -----------------------------------------------------------------------
  // 4. Installation Path
  // -----------------------------------------------------------------------

  const defaultPath =
    adapter === 'next-app' ? 'components/glidecn' : 'src/components/glidecn';

  const installPath = await p.text({
    message: 'Where should GlideCN be installed?',
    placeholder: defaultPath,
    defaultValue: defaultPath,
    validate: (val) => {
      if (!val.trim()) return 'Please enter a path';
      if (path.isAbsolute(val)) return 'Please use a relative path';
    },
  });

  if (p.isCancel(installPath)) {
    p.outro(pc.dim('Setup cancelled'));
    process.exit(0);
  }

  const destDir = path.resolve(projectRoot, installPath as string);

  // -----------------------------------------------------------------------
  // 5. Select Transitions (Grouped by Category)
  // -----------------------------------------------------------------------

  const categorized = getTransitionsByCategory();
  const transitionOptions: { value: string; label: string; hint?: string }[] = [];

  // "All transitions" option first
  transitionOptions.push({
    value: '__ALL__',
    label: pc.bold(`All (${TRANSITIONS.length} transitions)`),
    hint: 'install every transition',
  });

  // Then grouped by category
  for (const [category, transitions] of categorized) {
    const emoji = CATEGORY_EMOJI[category] ?? '📦';

    for (const t of transitions) {
      transitionOptions.push({
        value: t.name,
        label: `${emoji} ${pc.bold(t.displayName)}`,
        hint: t.description,
      });
    }
  }

  const selectedTransitions = await p.multiselect({
    message: 'Which transitions do you want?',
    options: transitionOptions,
    required: true,
  });

  if (p.isCancel(selectedTransitions)) {
    p.outro(pc.dim('Setup cancelled'));
    process.exit(0);
  }

  // Resolve "All" selection
  let transitionNames: string[];
  if ((selectedTransitions as string[]).includes('__ALL__')) {
    transitionNames = TRANSITIONS.map((t) => t.name);
  } else {
    transitionNames = selectedTransitions as string[];
  }

  // Always include 'fade' as fallback
  if (!transitionNames.includes('fade')) {
    transitionNames.unshift('fade');
  }

  // -----------------------------------------------------------------------
  // 6. Detect Package Manager
  // -----------------------------------------------------------------------

  let pm = detectPackageManager(projectRoot);

  if (!pm) {
    const pmChoice = await p.select({
      message: 'Which package manager do you use?',
      options: [
        { value: 'npm' as PackageManager, label: 'npm' },
        { value: 'pnpm' as PackageManager, label: 'pnpm' },
        { value: 'yarn' as PackageManager, label: 'yarn' },
        { value: 'bun' as PackageManager, label: 'bun' },
      ],
    });

    if (p.isCancel(pmChoice)) {
      p.outro(pc.dim('Setup cancelled'));
      process.exit(0);
    }

    pm = pmChoice as PackageManager;
  } else {
    p.log.info(`Detected package manager: ${pc.bold(pm)}`);
  }

  // -----------------------------------------------------------------------
  // 7. Check & Install Dependencies
  // -----------------------------------------------------------------------

  const pkg = readPackageJson(projectRoot);

  if (pkg) {
    const { installed, missing } = checkDependencies(pkg, adapter as string);
    printDepStatus(installed, missing);

    if (missing.length > 0) {
      await installDependencies(missing, pm, projectRoot);
    }
  }

  // -----------------------------------------------------------------------
  // 8. Copy Files (with TS -> JS Transpilation if JS selected)
  // -----------------------------------------------------------------------

  const s = p.spinner();
  s.start(`Setting up GlideCN (${language === 'js' ? 'JavaScript' : 'TypeScript'})...`);

  let coreResult: { dirs: string[]; files: string[] };
  let adapterFiles: string[];
  let transitionFiles: string[];

  try {
    // Copy core
    coreResult = await copyCore(destDir, language);

    // Copy selected adapter
    adapterFiles = await copyAdapter(destDir, adapter as string, language);

    // Copy transitions
    transitionFiles = await copyTransitions(destDir, transitionNames, language);

    // Generate barrel index.ts or index.js
    await generateBarrelExport(destDir, adapter as string, transitionNames, language);

    s.stop(pc.green(`GlideCN installed (${language === 'js' ? 'JavaScript' : 'TypeScript'})!`));
  } catch (err) {
    s.stop(pc.red('Failed to copy GlideCN files'));
    p.log.error(err instanceof Error ? err.message : String(err));
    p.outro(pc.red('Setup aborted'));
    process.exit(1);
  }

  // -----------------------------------------------------------------------
  // 9. Print Summary
  // -----------------------------------------------------------------------

  const ext = language === 'js' ? '.jsx' : '.tsx';
  const jsExt = language === 'js' ? '.js' : '.ts';

  console.log('');
  p.log.success(pc.bold('Files created:'));
  p.log.message(
    `  ${pc.cyan(installPath + '/core/')}          ${pc.dim(`(${coreResult.files.length} files)`)}`,
  );
  p.log.message(
    `  ${pc.cyan(installPath + '/adapters/')}      ${pc.dim(`(${adapterFiles.length} files — ${adapter})`)}`,
  );
  p.log.message(
    `  ${pc.cyan(installPath + '/transitions/')}   ${pc.dim(`(${transitionFiles.length} selected)`)}`,
  );
  p.log.message(`  ${pc.cyan(installPath + '/page' + ext)}`);
  p.log.message(`  ${pc.cyan(installPath + '/constants' + jsExt)}`);
  p.log.message(`  ${pc.cyan(installPath + '/index' + jsExt)}`);

  // -----------------------------------------------------------------------
  // 10. Quick Start Guide
  // -----------------------------------------------------------------------

  console.log('');
  const importPath = (installPath as string).startsWith('src/')
    ? '@/' + (installPath as string).replace('src/', '')
    : '@/' + installPath;

  const quickStart = getQuickStart(adapter as string, importPath, language);
  p.note(quickStart, '🚀 Quick Start');

  p.outro(
    pc.bold(pc.green('✨ Happy transitioning!')) +
    pc.dim(' — run ') +
    pc.cyan('glidecn list') +
    pc.dim(' to see all available transitions'),
  );
}

// ---------------------------------------------------------------------------
// Quick Start Code Snippets
// ---------------------------------------------------------------------------

function getQuickStart(adapter: string, importPath: string, language: 'ts' | 'js'): string {
  const ext = language === 'js' ? '.jsx' : '.tsx';
  const jsExt = language === 'js' ? '.js' : '.ts';

  switch (adapter) {
    case 'next-app':
      return `${pc.dim(`// app/layout${ext}`)}
import { GlideCNProvider } from '${importPath}';
import { GlideCNNextApp } from '${importPath}/adapters/next-app';

export default function Layout({ children }) {
  return (
    <GlideCNProvider defaultTransition="fade">
      <GlideCNNextApp>{children}</GlideCNNextApp>
    </GlideCNProvider>
  );
}

${pc.dim(`// app/page${ext}`)}
import { Page } from '${importPath}';

export default function Home() {
  return <Page>Hello GlideCN! ✨</Page>;
}`;

    case 'next-pages':
      return `${pc.dim(`// pages/_app${ext}`)}
import { GlideCNProvider } from '${importPath}';
import { GlideCNNextPages } from '${importPath}/adapters/next-pages';

export default function App({ Component, pageProps, router }) {
  return (
    <GlideCNProvider defaultTransition="fade">
      <GlideCNNextPages routerAsPath={router.asPath}>
        <Component {...pageProps} key={router.asPath} />
      </GlideCNNextPages>
    </GlideCNProvider>
  );
}

${pc.dim(`// pages/index${ext}`)}
import { Page } from '${importPath}';

export default function Home() {
  return <Page>Hello GlideCN! ✨</Page>;
}`;

    case 'react-router':
      return `${pc.dim(`// src/App${ext}`)}
import { useLocation, Routes, Route } from 'react-router-dom';
import { GlideCNProvider, GlideCNReactRouter } from '${importPath}';

export default function App() {
  const location = useLocation();
  return (
    <GlideCNProvider defaultTransition="fade">
      <GlideCNReactRouter locationKey={location.pathname}>
        <Routes location={location} key={location.pathname}>
          {/* your routes */}
        </Routes>
      </GlideCNReactRouter>
    </GlideCNProvider>
  );
}`;

    case 'universal':
      return `${pc.dim(`// Wrap your routes (e.g. src/App${ext})`)}
import { GlideCNProvider, GlideCNUniversal } from '${importPath}';

export default function App() {
  const routeKey = /* your current route key */;
  return (
    <GlideCNProvider defaultTransition="fade">
      <GlideCNUniversal routeKey={routeKey}>
        {/* your page component */}
      </GlideCNUniversal>
    </GlideCNProvider>
  );
}`;

    default:
      return 'See the docs for setup instructions.';
  }
}
