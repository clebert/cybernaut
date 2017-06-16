# `element.xPosition`

## Type definition

```ts
class SeleniumElement {
  readonly xPosition: SeleniumAccessor<number>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.xPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.xPosition, it.should.equal(297.5));
});
```

## Example output

```fundamental
Example: element.xPosition
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The X position of the search-field element should equal 297.5
```
