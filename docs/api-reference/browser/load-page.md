# `browser.loadPage()`

## Type definition

```ts
function loadPage(url: string): SeleniumAction;
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.loadPage()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));
});
```

## Example output

```fundamental
Example: browser.loadPage()
  ✓ Perform: Load the page at https://www.google.com/ncr
```
