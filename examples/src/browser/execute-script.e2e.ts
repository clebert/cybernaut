import {browser, test} from 'cybernaut';

test('Example: browser.executeScript()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(
    browser.executeScript('example', callback => {
      // This function will be executed in the browser context,
      // so any references to the outer scope won't work.

      callback(); // Do not forget to call the callback function!
    })
  );
});
