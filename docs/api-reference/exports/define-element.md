# Export `defineElement`

Type definition:

* **`defineElement(name: string, selector: string, index: number = 0): Element`**
* [`Element`](../interfaces/element.md)

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('elementName', 'selector');

  await t.perform(element.click());
});
```

*Note: If the specified `selector` points to more than one element, then a specific element can be selected using the `index` parameter.*
