# `browser.elementCount()`

## Type definition

```ts
function elementCount(selector: string): SeleniumAccessor<number>;
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

test('Example: browser.elementCount()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(browser.elementCount('#lst-ib'), it.should.equal(1));
});
```

## Example output

```fundamental
Example: browser.elementCount()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The count of matching elements for the specified selector (#lst-ib) should equal 1
```
