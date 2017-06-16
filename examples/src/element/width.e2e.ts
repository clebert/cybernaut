import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.width', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.width, it.should.equal(403));
});
