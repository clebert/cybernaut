// import {browser, defineElement, it, test} from '../src';
import {browser, defineElement, it, test} from 'cybernaut';

test('This is an end-to-end test example', async t => {
  await t.perform(browser.loadPage('http://example.com/'), {retries: 0});

  await t.assert(browser.pageTitle, it.should.equal('Example Domain'));

  const moreInformationLink = defineElement('more-information-link', 'a');

  await t.perform(moreInformationLink.click());

  await t.assert(browser.pageTitle, it.should.contain('IANA'));
});
