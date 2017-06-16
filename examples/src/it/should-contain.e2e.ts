import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].contain()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.contain('Goo'));
  await t.assert(browser.pageTitle, it.should.not.contain('Yah'));
});
