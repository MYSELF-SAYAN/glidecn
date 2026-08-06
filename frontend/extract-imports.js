const fs = require('fs');
const content = fs.readFileSync('app/docs/transitions/[slug]/page.tsx', 'utf8');
const lines = content.split('\n');
const imports = lines.filter(line => line.includes("import '@/components/morphy/transitions/"));
fs.writeFileSync('components/morphy/transitions/index.ts', imports.join('\n'));
console.log('Created index.ts with', imports.length, 'imports');
