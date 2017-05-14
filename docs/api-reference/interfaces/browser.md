# Interface `Browser`

## Methods

* [`pageTitle`](#method-pagetitle)
* [`pageUrl`](#method-pageurl)
* [`windowXPosition`](#method-windowxposition)
* [`windowYPosition`](#method-windowyposition)
* [`windowWidth`](#method-windowwidth)
* [`windowHeight`](#method-windowheight)
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

### Method `pageTitle`

Type definition:

* **`pageTitle: Accessor<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

### Method `pageUrl`

Type definition:

* **`pageUrl: Accessor<string>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageUrl, it.should.contain('http://bar.baz'));
});
```

### Method `windowXPosition`

Type definition:

* **`windowXPosition: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowXPosition, it.should.equal(123));
});
```

### Method `windowYPosition`

Type definition:

* **`windowYPosition: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowYPosition, it.should.equal(123));
});
```

### Method `windowWidth`

Type definition:

* **`windowWidth: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowWidth, it.should.equal(123));
});
```

### Method `windowHeight`

Type definition:

* **`windowHeight: Accessor<number>`**

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.windowHeight, it.should.equal(123));
});
```

### Method `scriptResult`

Type definition:

* **`scriptResult(scriptName: string, script: Script): Accessor<any>`**
* `Script = (callback: (result?: any) => void) => void`

Example usage:

```js
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.scriptResult('bar', callback => {
    // This function will be executed in browser context,
    // so any references to outer scope won't work.

    // ...

    callback('baz');
  }), it.should.equal('baz'));
});
```

### Method `executeScript`

Type definition:

* **`executeScript(scriptName: string, script: Script): Action`**
* `Script = (callback: (result?: any) => void) => void`

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.executeScript('bar', callback => {
    // This function will be executed in browser context,
    // so any references to outer scope won't work.

    // ...

    callback();
  }));
});
```

### Method `loadPage`

Type definition:

* **`loadPage(url: string): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz'));
});
```

### Method `maximizeWindow`

Type definition:

* **`maximizeWindow(): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.maximizeWindow());
});
```

### Method `navigateBack`

Type definition:

* **`navigateBack(): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.navigateBack());
});
```

### Method `navigateForward`

Type definition:

* **`navigateForward(): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.navigateForward());
});
```

### Method `reloadPage`

Type definition:

* **`reloadPage(): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.reloadPage());
});
```

### Method `setWindowPosition`

Type definition:

* **`setWindowPosition(x: number, y: number): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.setWindowPosition(123, 456));
});
```

### Method `setWindowSize`

Type definition:

* **`setWindowSize(width: number, height: number): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.setWindowSize(123, 456));
});
```

### Method `sleep`

Type definition:

* **`sleep(durationInMillis: number, reason?: string): Action`**

Example usage:

```js
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.sleep(123));
});
```
