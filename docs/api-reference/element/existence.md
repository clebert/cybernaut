# `element.existence`

## Type definition

```ts
class SeleniumElement {
  readonly existence: SeleniumAccessor<boolean>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.existence', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.existence, it.should.equal(true));
});
```

## Example output

```fundamental
Example: element.existence
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The existence of the search-field element should equal true
```
