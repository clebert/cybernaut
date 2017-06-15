import {browser, it, test} from 'cybernaut';

const leftFooterBar = browser.defineElement('left-footer-bar', '#fsl');

test('Example: element.text', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    leftFooterBar.text,
    it.should.equal('Advertising Business About')
  );
});
