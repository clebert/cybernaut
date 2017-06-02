# Export: `skip()`

Type definition:

* **`skip(name: string, implementation: SeleniumTest): void`**
* `SeleniumTest: (t: SeleniumTestContext, config: SeleniumConfig) => Promise<void>`
* [`SeleniumTestContext`](../interfaces/selenium-test-context.md)
* `SeleniumConfig: {capabilities: Capabilities, timeouts: Timeouts, retries: number, retryDelay: number}`
* `Capabilities: {browserName: string}`
* `Timeouts: {element: number, page: number, script: number}`

Example usage:

```js
const {skip} = require('cybernaut');

// The following test won't be executed and marked as SKIP.
skip('Example', async t => {
  // ...
});
```
