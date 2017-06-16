# `element.width`

## Type definition

```ts
class SeleniumElement {
  readonly width: SeleniumAccessor<number>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.width', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.width, it.should.equal(403));
});
```

## Example output

```fundamental
Example: element.width
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The width of the search-field element should equal 403
```
