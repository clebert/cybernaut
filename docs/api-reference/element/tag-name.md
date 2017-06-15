# `element.tagName`

## Type definition

```ts
class SeleniumElement {
  readonly tagName: SeleniumAccessor<string>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.tagName', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.tagName, it.should.equal('input'));
});
```

## Example output

```fundamental
Example: element.tagName
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The tag name of the search-field element should equal 'input'
```
