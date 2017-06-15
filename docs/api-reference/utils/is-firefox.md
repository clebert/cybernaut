# `utils.isFirefox()`

## Type definition

```ts
function isFirefox(config: SeleniumConfig): boolean;
```

## Example usage

```ts
import {browser, test, utils} from 'cybernaut';

test('Example: utils.isFirefox()', async (t, config) => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  if (utils.isFirefox(config)) {
    // Write your browser-specific code here.
  }
});
```
