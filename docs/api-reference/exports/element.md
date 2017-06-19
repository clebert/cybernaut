# `element`

* [`element.attributeValue()`](#elementattributevalue)
* [`element.clearValue()`](#elementclearvalue)
* [`element.click()`](#elementclick)
* [`element.cssValue()`](#elementcssvalue)
* [`element.defineDescendantElement()`](#elementdefinedescendantelement)
* [`element.descendantElementCount()`](#elementdescendantelementcount)
* [`element.existence`](#elementexistence)
* [`element.height`](#elementheight)
* [`element.sendKeys()`](#elementsendkeys)
* [`element.tagName`](#elementtagname)
* [`element.text`](#elementtext)
* [`element.visibility`](#elementvisibility)
* [`element.width`](#elementwidth)
* [`element.xPosition`](#elementxposition)
* [`element.yPosition`](#elementyposition)

## `element.attributeValue()`

### Type definition

```ts
class SeleniumElement {
  attributeValue(attributeName: string): SeleniumAccessor<string | null>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.attributeValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.attributeValue('id'), it.should.equal('lst-ib'));
});
```

### Example output

```fundamental
Example: element.attributeValue()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The value of the id attribute of the search-field element should equal 'lst-ib'
```

## `element.clearValue()`

### Type definition

```ts
class SeleniumElement {
  clearValue(): SeleniumAction;
}
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.clearValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(searchField.clearValue());
});
```

### Example output

```fundamental
Example: element.clearValue()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Clear the value of the search-field element
```

## `element.click()`

### Type definition

```ts
class SeleniumElement {
  click(): SeleniumAction;
}
```

### Example usage

```ts
import {browser, test} from 'cybernaut';

const searchButton = browser.defineElement('search-button', 'input[name=btnK]');

test('Example: element.click()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(searchButton.click());
});
```

### Example output

```fundamental
Example: element.click()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Click on the search-button element
```

## `element.cssValue()`

### Type definition

```ts
class SeleniumElement {
  cssValue(cssName: string): SeleniumAccessor<string>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.cssValue()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.cssValue('position'), it.should.equal('absolute'));
});
```

### Example output

```fundamental
Example: element.cssValue()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The value of the position css of the search-field element should equal 'absolute'
```

## `element.defineDescendantElement()`

### Type definition

```ts
class SeleniumElement {
  defineDescendantElement(name: string, selector: string, index?: number): SeleniumElement;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchForm = browser.defineElement('search-form', '#searchform');

const searchField = searchForm.defineDescendantElement(
  'search-field',
  '#lst-ib'
);

test('Example: element.defineDescendantElement()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.existence, it.should.equal(true));
});
```

### Example output

```fundamental
Example: element.defineDescendantElement()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The existence of the search-form:search-field element should equal true
```

### Information

If the specified `selector` matches more than one element, an element other than the first one can be selected using the zero-based `index` parameter.

## `element.descendantElementCount()`

### Type definition

```ts
class SeleniumElement {
  descendantElementCount(selector: string): SeleniumAccessor<number>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchForm = browser.defineElement('search-form', '#searchform');

test('Example: element.descendantElementCount()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    searchForm.descendantElementCount('#lst-ib'),
    it.should.equal(1)
  );
});
```

### Example output

```fundamental
Example: element.descendantElementCount()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The count of matching descendant elements of the search-form element for the specified selector (#lst-ib) should equal 1
```

## `element.existence`

### Type definition

```ts
class SeleniumElement {
  readonly existence: SeleniumAccessor<boolean>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.existence', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.existence, it.should.equal(true));
});
```

### Example output

```fundamental
Example: element.existence
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The existence of the search-field element should equal true
```

## `element.height`

### Type definition

```ts
class SeleniumElement {
  readonly height: SeleniumAccessor<number>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.height', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.height, it.should.equal(34));
});
```

### Example output

```fundamental
Example: element.height
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The height of the search-field element should equal 34
```

## `element.sendKeys()`

### Type definition

```ts
class SeleniumElement {
  sendKeys(...keys: string[]): SeleniumAction;
}
```

### Example usage

```ts
import {Key, browser, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.sendKeys()', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.perform(
    searchField.sendKeys('text was', Key.CONTROL, 'a', Key.NULL, 'now text is')
  );
});
```

### Example output

```fundamental
Example: element.sendKeys()
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Perform: Send the specified keys ('text was', Key.CONTROL, 'a', Key.NULL, 'now text is') to the search-field element
```

### Information

> Modifier keys ([Key.SHIFT][webdriver-key], [Key.CONTROL][webdriver-key], [Key.ALT][webdriver-key], [Key.META][webdriver-key]) are stateful; once a modifier is processed in the keysequence, that key state is toggled until one of the following occurs:
>
> * The modifier key is encountered again in the sequence. At this point the state of the key is toggled (along with the appropriate keyup/down events).
>
> * The [Key.NULL][webdriver-key] key is encountered in the sequence. When this key is encountered, all modifier keys current in the down state are released (with accompanying keyup events).
>
> * The end of the keysequence is encountered. When there are no more keys to type, all depressed modifier keys are released (with accompanying keyup events).
>
> — *[selenium-webdriver.WebElement][webdriver-webelement]*

*Note: The `WebElement` of selenium-webdriver is used internally, but is not accessible from the outside.*

### Known issues

* This feature [does not work][geckodriver-issue-683] in Firefox with the current version (3.4.0) of selenium-webdriver.

[geckodriver-issue-683]: https://github.com/mozilla/geckodriver/issues/683
[webdriver-key]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
[webdriver-webelement]: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html

## `element.tagName`

### Type definition

```ts
class SeleniumElement {
  readonly tagName: SeleniumAccessor<string>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.tagName', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.tagName, it.should.equal('input'));
});
```

### Example output

```fundamental
Example: element.tagName
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The tag name of the search-field element should equal 'input'
```

## `element.text`

### Type definition

```ts
class SeleniumElement {
  readonly text: SeleniumAccessor<string>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const leftFooterBar = browser.defineElement('left-footer-bar', '#fsl');

test('Example: element.text', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(
    leftFooterBar.text,
    it.should.equal('Advertising Business About')
  );
});
```

### Example output

```fundamental
Example: element.text
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The text of the left-footer-bar element should equal 'Advertising Business About'
```

## `element.visibility`

### Type definition

```ts
class SeleniumElement {
  readonly visibility: SeleniumAccessor<boolean>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.visibility', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.visibility, it.should.equal(true));
});
```

### Example output

```fundamental
Example: element.visibility
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The visibility of the search-field element should equal true
```

### Information

The result of this accessor is a simplified [approximation][element-displayed] of the element's visibility.

[element-displayed]: https://w3c.github.io/webdriver/webdriver-spec.html#dfn-element-displayed

## `element.width`

### Type definition

```ts
class SeleniumElement {
  readonly width: SeleniumAccessor<number>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.width', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.width, it.should.equal(403));
});
```

### Example output

```fundamental
Example: element.width
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The width of the search-field element should equal 403
```

## `element.xPosition`

### Type definition

```ts
class SeleniumElement {
  readonly xPosition: SeleniumAccessor<number>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.xPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.xPosition, it.should.equal(297.5));
});
```

### Example output

```fundamental
Example: element.xPosition
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The X position of the search-field element should equal 297.5
```

## `element.yPosition`

### Type definition

```ts
class SeleniumElement {
  readonly yPosition: SeleniumAccessor<number>;
}
```

### Example usage

```ts
import {browser, it, test} from 'cybernaut';

const searchField = browser.defineElement('search-field', '#lst-ib');

test('Example: element.yPosition', async t => {
  await t.perform(browser.loadPage('https://www.google.com/ncr'));

  await t.assert(searchField.yPosition, it.should.equal(323));
});
```

### Example output

```fundamental
Example: element.yPosition
  ✓ Perform: Load the page at https://www.google.com/ncr
  ✓ Assert: The Y position of the search-field element should equal 323
```
