/* ==========================================================================
 * GlideCN CLI — File Utilities
 * Copy templates, transpile TS -> JS, generate barrel exports, resolve template paths.
 * ========================================================================== */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import pc from 'picocolors';
import ts from 'typescript';
import * as p from '@clack/prompts';

// ---------------------------------------------------------------------------
// Template Root
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Resolve the templates directory.
 * In dev: cli/templates/
 * Published: dist/../templates/
 */
export function getTemplatesDir(): string {
  const candidates = [
    path.resolve(__dirname, '..', 'templates'), // dist/index.js -> dist/../templates
    path.resolve(__dirname, '..', '..', 'templates'), // src/utils/files.ts -> src/utils/../../templates
    path.resolve(__dirname, 'templates'), // templates in same dir
    path.resolve(process.cwd(), 'templates'),
    path.resolve(process.cwd(), 'cli', 'templates'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'core'))) {
      return candidate;
    }
  }

  throw new Error(
    `Could not find GlideCN templates directory. Checked:\n${candidates.map((c) => `  - ${c}`).join('\n')}`,
  );
}

// ---------------------------------------------------------------------------
// TypeScript to JavaScript Transpilation
// ---------------------------------------------------------------------------

/**
 * Transpile TypeScript / TSX code to clean JavaScript / JSX.
 * Strips all type annotations, interfaces, type-only imports, and type casts.
 */
export function transpileToJs(code: string, isJsx: boolean): string {
  const result = ts.transpileModule(code, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: isJsx ? ts.JsxEmit.Preserve : undefined,
      removeComments: false,
    },
  });

  return result.outputText;
}

/**
 * Detect language of an existing GlideCN installation.
 */
export function detectProjectLanguage(glidecnDir: string): 'ts' | 'js' {
  if (fs.existsSync(path.join(glidecnDir, 'page.jsx')) || fs.existsSync(path.join(glidecnDir, 'index.js'))) {
    return 'js';
  }
  return 'ts';
}

/**
 * Copy a file from templates, converting to JS/JSX if requested.
 */
async function copyProcessedFile(
  src: string,
  destDir: string,
  destFileName: string,
  language: 'ts' | 'js',
): Promise<string> {
  const content = await fs.readFile(src, 'utf-8');

  if (language === 'js') {
    const isJsx = src.endsWith('.tsx');
    const jsExt = isJsx ? '.jsx' : '.js';
    const baseName = destFileName.replace(/\.(tsx|ts)$/, '');
    const finalName = `${baseName}${jsExt}`;
    const transpiled = transpileToJs(content, isJsx);

    await fs.writeFile(path.join(destDir, finalName), transpiled, 'utf-8');
    return finalName;
  } else {
    await fs.writeFile(path.join(destDir, destFileName), content, 'utf-8');
    return destFileName;
  }
}

// ---------------------------------------------------------------------------
// Copy Core Files
// ---------------------------------------------------------------------------

export interface CopyResult {
  dirs: string[];
  files: string[];
}

/**
 * Copy core GlideCN files (everything except transitions and adapters).
 */
