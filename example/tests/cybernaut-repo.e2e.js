const {browser, defineElement, it, test} = require('cybernaut');

test('Star repository "clebert/cybernaut" on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.contain('clebert/cybernaut'));

  const starButton = defineElement('ul.pagehead-actions > li:nth-child(2) > a:nth-child(1)');

  await t.perform(starButton.click());
});
