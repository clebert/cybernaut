import {browser, it, test} from 'cybernaut';

const searchForm = browser.defineElement('search-form', '#searchform');

test('Example: element.descendantElementCount()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    searchForm.descendantElementCount('#lst-ib'),
    it.should.equal(1)
  );
});
