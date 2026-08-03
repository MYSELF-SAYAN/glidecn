import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceEmojisInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'dist') {
        replaceEmojisInDir(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const emojiRegex = /\p{Emoji_Presentation}/gu;
      if (emojiRegex.test(content)) {
        content = content.replace(emojiRegex, '');
        fs.writeFileSync(fullPath, content);
        console.log('Removed emojis in', fullPath);
      }
    }
  }
}

replaceEmojisInDir(path.join(__dirname, '..', 'app'));
replaceEmojisInDir(path.join(__dirname, '..', 'components'));
replaceEmojisInDir(path.join(__dirname, '..', 'lib'));
console.log('Done');
