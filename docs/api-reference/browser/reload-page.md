# `browser.reloadPage()`

## Type definition

```ts
function reloadPage(): SeleniumAction;
```

## Example usage

```ts
import {browser, test} from 'cybernaut';

test('Example: browser.reloadPage()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(browser.reloadPage());
});
```

## Example output

```fundamental
Example: browser.reloadPage()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Reload the page
```
