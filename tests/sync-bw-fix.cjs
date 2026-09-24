// Publish the two changed assets without rebuilding the unchanged damage engine.
const fs = require('node:fs');
const crypto = require('node:crypto');
for (const asset of ['js/data/sets/gen5.js', 'css/battle-desk.css']) {
  const source = fs.readFileSync('src/' + asset, 'utf8');
  const hash = crypto.createHash('sha256').update(source).digest('hex').slice(0, 12);
  for (const folder of ['dist', 'docs']) {
    fs.writeFileSync(folder + '/' + asset, source);
    for (const filename of fs.readdirSync(folder).filter(f => f.endsWith('.html'))) {
      const path = folder + '/' + filename;
      const html = fs.readFileSync(path, 'utf8');
      const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      fs.writeFileSync(path, html.replace(new RegExp('(\\./' + escaped + ')(?:\\?[^"\\s]*)?(?=")', 'g'), '$1?v=' + hash));
    }
  }
}
