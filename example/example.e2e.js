const {browser, defineElement, it, test} = require('cybernaut');

test('Star the "clebert/cybernaut" repository on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.contain('clebert/cybernaut'));

  await t.perform(browser.takeScreenshot());

  const switchToDesktopButton = defineElement('button.switch-to-desktop');

  // when on the mobile version, then switch to the desktop version
  if (await t.verify(switchToDesktopButton.visibility, it.should.equal(true))) {
    await t.perform(switchToDesktopButton.click());
  }

  const starButton = defineElement(
    'ul.pagehead-actions > li:nth-child(2) > a:nth-child(1)'
  );

  // the star button leads to a login form, so the project is not really starred
  await t.perform(starButton.click());
});
