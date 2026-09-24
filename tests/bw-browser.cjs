const {chromium} = require('playwright');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({headless: true});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('https://battle.test/**', route => {
      const pathname = new URL(route.request().url()).pathname;
      return route.fulfill({path: path.resolve(__dirname, '../docs', '.' + (pathname === '/' ? '/index.html' : pathname))});
    });
    await page.goto('https://battle.test/');
    await page.waitForFunction(() => window.BattleDesk);
    const result = await page.evaluate(() => {
      const species = ['Ninetales', 'Charizard', 'Venusaur', 'Jolteon', 'Butterfree', 'Arbok', 'Lapras', 'Meganium'];
      let selected = 0;
      for (const name of species) {
        for (const preset of Object.keys(setdex[name]).filter(s => s.startsWith('Showdown BW - '))) {
          $('#p2 input.set-selector').val(name + ' (' + preset + ')').trigger('change');
          if (BattleDesk.getState().teams[1][0].name !== name || $('#p2 .level').val() !== '50') throw Error(name + ': selection failed');
          selected++;
        }
      }
      return {selected, styles: ['.nature', '.ability', '.item', '.status'].map(selector => {
        const el = document.querySelector('#p2 ' + selector);
        el.focus();
        const style = getComputedStyle(el), option = getComputedStyle(el.querySelector('option'));
        return {background: style.backgroundColor, image: style.backgroundImage, option: option.backgroundColor, text: option.color};
      })};
    });
    for (const style of result.styles) assert.deepEqual(style, {background:'rgb(16, 26, 41)',image:'none',option:'rgb(16, 26, 41)',text:'rgb(233, 239, 247)'});
    assert.deepEqual(errors, []);
    console.log('PASS Chromium:', JSON.stringify(result));
  } finally { await browser.close(); }
})().catch(e => {console.error(e); process.exit(1);});
