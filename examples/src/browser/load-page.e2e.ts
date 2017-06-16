import {browser, test} from 'cybernaut';

test('Example: browser.loadPage()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));
});
