# `browser.navigateForward()`

## Type definition

```ts
function navigateForward(): SeleniumAction;
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.navigateForward()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.navigateForward());
});
```

## Example output

```fundamental
Example: browser.navigateForward()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Navigate forward
```
