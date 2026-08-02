import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSITIONS_DIR = path.join(__dirname, '../components/morphy/transitions');

const comingSoonSlugs = [
  'shatter', 'tornado', 'swirl', 'twirl', 'kaleidoscope', 'mosaic', 'prism', 'laser', 
  'hologram', 'smoke', 'fire', 'ice', 'water', 'earth', 'wind', 'lightning', 'spark', 
  'star', 'planet', 'galaxy', 'universe', 'blackhole', 'wormhole2', 'time', 'space', 
  'dimension', 'reality', 'dream', 'nightmare', 'illusion'
];

comingSoonSlugs.forEach(slug => {
  const filePath = path.join(TRANSITIONS_DIR, `${slug}.tsx`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/category:\s*'cinematic'/, "category: 'experimental'");
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${slug}.tsx`);
  }
});
