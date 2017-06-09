import {browser, defineElement, it, test} from 'cybernaut';

test('This is an example test', async t => {
  await t.perform(browser.loadPage('http://example.com/'), {retries: 0});

  await t.assert(browser.pageTitle, it.should.equal('Example Domain'));

  const moreInformationLink = defineElement('moreInformationLink', 'a');

  await t.perform(moreInformationLink.click());

  await t.assert(browser.pageTitle, it.should.contain('IANA'));
});
