import {browser, it, test} from 'cybernaut';

test('Example: browser.elementCount()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.elementCount('#lst-ib'), it.should.equal(1));
});
