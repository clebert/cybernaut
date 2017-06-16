# `element.cssValue()`

## Type definition

```ts
class SeleniumElement {
  cssValue(cssName: string): SeleniumAccessor<string>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.cssValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.cssValue('position'), it.should.equal('absolute'));
});
```

## Example output

```fundamental
Example: element.cssValue()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The value of the position css of the search-field element should equal 'absolute'
```
