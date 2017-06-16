# `element.visibility`

## Type definition

```ts
class SeleniumElement {
  readonly visibility: SeleniumAccessor<boolean>;
}
```

## Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.visibility', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.visibility, it.should.equal(true));
});
```

## Example output

```fundamental
Example: element.visibility
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The visibility of the search-field element should equal true
```

## Information

The result of this accessor is a simplified [approximation][element-displayed] of the element's visibility.

[element-displayed]: https://w3c.github.io/webdriver/webdriver-spec.html#dfn-element-displayed
