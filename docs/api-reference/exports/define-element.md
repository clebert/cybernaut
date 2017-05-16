# Export `defineElement`

Type definition:

* **`defineElement(name: string, selector: string): Element`**
* [`Element`](../interfaces/element.md)

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('elementName', 'selector');

  await t.perform(element.click());
});
```
