// import {Element, browser, defineElement, it, test} from '../src';
import {Element, browser, defineElement, it, test} from 'cybernaut';

test('The gitbook should include the chapter "Starting Cybernaut"', async t => {
  await t.perform(browser.loadPage('https://cybernaut.js.org/'), 0);

  const summary = defineElement('div.book-summary', 'summary');

  if (await t.verify(summary.visibility, it.should.equal(false))) {
    const toggleSummaryButton = defineElement(
      'div.book-header > a:nth-child(1).js-toolbar-action',
      'toggle-summary-button'
    );

    await t.perform(toggleSummaryButton.click());

    await t.perform(browser.sleep(1000, 'an animation is running'));
  }

  const chapterLink = defineElement(
    'div.book-summary > nav > ul > li[data-level="1.2"].chapter',
    'chapter-link-1-2'
  );

  await t.perform(chapterLink.click());

  const textHeadline = defineElement('section > h1', 'headline');

  await t.assert(textHeadline.text, it.should.equal('Starting Cybernaut'));
});
