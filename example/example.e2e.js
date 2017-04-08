const {browser, defineElement, it, test} = require('cybernaut');

test('Star the "clebert/cybernaut" repository on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.contain('clebert123/cybernaut'));

  await t.perform(browser.takeScreenshot());

  // The "star" button leads to a login form.
  // Thus, the project is not really starred ;)
  const starButton = defineElement(
    'ul.pagehead-actions > li:nth-child(2) > a:nth-child(1)'
  );

  await t.perform(starButton.click());
});
