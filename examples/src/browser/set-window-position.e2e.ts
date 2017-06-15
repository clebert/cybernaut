import {browser, test} from 'cybernaut';

test('Example: browser.setWindowPosition()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.setWindowPosition(22, 7));
});
