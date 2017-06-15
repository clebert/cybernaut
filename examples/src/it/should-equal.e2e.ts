import {browser, it, test} from 'cybernaut';

test('Example: it.should[.not].equal()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.pageTitle, it.should.equal('Google'));
  await t.assert(browser.pageTitle, it.should.not.equal('Yahoo'));
});
