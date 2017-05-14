# Export `defineElement`

Type definition:

* **`defineElement(name: string, selector: string): Element`**
* [`Element`](../interfaces/element.md)

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const barButton = defineElement('bar-button', '#bar');

  await t.perform(barButton.click());
});
```
