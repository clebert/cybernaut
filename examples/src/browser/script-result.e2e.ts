import {browser, it, test} from 'cybernaut';

test('Example: browser.scriptResult()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    browser.scriptResult('example', callback => {
      // This function will be executed in the browser context,
      // so any references to the outer scope won't work.

      callback('foo');
    }),
    it.should.equal('foo')
  );
});