export async function copyCore(destDir: string, language: 'ts' | 'js' = 'ts'): Promise<CopyResult> {
  const templatesDir = getTemplatesDir();
  const result: CopyResult = { dirs: [], files: [] };

  // Ensure destination exists
  await fs.ensureDir(destDir);
  const coreDest = path.join(destDir, 'core');
  await fs.ensureDir(coreDest);

  // Copy core directory files
  const coreSrc = path.join(templatesDir, 'core');
  if (await fs.pathExists(coreSrc)) {
    const coreEntries = await fs.readdir(coreSrc);
    result.dirs.push('core/');

    for (const entry of coreEntries) {
      const srcFile = path.join(coreSrc, entry);
      const stat = await fs.stat(srcFile);
      if (stat.isFile()) {
        const savedName = await copyProcessedFile(srcFile, coreDest, entry, language);
        result.files.push(`core/${savedName}`);
      }
    }
  }

  // Copy constants.ts
  const constantsSrc = path.join(templatesDir, 'constants.ts');
  if (await fs.pathExists(constantsSrc)) {
    const saved = await copyProcessedFile(constantsSrc, destDir, 'constants.ts', language);
    result.files.push(saved);
  }

  // Copy page.tsx
  const pageSrc = path.join(templatesDir, 'page.tsx');
  if (await fs.pathExists(pageSrc)) {
    const saved = await copyProcessedFile(pageSrc, destDir, 'page.tsx', language);
    result.files.push(saved);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Copy Adapter
// ---------------------------------------------------------------------------

/** Map from adapter choice to file(s) to copy */
const ADAPTER_FILES: Record<string, string[]> = {
  'next-app': ['next-app.tsx'],
  'next-pages': ['next-pages.tsx'],
  'react-router': ['react-router.tsx'],
  universal: ['universal.tsx'],
};

/**
 * Copy the selected adapter file(s) into adapters/.
 */
export async function copyAdapter(
  destDir: string,
  adapter: string,
  language: 'ts' | 'js' = 'ts',
): Promise<string[]> {
  const templatesDir = getTemplatesDir();
  const adaptersSrc = path.join(templatesDir, 'adapters');
  const adaptersDest = path.join(destDir, 'adapters');

  await fs.ensureDir(adaptersDest);

  const filesToCopy = ADAPTER_FILES[adapter] ?? ['universal.tsx'];
  const copied: string[] = [];

  for (const file of filesToCopy) {
    const src = path.join(adaptersSrc, file);
    if (await fs.pathExists(src)) {
      const saved = await copyProcessedFile(src, adaptersDest, file, language);
      copied.push(saved);
    }
  }

  // Generate adapter barrel export
  const indexName = await generateAdapterIndex(adaptersDest, adapter, language);
  copied.push(indexName);

  return copied;
}

// ---------------------------------------------------------------------------
// Copy Transitions
// ---------------------------------------------------------------------------

/**
 * Copy selected transition files.
 */
export async function copyTransitions(
  destDir: string,
  transitionNames: string[],
  language: 'ts' | 'js' = 'ts',
): Promise<string[]> {
  const templatesDir = getTemplatesDir();
  const transitionsSrc = path.join(templatesDir, 'transitions');
  const transitionsDest = path.join(destDir, 'transitions');

  await fs.ensureDir(transitionsDest);

  const copied: string[] = [];

  for (const name of transitionNames) {
    const fileName = `${name}.tsx`;
    const src = path.join(transitionsSrc, fileName);
    if (await fs.pathExists(src)) {
      const saved = await copyProcessedFile(src, transitionsDest, fileName, language);
      copied.push(saved);
    } else {
      p.log.warn(`Transition file not found: ${fileName}`);
    }
  }

  return copied;
}

// ---------------------------------------------------------------------------
// Generate Barrel Exports (index.ts / index.js)
// ---------------------------------------------------------------------------

/**
 * Generate the main index.ts / index.js barrel export for the installed GlideCN.
 */
export async function generateBarrelExport(
  destDir: string,
  adapter: string,
  transitionNames: string[],
  language: 'ts' | 'js' = 'ts',
): Promise<void> {
  const adapterExports = getAdapterExportLines(adapter);
  const transitionExports = transitionNames.map((name) => {
    const camelName = kebabToCamel(name) + 'Transition';
    return `export { ${camelName} } from './transitions/${name}';`;
  });

  const lines = [
    '/* ==========================================================================',
    ' * GlideCN — Public API',
    ' * Auto-generated by glidecn CLI. Feel free to customize!',
    ' * ========================================================================== */',
    '',
    '// Core components',
    "export { GlideCNProvider } from './core/provider';",
    "export { TransitionManager as GlideCN, TransitionManager } from './core/transition-manager';",
    "export { Page } from './page';",
    '',
    '// Router Adapter',
    ...adapterExports,
    '',
    '// Registry',
    'export {',
    '  TransitionRegistry,',
    '  defaultRegistry,',
    '  registerTransition,',
    '  resolveTransition,',
    '  getTransition,',
    "} from './core/registry';",
    '',
    '// Context & hooks',
    'export {',
    '  useGlide,',
    '  useTransitionConfig,',
    '  useAnimationState,',
    "} from './core/transition-context';",
    '',
    '// Animation engine',
    'export {',
    '  buildVariants,',
    '  buildTransition,',
    '  getWillChangeHint,',
    "} from './core/animation-engine';",
    '',
    '// Utilities',
    'export {',
    '  mergeConfig,',
    '  resolveEasing,',
    '  prefersReducedMotion,',
    '  getDirectionOffset,',
    "} from './core/utils';",
    '',
    '// Constants',
    'export {',
    '  DEFAULT_TRANSITION_CONFIG,',
    '  DEFAULT_TRANSITION_NAME,',
    '  EASING_MAP,',
    '  EASING_PRESETS,',
    '  Z_INDEX,',
    '  CATEGORY_LABELS,',
    "} from './constants';",
    '',
  ];

  if (language === 'ts') {
    lines.push(
      '// Types',
      'export type {',
      '  TransitionConfig,',
      '  TransitionMetadata,',
      '  TransitionDefinition,',
      '  TransitionVariants,',
      '  TransitionComponentProps,',
      '  TransitionPropSchema,',
      '  TransitionDirection,',
      '  TransitionCategory,',
      '  EasingPreset,',
      '  AnimationState,',
      '  GlideCNContextValue,',
      '  PageProps,',
      '  GlideCNProviderProps,',
      "} from './core/types';",
      '',
    );
  }

  lines.push('// Transitions', ...transitionExports, '');

  const indexFileName = language === 'js' ? 'index.js' : 'index.ts';
  await fs.writeFile(path.join(destDir, indexFileName), lines.join('\n'), 'utf-8');
}

// ---------------------------------------------------------------------------
// Adapter-Specific Exports
// ---------------------------------------------------------------------------

function getAdapterExportLines(adapter: string): string[] {
  switch (adapter) {
    case 'next-app':
      return [
        "export { GlideCNNextApp, FrozenRouter } from './adapters/next-app';",
      ];
    case 'next-pages':
      return [
        "export { GlideCNNextPages } from './adapters/next-pages';",
      ];
    case 'react-router':
      return [
        "export { GlideCNReactRouter } from './adapters/react-router';",
      ];
    case 'universal':
      return [
        "export { GlideCNUniversal } from './adapters/universal';",
      ];
    default:
      return [
        "export { GlideCNUniversal } from './adapters/universal';",
      ];
  }
}

async function generateAdapterIndex(
  adaptersDest: string,
  adapter: string,
  language: 'ts' | 'js' = 'ts',
): Promise<string> {
  const lines = getAdapterExportLines(adapter).map((line) =>
    line.replace("from './adapters/", "from './"),
  );
  const fileName = language === 'js' ? 'index.js' : 'index.ts';
  await fs.writeFile(
    path.join(adaptersDest, fileName),
    lines.join('\n') + '\n',
    'utf-8',
  );
  return fileName;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Update an existing barrel index.ts / index.js to add new transition exports.
 */
export async function appendTransitionExports(
  indexPath: string,
  newTransitions: string[],
): Promise<void> {
  let content = await fs.readFile(indexPath, 'utf-8');

  for (const name of newTransitions) {
    const camelName = kebabToCamel(name) + 'Transition';
    const exportLine = `export { ${camelName} } from './transitions/${name}';`;

    if (!content.includes(exportLine)) {
      // Add before the last empty line
      content = content.trimEnd() + '\n' + exportLine + '\n';
    }
  }

  await fs.writeFile(indexPath, content, 'utf-8');
}
