# Export `skip`

Type definition:

* **`skip(name: string, implementation: Implementation): void`**
* `Implementation = (t: Test) => Promise<void>`
* [`Test`](../interfaces/test.md)

Example usage:

```js
const {skip} = require('cybernaut');

// This end-to-end test won't be executed (and marked as SKIP)
skip('foo', async t => {
  // ...
});
```
