# `utils.isChrome()`

## Type definition

```ts
function isChrome(config: SeleniumConfig): boolean;
```

## Example usage

```ts
import {browser, test, utils} from 'cybernaut';

test('Example: utils.isChrome()', async (t, config) => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  if (utils.isChrome(config)) {
    // Write your browser-specific code here.
  }
});
```
