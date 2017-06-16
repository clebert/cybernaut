# `element.descendantElementCount()`

## Type definition

```ts
class SeleniumElement {
  descendantElementCount(selector: string): SeleniumAccessor<number>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchForm = browser.defineElement('search-form', '#searchform');

test('Example: element.descendantElementCount()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    searchForm.descendantElementCount('#lst-ib'),
    it.should.equal(1)
  );
});
```

## Example output

```fundamental
Example: element.descendantElementCount()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The count of matching descendant elements of the search-form element for the specified selector (#lst-ib) should equal 1
```
