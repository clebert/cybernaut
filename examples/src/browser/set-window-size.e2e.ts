import {browser, test} from 'cybernaut';

test('Example: browser.setWindowSize()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.setWindowSize(640, 480));
});
