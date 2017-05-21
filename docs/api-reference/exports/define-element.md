# Export: `defineElement()`

Type definition:

* **`defineElement(name: string, selector: string, index: number = 0): Element`**
* [`Element`](../interfaces/element.md)

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.perform(element.click());
});
```

*Note: If the specified `selector` matches more than one element, an individual element can be selected using the `index` parameter.*
