const {JSDOM, ResourceLoader, VirtualConsole} = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
class Local extends ResourceLoader {
  fetch(url) { return Promise.resolve(fs.readFileSync(path.resolve(__dirname, '../docs', '.' + new URL(url).pathname))); }
}
(async () => {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(fs.readFileSync(path.resolve(__dirname, '../docs/index.html'), 'utf8'), {
    url: 'https://battle.test/', runScripts: 'dangerously', resources: new Local(), virtualConsole: vc,
    beforeParse(w) { w.confirm = () => true; w.alert = message => errors.push(message); }
  });
  await new Promise(resolve => dom.window.addEventListener('load', () => setTimeout(resolve, 100)));
  const w = dom.window, $ = w.$;
  assert.ok(w.BattleDesk);
  assert.equal(Object.keys(w.SETDEX_BW).length, 627);
  let count = 0;
  for (const sets of Object.values(w.SETDEX_BW)) {
    for (const [name, set] of Object.entries(sets)) {
      if (name.startsWith('Showdown BW - ')) {
        assert.equal(set.level, 50);
        assert.ok(set.moves.length > 0 && set.moves.length <= 4);
        count++;
      }
    }
  }
  assert.equal(count, 2103);
  for (const species of ['Ninetales', 'Charizard', 'Venusaur', 'Jolteon', 'Butterfree', 'Arbok', 'Lapras', 'Meganium']) {
    for (const name of Object.keys(w.setdex[species]).filter(n => n.startsWith('Showdown BW - '))) {
      $('#p2 input.set-selector').val(species + ' (' + name + ')').trigger('change');
      assert.equal(w.BattleDesk.getState().teams[1][0].name, species);
      assert.equal($('#p2 .level').val(), '50');
      assert.equal($('#p2 .nature').val(), w.setdex[species][name].nature);
      assert.ok(w.damageResults, species + ' damage results');
    }
  }
  for (const selector of ['.nature', '.ability', '.item', '.status']) {
    const control = w.document.querySelector('#p2 ' + selector);
    const option = control.querySelector('option');
    assert.equal(w.getComputedStyle(option).backgroundColor, 'rgb(16, 26, 41)');
    assert.equal(w.getComputedStyle(option).color, 'rgb(233, 239, 247)');
    control.focus();
    assert.equal(w.getComputedStyle(control).backgroundColor, 'rgb(16, 26, 41)');
    // jsdom reports the initial 'none' image as an empty string after shorthands.
    assert.ok(['', 'none'].includes(w.getComputedStyle(control).backgroundImage));
  }
  assert.deepEqual(errors, []);
  dom.window.close();
  console.log('PASS: 2103 BW presets; eight species selectable at level 50; native select/option contrast; no runtime errors.');
})().catch(e => {console.error(e); process.exit(1);});
