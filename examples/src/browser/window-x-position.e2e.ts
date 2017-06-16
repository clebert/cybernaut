import {browser, it, test} from 'cybernaut';

test('Example: browser.windowXPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowXPosition, it.should.equal(10));
});
