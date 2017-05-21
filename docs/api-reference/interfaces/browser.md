# Interface: `Browser`

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
* [`maximizeWindow()`](#action-method-maximizewindow)
* [`navigateBack()`](#action-method-navigateback)
* [`navigateForward()`](#action-method-navigateforward)
* [`reloadPage()`](#action-method-reloadpage)
* [`setWindowPosition()`](#action-method-setwindowposition)
* [`setWindowSize()`](#action-method-setwindowsize)
* [`sleep()`](#action-method-sleep)

### Accessor property: `pageTitle`

> The title of the page

Type definition:

* **`pageTitle: Accessor<string>`**

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

* **`pageUrl: Accessor<string>`**

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

* **`windowXPosition: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowXPosition, it.should.equal(123));
});
```

### Accessor property: `windowYPosition`

> The Y position of the window

Type definition:

* **`windowYPosition: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowYPosition, it.should.equal(123));
});
```

### Accessor property: `windowWidth`

> The width of the window

Type definition:

* **`windowWidth: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowWidth, it.should.equal(123));
});
```

### Accessor property: `windowHeight`

> The height of the window

Type definition:

* **`windowHeight: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('Example', async t => {
  await t.assert(browser.windowHeight, it.should.equal(123));
});
```

### Accessor method: `elementCount()`

> The count of matching elements for the specified selector ({selector})

Type definition:

* **`elementCount(selector: string): Accessor<number>`**

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

* **`scriptResult(scriptName: string, script: Script): Accessor<any>`**
* `Script: (callback: (result?: any) => void) => void`

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

* **`executeScript(scriptName: string, script: Script): Action`**
* `Script: (callback: (result?: any) => void) => void`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.executeScript('scriptName', callback => {
    // This function will be executed in browser context,
    // so any references to outer scope won't work.

    // ...

    callback();
  }));
});
```

### Action method: `loadPage()`

> Load the page at {url}

Type definition:

* **`loadPage(url: string): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.loadPage('url'));
});
```

### Action method: `maximizeWindow()`

> Maximize the window

Type definition:

* **`maximizeWindow(): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.maximizeWindow());
});
```

### Action method: `navigateBack()`

> Navigate back

Type definition:

* **`navigateBack(): Action`**

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

* **`navigateForward(): Action`**

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

* **`reloadPage(): Action`**

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

* **`setWindowPosition(x: number, y: number): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.setWindowPosition(123, 456));
});
```

### Action method: `setWindowSize()`

> Set the window size to {width}x{height}

Type definition:

* **`setWindowSize(width: number, height: number): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.setWindowSize(123, 456));
});
```

### Action method: `sleep()`

> Sleep for {duration} ms, because {reason}

Type definition:

* **`sleep(duration: number, reason?: string): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.sleep(123));
});
```
