# `utils`

* [`utils.isChrome()`](#utilsischrome)
* [`utils.isFirefox()`](#utilsisfirefox)

## `utils.isChrome()`

### Type definition

```ts
function isChrome(config: SeleniumConfig): boolean;
```

### Example usage

```ts
import {browser, test, utils} from 'cybernaut';

test('Example: utils.isChrome()', async (t, config) => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  if (utils.isChrome(config)) {
    // Write your browser-specific code here.
  }
});
```

### Example output

```fundamental
Example: utils.isChrome()
  ✓ Perform: Load the page at https://www.google.com/ncr
```

## `utils.isFirefox()`

### Type definition

```ts
function isFirefox(config: SeleniumConfig): boolean;
```

### Example usage

```ts
import {browser, test, utils} from 'cybernaut';

test('Example: utils.isFirefox()', async (t, config) => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  if (utils.isFirefox(config)) {
    // Write your browser-specific code here.
  }
});
```

### Example output

```fundamental
Example: utils.isFirefox()
  ✓ Perform: Load the page at https://www.google.com/ncr
```
