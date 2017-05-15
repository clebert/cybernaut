// import {browser, defineElement, it, test} from '../src';
import {browser, defineElement, it, test} from 'cybernaut';

test('The gitbook should include the chapter "Starting Cybernaut"', async t => {
  await t.perform(browser.loadPage('https://cybernaut.js.org/'), {retries: 0});

  const bookBody = defineElement('book-body', '.book-body');

  if (!(await t.verify(
    bookBody.cssValue('position'), it.should.equal('absolute')
  ))) {
    await t.perform(browser.reloadPage(), {retries: 0});
  }

  const chapterLink = defineElement(
    'chapter-link-1-2', 'li[data-level="1.2"].chapter'
  );

  if (!(await t.verify(chapterLink.visibility, it.should.equal(true)))) {
    const toggleSummaryButton = defineElement(
      'toggle-summary-button', 'a:nth-child(1).js-toolbar-action'
    );

    await t.perform(toggleSummaryButton.click());

    await t.perform(browser.sleep(1000, 'an animation is running'));
  }

  await t.perform(chapterLink.click());

  const headline = defineElement('headline', 'section > h1');

  await t.assert(headline.text, it.should.equal('Starting Cybernaut'));
});
