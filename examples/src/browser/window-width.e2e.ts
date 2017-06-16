import {browser, it, test} from 'cybernaut';

test('Example: browser.windowWidth', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowWidth, it.should.equal(1050));
});
