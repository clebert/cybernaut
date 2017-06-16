# `element.click()`

## Type definition

```ts
class SeleniumElement {
  click(): SeleniumAction;
}
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

const searchButton = browser.defineElement('search-button', 'input[name=btnK]');

test('Example: element.click()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(searchButton.click());
});
```

## Example output

```fundamental
Example: element.click()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Click on the search-button element
```
