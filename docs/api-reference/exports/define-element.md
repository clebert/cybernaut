# Export `defineElement`

Type definition:

* **`defineElement(selector: string, name: string = 'element'): Element`**
* [`Element`](../interfaces/element.md)

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.click());
});
```
