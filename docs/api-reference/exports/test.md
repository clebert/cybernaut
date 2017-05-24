# Export: `test()`

Type definition:

* **`test(name: string, implementation?: Implementation): void`**
* `Implementation: (t: Test, config: Config) => Promise<void>`
* [`Test`](../interfaces/test.md)
* [`Config`](../../overview/configuring-cybernaut.md)

Example usage:

```js
const {test} = require('cybernaut');

// The following test will be marked as TODO.
test('Example 1');

// The following test will be executed.
test('Example 2', async (t, config) => {
  if (config.capabilities.browserName === 'chrome') {
    // ...
  } else {
    // ...
  }
});
```
