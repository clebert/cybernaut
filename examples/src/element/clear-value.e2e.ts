import {browser, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.clearValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(searchField.clearValue());
});
