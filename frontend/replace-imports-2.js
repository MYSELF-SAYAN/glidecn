const fs = require('fs');

function replaceImports(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  if (!content.includes("import '@/components/morphy/transitions';")) {
    const newContent = content.replace(
      /import { DEFAULT_TRANSITION_CONFIG } from '@\/components\/morphy\/constants';\r?\n/,
      "import { DEFAULT_TRANSITION_CONFIG } from '@/components/morphy/constants';\n\n// Ensure all transitions are registered\nimport '@/components/morphy/transitions';\n"
    );
    fs.writeFileSync(filepath, newContent);
    console.log('Updated ' + filepath);
  }
}

function replaceImportsPage(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  if (!content.includes("import '@/components/morphy/transitions';")) {
    const newContent = content.replace(
      /import { Page } from '@\/components\/morphy';\r?\n/,
      "import { Page } from '@/components/morphy';\n\n// Ensure all transitions are registered\nimport '@/components/morphy/transitions';\n"
    );
    fs.writeFileSync(filepath, newContent);
    console.log('Updated ' + filepath);
  }
}

replaceImportsPage('app/docs/transitions/[slug]/page.tsx');
replaceImports('components/docs/transition-docs-shell.tsx');
replaceImports('components/docs/transition-showcase-page.tsx');
