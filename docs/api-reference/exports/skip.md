# Export: `skip()`

Type definition:

* **`skip(name: string, implementation: Implementation): void`**
* `Implementation: (t: Test<WebDriver>, config: Config) => Promise<void>`
* [`Test`](../interfaces/test.md)
* [`Config`](../../overview/configuring-cybernaut.md)

Example usage:

```js
const {skip} = require('cybernaut');

// The following test won't be executed and marked as SKIP.
skip('Example', async t => {
  // ...
});
```
