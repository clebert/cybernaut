# `element.height`

## Type definition

```ts
class SeleniumElement {
  readonly height: SeleniumAccessor<number>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.height', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.height, it.should.equal(34));
});
```

## Example output

```fundamental
Example: element.height
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the search-field element should equal 34
```
