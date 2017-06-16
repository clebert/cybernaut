# `element.attributeValue()`

## Type definition

```ts
class SeleniumElement {
  attributeValue(attributeName: string): SeleniumAccessor<string | null>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.attributeValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.attributeValue('id'), it.should.equal('lst-ib'));
});
```

## Example output

```fundamental
Example: element.attributeValue()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The value of the id attribute of the search-field element should equal 'lst-ib'
```
