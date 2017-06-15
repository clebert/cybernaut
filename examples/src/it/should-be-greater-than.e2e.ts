import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].beGreaterThan()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.windowHeight, it.should.beGreaterThan(600));
  await t.assert(browser.windowHeight, it.should.not.beGreaterThan(700));
});
