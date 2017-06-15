import {browser, it, test} from 'cybernaut';

test('Example: browser.pageUrl', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageUrl, it.should.equal('https://www.google.com/'));
});
