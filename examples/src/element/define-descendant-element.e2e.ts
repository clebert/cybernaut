import {browser, it, test} from 'cybernaut';

const searchForm = browser.defineElement('search-form', '#searchform');

const searchField = searchForm.defineDescendantElement(
  'search-field',
  '#lst-ib'
);

test('Example: element.defineDescendantElement()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.existence, it.should.equal(true));
});
