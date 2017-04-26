# Export `test`

Type definition:

* **`test(name: string, implementation?: Implementation): void`**
* `Implementation = (t: Test) => Promise<void>`
* [`Test`](../interfaces/test.md)

Example usage:

```js
const {test} = require('cybernaut');

// This end-to-end test will be marked as TODO
test('foo');

// This end-to-end test will be executed
test('foo', async t => {
  // ...
});
```
