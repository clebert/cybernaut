# Export `it`

Type definition:

* **`it: {should: PredicateBuilder}`**
* [`PredicateBuilder`](../interfaces/predicate-builder.md)

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```
