import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beLessThan()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beLessThan(800));
  await t.assert(browser.windowHeight, it.should.not.beLessThan(700));
});
