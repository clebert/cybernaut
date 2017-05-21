# Interface: `Element`

## Factory methods

* [`defineDescendantElement()`](#factory-method-definedescendantelement)

## Accessor properties

* [`existence`](#accessor-property-existence)
* [`visibility`](#accessor-property-visibility)
* [`tagName`](#accessor-property-tagname)
* [`text`](#accessor-property-text)
* [`xPosition`](#accessor-property-xposition)
* [`yPosition`](#accessor-property-yposition)
* [`width`](#accessor-property-width)
* [`height`](#accessor-property-height)

## Accessor methods

* [`attributeValue()`](#accessor-method-attributevalue)
* [`cssValue()`](#accessor-method-cssvalue)
* [`descendantElementCount()`](#accessor-method-descendantelementcount)

## Action methods

* [`clearValue()`](#action-method-clearvalue)
* [`click()`](#action-method-click)
* [`sendKeys()`](#action-method-sendkeys)
* [`submitForm()`](#action-method-submitform)

### Factory method: `defineDescendantElement()`

Type definition:

* **`defineDescendantElement(name: string, selector: string, index: number = 0): Element`**

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');
  const descendantElement = element.defineDescendantElement('name', 'selector');

  await t.perform(descendantElement.click());
});
```

### Accessor property: `existence`

> The existence of the element

Type definition:

* **`existence: Accessor<boolean>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.existence, it.should.equal(true));
});
```

### Accessor property: `visibility`

> The visibility of the element

Type definition:

* **`visibility: Accessor<boolean>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.visibility, it.should.equal(true));
});
```

*Note: The value of this property is a simplified [approximation][element-displayed] of the element's visibility.*

### Accessor property: `tagName`

> The tag name of the element

Type definition:

* **`tagName: Accessor<string>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.tagName, it.should.equal('tagName'));
});
```

### Accessor property: `text`

> The text of the element

Type definition:

* **`text: Accessor<string>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.text, it.should.equal('text'));
});
```

### Accessor property: `xPosition`

> The X position of the element

Type definition:

* **`xPosition: Accessor<number>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.xPosition, it.should.equal(123));
});
```

### Accessor property: `yPosition`

> The Y position of the element

Type definition:

* **`yPosition: Accessor<number>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.yPosition, it.should.equal(123));
});
```

### Accessor property: `width`

> The width of the element

Type definition:

* **`width: Accessor<number>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.width, it.should.equal(123));
});
```

### Accessor property: `height`

> The height of the element

Type definition:

* **`height: Accessor<number>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.height, it.should.equal(123));
});
```

### Accessor method: `attributeValue()`

> The value of the {attributeName} attribute of the element`

Type definition:

* **`attributeValue(attributeName: string): Accessor<string | null>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.attributeValue('id'), it.should.equal('id'));
});
```

### Accessor method: `cssValue()`

> The value of the {cssName} css of the element

Type definition:

* **`cssValue(cssName: string): Accessor<string>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.cssValue('margin-left'), it.should.equal('22px'));
});
```

### Accessor method: `descendantElementCount()`

> The count of matching descendant elements for the specified selector ({selector})

Type definition:

* **`descendantElementCount(selector: string): Accessor<number>`**

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.assert(element.descendantElementCount('selector'), it.should.beGreaterThan(0));
});
```

### Action method: `clearValue()`

> Clear the value of the element

Type definition:

* **`clearValue(): Action`**

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.perform(element.clearValue());
});
```

### Action method: `click()`

> Click on the element

Type definition:

* **`click(): Action`**

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.perform(element.click());
});
```

### Action method: `sendKeys()`

> Send the specified keys ({keys}) to the element

Type definition:

* **`sendKeys(...keys: string[]): Action`**

Example usage:

```js
const {Key, defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.perform(element.sendKeys('text was', Key.CONTROL, 'a', Key.NULL, 'now text is'));
});
```

> Modifier keys ([Key.SHIFT][webdriver-key], [Key.CONTROL][webdriver-key], [Key.ALT][webdriver-key], [Key.META][webdriver-key]) are stateful; once a modifier is processed in the keysequence, that key state is toggled until one of the following occurs:
>
> - The modifier key is encountered again in the sequence. At this point the state of the key is toggled (along with the appropriate keyup/down events).
>
> - The [Key.NULL][webdriver-key] key is encountered in the sequence. When this key is encountered, all modifier keys current in the down state are released (with accompanying keyup events).
>
> - The end of the keysequence is encountered. When there are no more keys to type, all depressed modifier keys are released (with accompanying keyup events).
>
> — *[selenium-webdriver.WebElement][webdriver-webelement]*

*Note: The `WebElement` of selenium-webdriver is used internally, but is not accessible from the outside.*

### Action method: `submitForm()`

> Submit the form containing the element

Type definition:

* **`submitForm(): Action`**

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('Example', async t => {
  const element = defineElement('name', 'selector');

  await t.perform(element.submitForm());
});
```

[element-displayed]: https://w3c.github.io/webdriver/webdriver-spec.html#dfn-element-displayed
[webdriver-key]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
[webdriver-webelement]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html
