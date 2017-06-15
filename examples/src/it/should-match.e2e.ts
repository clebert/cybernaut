import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].match()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.match(/Goo/));
  await t.assert(browser.pageTitle, it.should.not.match(/Yah/));
});
