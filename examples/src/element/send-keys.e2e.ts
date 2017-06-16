import {Key, browser, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.sendKeys()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(
    searchField.sendKeys('text was', Key.CONTROL, 'a', Key.NULL, 'now text is')
  );
});
