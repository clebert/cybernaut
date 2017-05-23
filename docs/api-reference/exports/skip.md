# Export: `skip()`

Type definition:

* **`skip(name: string, implementation: Implementation): void`**
* `Implementation: (t: Test) => Promise<void>`
* [`Test`](../interfaces/test.md)

Example usage:

```js
const {skip} = require('cybernaut');

// The following test won't be executed and marked as SKIP.
skip('Example', async t => {
  // ...
});
```
