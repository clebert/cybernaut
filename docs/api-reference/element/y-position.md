# `element.yPosition`

## Type definition

```ts
class SeleniumElement {
  readonly yPosition: SeleniumAccessor<number>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.yPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.yPosition, it.should.equal(323));
});
```

## Example output

```fundamental
Example: element.yPosition
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The Y position of the search-field element should equal 323
```
