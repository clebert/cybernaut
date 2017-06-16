import {browser, it, test} from 'cybernaut';

test('Example: browser.pageTitle', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.equal('Google'));
});
