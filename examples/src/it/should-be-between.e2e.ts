import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beBetween()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beBetween(600, 800));
  await t.assert(browser.windowHeight, it.should.not.beBetween(400, 600));
});
