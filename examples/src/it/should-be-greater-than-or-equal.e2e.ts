import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beGreaterThanOrEqual()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beGreaterThanOrEqual(700));
  await t.assert(browser.windowHeight, it.should.not.beGreaterThanOrEqual(800));
});
