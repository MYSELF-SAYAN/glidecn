import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATALOG_PATH = path.join(__dirname, '../lib/transition-catalog.ts');
let content = fs.readFileSync(CATALOG_PATH, 'utf-8');
content = content.replace(/status:\s*'ready'/g, "status: 'done'");
fs.writeFileSync(CATALOG_PATH, content, 'utf-8');
console.log('Fixed catalog status type error');
