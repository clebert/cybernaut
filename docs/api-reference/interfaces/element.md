# Interface `Element`

## Methods

* [`tagName`](#method-tagname)
* [`text`](#method-text)
* [`visibility`](#method-visibility)
* [`x`](#method-x)
* [`y`](#method-y)
* [`width`](#method-width)
* [`height`](#method-height)
* [`cssValue`](#method-cssvalue)
* [`propertyValue`](#method-propertyvalue)
* [`clearValue`](#method-clearvalue)
* [`click`](#method-click)
* [`sendKeys`](#method-sendkeys)
* [`submitForm`](#method-submitform)

### Method `tagName`

Type definition:

* **`tagName: Accessor<string>`**

Example TAP output: `ok 1 - tag name of element '#bar' should equal 'div' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.tagName, it.should.equal('div'));
});
```

### Method `text`

Type definition:

* **`text: Accessor<string>`**

Example TAP output: `ok 1 - text of element '#bar' should equal 'baz' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.text, it.should.equal('baz'));
});
```

### Method `visibility`

Type definition:

* **`visibility: Accessor<boolean>`**

Example TAP output: `ok 1 - visibility of element '#bar' should equal true (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.visibility, it.should.equal(true));
});
```

### Method `x`

Type definition:

* **`x: Accessor<number>`**

Example TAP output: `ok 1 - x-position of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.x, it.should.equal(123));
});
```

### Method `y`

Type definition:

* **`y: Accessor<number>`**

Example TAP output: `ok 1 - y-position of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.y, it.should.equal(123));
});
```

### Method `width`

Type definition:

* **`width: Accessor<number>`**

Example TAP output: `ok 1 - width of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.width, it.should.equal(123));
});
```

### Method `height`

Type definition:

* **`height: Accessor<number>`**

Example TAP output: `ok 1 - height of element '#bar' should equal 123 (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.height, it.should.equal(123));
});
```

### Method `cssValue`

Type definition:

* **`cssValue(cssName: string): Accessor<string>`**

Example TAP output: `ok 1 - css value 'margin-left' of element '#bar' should equal '22px' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.cssValue('margin-left'), it.should.equal('22px'));
});
```

### Method `propertyValue`

Type definition:

* **`propertyValue(propertyName: string): Accessor<string | null>`**

Example TAP output: `ok 1 - property value 'id' of element '#bar' should equal 'bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, it, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.assert(bar.propertyValue('id'), it.should.equal('bar'));
});
```

### Method `clearValue`

Type definition:

* **`clearValue(): Action`**

Example TAP output: `ok 1 - clear value of element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.clearValue());
});
```

### Method `click`

Type definition:

* **`click(): Action`**

Example TAP output: `ok 1 - click on element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.click());
});
```

### Method `sendKeys`

Type definition:

* **`sendKeys(...keys: string[]): Action`**

Example TAP output: `ok 1 - send keys [ 'text was', 'Key.CONTROL', 'a', 'Key.NULL', 'now text is' ] to element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {Key, defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.sendKeys('text was', Key.CONTROL, 'a', Key.NULL, 'now text is'));
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

*Note: The `WebElement` of `selenium-webdriver` is used internally, but is not accessible from the outside.*

### Method `submitForm`

Type definition:

* **`submitForm(): Action`**

Example TAP output: `ok 1 - submit form containing element '#bar' (attempt 1 of 5)`

Example usage:

```js
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.submitForm());
});
```

[webdriver-key]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
[webdriver-webelement]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html
