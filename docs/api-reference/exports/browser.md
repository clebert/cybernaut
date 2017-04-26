# Export `browser`

Type definition:

* **`browser: Browser`**
* [`Browser`](../interfaces/browser.md)

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz'));
});
```
