import {browser, it, test} from 'cybernaut';

test('Example: browser.windowHeight', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.equal(700));
});
