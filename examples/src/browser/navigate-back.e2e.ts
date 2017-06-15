import {browser, test} from 'cybernaut';

test('Example: browser.navigateBack()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.navigateBack());
});
