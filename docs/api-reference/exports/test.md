# Export: `test()`

Type definition:

* **`test(name: string, implementation?: SeleniumTest): void`**
* `SeleniumTest: (t: SeleniumTestContext, config: SeleniumConfig) => Promise<void>`
* [`SeleniumTestContext`](../interfaces/selenium-test-context.md)
* `SeleniumConfig: {capabilities: Capabilities, timeouts: Timeouts, retries: number, retryDelay: number}`
* `Capabilities: {browserName: string}`
* `Timeouts: {element: number, page: number, script: number}`

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
