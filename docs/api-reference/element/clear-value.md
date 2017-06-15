# `element.clearValue()`

## Type definition

```ts
class SeleniumElement {
  clearValue(): SeleniumAction;
}
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.clearValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(searchField.clearValue());
});
```

## Example output

```fundamental
Example: element.clearValue()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Clear the value of the search-field element
```
