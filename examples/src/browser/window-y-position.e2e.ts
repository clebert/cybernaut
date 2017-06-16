import {browser, it, test} from 'cybernaut';

test('Example: browser.windowYPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowYPosition, it.should.equal(10));
});
