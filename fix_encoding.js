const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public', 'dynamicDatas', 'caseStudyDetail');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
for (const file of files) {
  const filePath = path.join(dir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, text, 'utf8');
  console.log(`Converted: ${file}`);
}
