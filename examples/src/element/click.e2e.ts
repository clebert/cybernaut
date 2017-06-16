import {browser, test} from 'cybernaut';

const searchButton = browser.defineElement('search-button', 'input[name=btnK]');

test('Example: element.click()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(searchButton.click());
});
