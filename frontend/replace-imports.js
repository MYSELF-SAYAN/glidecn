const fs = require('fs');

function replaceImports(filepath, isPage) {
  const content = fs.readFileSync(filepath, 'utf8');
  // We'll use regex to match all import '@/components/morphy/transitions/.*';
  const newContent = content.replace(/import '@\/components\/morphy\/transitions\/[^']*';\r?\n/g, '');
  
  // Now add the single import line after import { DEFAULT_TRANSITION_CONFIG } ...
  // or just near the top.
  let finalContent;
  if (isPage) {
    finalContent = newContent.replace(
      "import { Page } from '@/components/morphy';\r\n",
      "import { Page } from '@/components/morphy';\r\n\r\n// Ensure all transitions are registered\r\nimport '@/components/morphy/transitions';\r\n"
    );
  } else {
    finalContent = newContent.replace(
      "import { DEFAULT_TRANSITION_CONFIG } from '@/components/morphy/constants';\r\n",
      "import { DEFAULT_TRANSITION_CONFIG } from '@/components/morphy/constants';\r\n\r\n// Ensure all transitions are registered\r\nimport '@/components/morphy/transitions';\r\n"
    );
  }
  fs.writeFileSync(filepath, finalContent);
  console.log('Updated ' + filepath);
}

replaceImports('app/docs/transitions/[slug]/page.tsx', true);
replaceImports('components/docs/transition-docs-shell.tsx', false);
replaceImports('components/docs/transition-showcase-page.tsx', false);
