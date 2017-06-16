# `browser.defineElement()`

## Type definition

```ts
function defineElement(name: string, selector: string, index?: number): SeleniumElement;
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: browser.defineElement()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.existence, it.should.equal(true));
});
```

## Example output

```fundamental
Example: browser.defineElement()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The existence of the search-field element should equal true
```

## Information

If the specified `selector` matches more than one element, an element other than the first one can be selected using the zero-based `index` parameter.
