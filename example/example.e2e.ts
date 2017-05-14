// import {Element, browser, defineElement, it, test} from '../src';
import {Element, browser, defineElement, it, test} from 'cybernaut';

test('The gitbook should include the chapter "Starting Cybernaut"', async t => {
  await t.perform(browser.loadPage('https://cybernaut.js.org/'), {retries: 0});

  const summary = defineElement('summary', 'div.book-summary');

  if (await t.verify(summary.visibility, it.should.equal(false))) {
    const toggleSummaryButton = defineElement(
      'toggle-summary-button', 'a:nth-child(1).js-toolbar-action'
    );

    await t.perform(toggleSummaryButton.click());

    await t.perform(browser.sleep(1000, 'an animation is running'));
  }

  const chapterLink = defineElement(
    'chapter-link-1-2', 'li[data-level="1.2"].chapter'
  );

  await t.perform(chapterLink.click());

  const headline = defineElement('headline', 'section > h1');

  await t.assert(headline.text, it.should.equal('Starting Cybernaut'));
});
