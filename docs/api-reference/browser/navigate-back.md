# `browser.navigateBack()`

## Type definition

```ts
function navigateBack(): SeleniumAction;
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.navigateBack()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.navigateBack());
});
```

## Example output

```fundamental
Example: browser.navigateBack()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Navigate back
```
