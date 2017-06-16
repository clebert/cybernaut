import {browser, test} from 'cybernaut';

test('Example: browser.reloadPage()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.reloadPage());
});
