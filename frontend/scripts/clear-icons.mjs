import fs from 'fs';

function clearIcons(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // replace icon: '...' with icon: ''
  content = content.replace(/icon:\s*'[^']*'/g, "icon: ''");
  fs.writeFileSync(filePath, content);
  console.log('Cleared icons in', filePath);
}

clearIcons('C:\\Users\\sayan\\Desktop\\PageFlow\\v1\\frontend\\components\\playground\\transition-studio.tsx');
