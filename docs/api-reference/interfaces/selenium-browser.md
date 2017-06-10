# Interface: `SeleniumBrowser`

## Accessor properties

* [`pageTitle`](#accessor-property-pagetitle)
* [`pageUrl`](#accessor-property-pageurl)
* [`windowXPosition`](#accessor-property-windowxposition)
* [`windowYPosition`](#accessor-property-windowyposition)
* [`windowWidth`](#accessor-property-windowwidth)
* [`windowHeight`](#accessor-property-windowheight)

## Accessor methods

* [`elementCount()`](#accessor-method-elementcount)
* [`scriptResult()`](#accessor-method-scriptresult)

## Action methods

* [`executeScript()`](#action-method-executescript)
* [`loadPage()`](#action-method-loadpage)
* [`navigateBack()`](#action-method-navigateback)
* [`navigateForward()`](#action-method-navigateforward)
* [`reloadPage()`](#action-method-reloadpage)
* [`setWindowPosition()`](#action-method-setwindowposition)
* [`setWindowSize()`](#action-method-setwindowsize)

### Accessor property: `pageTitle`

> The title of the page

Type definition:

* **`pageTitle: SeleniumAccessor<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.pageTitle, it.should.contain('pageTitle'));
});
```

### Accessor property: `pageUrl`

> The URL of the page

Type definition:

* **`pageUrl: SeleniumAccessor<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.pageUrl, it.should.contain('pageUrl'));
});
```

### Accessor property: `windowXPosition`

> The X position of the window

Type definition:

* **`windowXPosition: SeleniumAccessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowXPosition, it.should.equal(123));
});
```

*Note: This feature is [supported by Firefox only from version 53 onwards][firefox-bug].
At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.*

### Accessor property: `windowYPosition`

> The Y position of the window

Type definition:

* **`windowYPosition: SeleniumAccessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowYPosition, it.should.equal(123));
});
```

*Note: This feature is [supported by Firefox only from version 53 onwards][firefox-bug].
At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.*

### Accessor property: `windowWidth`

> The width of the window

Type definition:

* **`windowWidth: SeleniumAccessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowWidth, it.should.equal(123));
});
```

*Note: This feature is [supported by Firefox only from version 53 onwards][firefox-bug].
At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.*

### Accessor property: `windowHeight`

> The height of the window

Type definition:

* **`windowHeight: SeleniumAccessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowHeight, it.should.equal(123));
});
```

*Note: This feature is [supported by Firefox only from version 53 onwards][firefox-bug].
At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.*

### Accessor method: `elementCount()`

> The count of matching elements for the specified selector ({selector})

Type definition:

* **`elementCount(selector: string): SeleniumAccessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.elementCount('selector'), it.should.beGreaterThan(0));
});
```

### Accessor method: `scriptResult()`

> The result of the {scriptName} script

Type definition:

* **`scriptResult<T>(scriptName: string, script: AccessorScript<T>): SeleniumAccessor<T>`**
* `AccessorScript<T>: (callback: (result: T) => void) => void`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.scriptResult('scriptName', callback => {
    // This function will be executed in browser context,
    // so any references to outer scope won't work.

    // ...

    callback('scriptResult');
  }), it.should.equal('scriptResult'));
});
```

### Action method: `executeScript()`

> Execute the {scriptName} script

Type definition:

* **`executeScript(scriptName: string, script: ActionScript): SeleniumAction`**
* `ActionScript: (callback: () => void) => void`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.executeScript('scriptName', callback => {
    // This function will be executed in browser context,
    // so any references to outer scope won't work.

    // ...

    callback(); // Do not forget to call the callback function!
  }));
});
```

### Action method: `loadPage()`

> Load the page at {url}

Type definition:

* **`loadPage(url: string): SeleniumAction`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.loadPage('url'));
});
```

### Action method: `navigateBack()`

> Navigate back

Type definition:

* **`navigateBack(): SeleniumAction`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.navigateBack());
});
```

### Action method: `navigateForward()`

> Navigate forward

Type definition:

* **`navigateForward(): SeleniumAction`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.navigateForward());
});
```

### Action method: `reloadPage()`

> Reload the page

Type definition:

* **`reloadPage(): SeleniumAction`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.reloadPage());
});
```

### Action method: `setWindowPosition()`

> Set the window position to {x},{y}

Type definition:

* **`setWindowPosition(x: number, y: number): SeleniumAction`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.setWindowPosition(123, 456));
});
```

*Note: This feature is [supported by Firefox only from version 53 onwards][firefox-bug].
At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.*

### Action method: `setWindowSize()`

> Set the window size to {width}x{height}

Type definition:

* **`setWindowSize(width: number, height: number): SeleniumAction`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.setWindowSize(123, 456));
});
```

*Note: This feature is [supported by Firefox only from version 53 onwards][firefox-bug].
At the moment, the `cybernaut-firefox` Docker container still uses [Firefox ESR in version 52][firefox-esr] and therefore does not support this feature.
A possible workaround would be to adjust the virtual screen resolution, as described [here][docker-getting-started].*

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1347589
[firefox-esr]: https://www.mozilla.org/en-US/firefox/organizations/faq/
[docker-getting-started]: https://cybernaut.js.org/docs/overview/testing-with-docker.html#getting-started
