import {browser, it, test} from '..';

test('Load "clebert/cybernaut" repository on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.match(/clebert\/cybernaut/));
});
