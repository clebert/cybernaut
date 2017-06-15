# `element.text`

## Type definition

```ts
class SeleniumElement {
  readonly text: SeleniumAccessor<string>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const leftFooterBar = browser.defineElement('left-footer-bar', '#fsl');

test('Example: element.text', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    leftFooterBar.text,
    it.should.equal('Advertising Business About')
  );
});
```

## Example output

```fundamental
Example: element.text
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The text of the left-footer-bar element should equal 'Advertising Business About'
```
