import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.cssValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.cssValue('position'), it.should.equal('absolute'));
});
