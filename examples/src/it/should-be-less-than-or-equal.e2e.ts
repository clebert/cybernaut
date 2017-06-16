import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beLessThanOrEqual()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beLessThanOrEqual(700));
  await t.assert(browser.windowHeight, it.should.not.beLessThanOrEqual(600));
});
