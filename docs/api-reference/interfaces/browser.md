# Interface `Browser`

## Properties

* [`pageTitle`](#property-pagetitle)
* [`pageUrl`](#property-pageurl)
* [`windowXPosition`](#property-windowxposition)
* [`windowYPosition`](#property-windowyposition)
* [`windowWidth`](#property-windowwidth)
* [`windowHeight`](#property-windowheight)

## Methods

* [`scriptResult`](#method-scriptresult)
* [`executeScript`](#method-executescript)
* [`loadPage`](#method-loadpage)
* [`maximizeWindow`](#method-maximizewindow)
* [`navigateBack`](#method-navigateback)
* [`navigateForward`](#method-navigateforward)
* [`reloadPage`](#method-reloadpage)
* [`setWindowPosition`](#method-setwindowposition)
* [`setWindowSize`](#method-setwindowsize)
* [`sleep`](#method-sleep)

### Property `pageTitle`

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

### Property `pageUrl`

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

### Property `windowXPosition`

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

### Property `windowYPosition`

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

### Property `windowWidth`

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

### Property `windowHeight`

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

### Method `scriptResult`

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

### Method `executeScript`

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

### Method `loadPage`

> Load the page {url}

Type definition:

* **`loadPage(url: string): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.loadPage('url'));
});
```

### Method `maximizeWindow`

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

### Method `navigateBack`

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

### Method `navigateForward`

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

### Method `reloadPage`

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

### Method `setWindowPosition`

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

### Method `setWindowSize`

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

### Method `sleep`

> Sleep for {duration} ms because {reason}

Type definition:

* **`sleep(duration: number, reason?: string): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('Example', async t => {
  await t.perform(browser.sleep(123));
});
```
