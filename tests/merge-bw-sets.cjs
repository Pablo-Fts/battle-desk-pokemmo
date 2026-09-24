// Usage: node tests/merge-bw-sets.cjs /path/to/upstream/gen5.js
// Preserve PokeMMO presets; label all supplemental Smogon BW presets explicitly.
const fs = require('node:fs');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const parse = text => JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
const file = 'src/js/data/sets/gen5.js';
const original = parse(fs.readFileSync(file, 'utf8'));
const source = fs.readFileSync(process.argv[2], 'utf8');
const upstream = parse(source);
const merged = JSON.parse(JSON.stringify(original));
let added = 0;
for (const [species, sets] of Object.entries(upstream)) {
  merged[species] ||= {};
  for (const [name, preset] of Object.entries(sets)) {
    const label = 'Showdown BW - ' + name;
    if (!merged[species][label]) added++;
    merged[species][label] = {...preset, level: 50};
  }
}
for (const [species, sets] of Object.entries(original)) {
  for (const [name, preset] of Object.entries(sets)) {
    if (!name.startsWith('Showdown BW - ')) assert.deepEqual(merged[species][name], preset);
  }
}
for (const species of ['Ninetales', 'Charizard', 'Venusaur', 'Jolteon']) {
  assert.ok(Object.keys(merged[species]).length);
}
fs.writeFileSync(file, 'var SETDEX_BW = ' + JSON.stringify(merged, null, 2) + ';\n');
console.log(JSON.stringify({originalSpecies: Object.keys(original).length, upstreamSpecies: Object.keys(upstream).length, totalSpecies: Object.keys(merged).length, added, sha256: crypto.createHash('sha256').update(source).digest('hex')}));
