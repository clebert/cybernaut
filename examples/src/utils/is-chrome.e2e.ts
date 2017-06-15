import {browser, test, utils} from 'cybernaut';

test('Example: utils.isChrome()', async (t, config) => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  if (utils.isChrome(config)) {
    // Write your browser-specific code here.
  }
});
