# Cybernaut

[![npm][0]][1]
[![build][2]][3]
[![coverage][4]][5]
[![semantic-release][6]][7]
[![Greenkeeper][8]][9]
[![TypeScript][17]][18]

Reliable, zero configuration end-to-end testing in BDD-style.

[![Example][10]][13]

```ts
const {browser, defineElement, it, test} = require('cybernaut');

test('Star the "clebert/cybernaut" repository on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.contain('clebert/cybernaut'));

  const starButton = defineElement('ul.pagehead-actions > li:nth-child(2) > a:nth-child(1)');

  await t.perform(starButton.click());
});
```

The above [example][13] can be executed without configuration or dependencies in a [Docker][21] container:

```sh
git clone https://github.com/clebert/cybernaut.git && \
cd cybernaut/example/ && \
docker build -t clebert/cybernaut-example . && \
docker run clebert/cybernaut-example
```

## Contents

* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [Development](#development)

## Installation

```sh
npm install --save-dev cybernaut
```

If the default configuration is used, Chrome and a matching version of [`chromedriver`][11] must also be installed:

```sh
npm install --save-dev chromedriver
```

## Usage

### Starting Cybernaut

Cybernaut must be started from the command line:

```sh
$(npm bin)/cybernaut
```

Directories are recursed, with all `**/*.e2e.js` files being treated as test files.

Cybernaut produces output in [TAP][28] format, [`tap-mocha-reporter`][12] can be used to format it:

```sh
npm install --save-dev tap-mocha-reporter
```

```sh
$(npm bin)/cybernaut | $(npm bin)/tap-mocha-reporter spec
```

### Configuring Cybernaut

The following configuration is active by default:

```json
{
  "capabilities": {"browserName": "chrome"},
  "concurrency": 1,
  "dependencies": ["chromedriver"],
  "exclude": ["**/node_modules/**/*"],
  "include": "**/*.e2e.js",
  "retries": 4,
  "retryDelay": 500
}
```

A separate configuration can be passed as a command line argument:

```sh
$(npm bin)/cybernaut firefox-config.js
```

Such a configuration can be validated with [this JSON schema][19] and written as a JSON file or JavaScript module:

*firefox-config.json*

```json
{
  "capabilities": {"browserName": "firefox"},
  "dependencies": ["geckodriver"]
}
```

*firefox-config.js*

```js
module.exports = {
  capabilities: {browserName: 'firefox'},
  dependencies: ['geckodriver']
};
```

**A note for Firefox users:** Cybernaut uses [`selenium-webdriver@3.3.0`][14], which is incompatible with [`geckodriver@1.5.0`][15]. Until these [incompatibilities][16] have been solved, [`geckodriver@1.4.0`][15] must be used.

### Writing tests

It is recommended to write tests using [async functions][26], which are natively supported by [Node.js][27] as of version 7. Alternatively, the tests must be transpiled using [TypeScript][18] or [Babel][22].

If you write your tests with [TypeScript][18], it is recommended to enable the [TSLint][23] rule [`no-floating-promises`][24]. This can prevent the [`await`][25] operators from being forgotten.

## API

* [Module `exports`](#module)
  * [`test`](#test)
  * [`skip`](#skip)
  * [`browser`](#browser)
  * [`defineElement`](#defineelement)
  * [`it`](#it)
* [Class `Test`](#test)
  * [`assert`](#assert)
  * [`perform`](#perform)
  * [`verify`](#verify)
  * [`fail`](#fail)
  * [`pass`](#pass)
* [Class `Browser`](#browser)
  * [`pageTitle`](#pagetitle)
  * [`pageUrl`](#pageurl)
  * [`windowX`](#windowx)
  * [`windowY`](#windowy)
  * [`windowWidth`](#windowwidth)
  * [`windowHeight`](#windowheight)
  * [`scriptResult`](#scriptresult)
  * [`executeScript`](#executescript)
  * [`loadPage`](#loadpage)
  * [`maximizeWindow`](#maximizewindow)
  * [`navigateBack`](#navigateback)
  * [`navigateForward`](#navigateforward)
  * [`reloadPage`](#reloadpage)
  * [`setWindowPosition`](#setwindowposition)
  * [`setWindowSize`](#setwindowsize)
  * [`sleep`](#sleep)
* [Class `Element`](#element)
  * [`tagName`](#tagname)
  * [`text`](#text)
  * [`visibility`](#visibility)
  * [`x`](#x)
  * [`y`](#y)
  * [`width`](#width)
  * [`height`](#height)
  * [`cssValue`](#cssvalue)
  * [`propertyValue`](#propertyvalue)
  * [`clearValue`](#clearvalue)
  * [`click`](#click)
  * [`sendKeys`](#sendkeys)
  * [`submitForm`](#submitform)
* [Class `PredicateBuilder`](#predicatebuilder)
  * [`contain`](#contain)
  * [`not.contain`](#notcontain)
  * [`equal`](#equal)
  * [`not.equal`](#notequal)
  * [`match`](#match)
  * [`not.match`](#notmatch)
  * [`be.above`](#beabove)
  * [`be.at.least`](#beatleast)
  * [`be.below`](#bebelow)
  * [`be.at.most`](#beatmost)

### Test

#### [`test`](#api)

Type definition:

- **`test(name: string, implementation?: Implementation): void`**
- `Implementation = (t: Test) => Promise<void>`

Example usage:

```ts
const {test} = require('cybernaut');

test('foo'); // This test will be marked as TODO

test('foo', async t => { // This test will be executed
  // ...
});
```

#### [`skip`](#api)

Type definition:

- **`skip(name: string, implementation: Implementation): void`**
- `Implementation = (t: Test) => Promise<void>`

Example usage:

```ts
const {skip} = require('cybernaut');

skip('foo', async t => { // This test won't be executed (and marked as SKIP)
  // ...
});
```

#### [`assert`](#api)

Type definition: **`assert<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```ts
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar')); // Throws an error if the condition isn't met
});
```

#### [`perform`](#api)

Type definition: **`perform(action: Action, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```ts
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz')); // Throws an error if the action fails
});
```

#### [`verify`](#api)

Type definition: **`verify<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<boolean>`**

Example usage:

```ts
const {browser, test} = require('cybernaut');

test('foo', async t => {
  if (await t.verify(browser.pageTitle, it.should.contain('bar'))) { // Evaluates to false if the condition isn't met
    // ...
  }
});
```

#### [`fail`](#api)

Type definition: **`fail(message: string, cause: Error): void`**

Example TAP output: `not ok 1 - bar (cause: baz)`

Example usage:

```ts
const {test} = require('cybernaut');

test('foo', async t => {
  t.fail('bar', new Error('baz')); // Throws a new error
});
```

#### [`pass`](#api)

Type definition: **`pass(message: string): void`**

Example TAP output: `ok 1 - bar`

Example usage:

```ts
const {test} = require('cybernaut');

test('foo', async t => {
  t.pass('bar'); // Prints a successful-test line in TAP format on standard output
});
```

### Browser

TODO: browser einschieben

#### [`pageTitle`](#api)

Type definition: **`pageTitle: Accessor<string>`**

Example TAP output: `ok 1 - page title should contain 'bar' (attempt 1 of 5)`

Example usage:

```ts
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

#### [`pageUrl`](#api)

Type definition: **`pageUrl: Accessor<string>`**

Example TAP output: `ok 1 - page url should contain 'http://bar.baz' (attempt 1 of 5)`

Example usage:

```ts
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageUrl, it.should.contain('http://bar.baz'));
});
```

#### [`windowX`](#api)

Type definition: **`windowX: Accessor<number>`**

Test output: `window x-position should ...`

#### [`windowY`](#api)

Type definition: **`windowY: Accessor<number>`**

Test output: `window y-position should ...`

#### [`windowWidth`](#api)

Type definition: **`windowWidth: Accessor<number>`**

Test output: `window width should ...`

#### [`windowHeight`](#api)

Type definition: **`windowHeight: Accessor<number>`**

Test output: `window height should ...`

#### [`scriptResult`](#api)

##### Typing:

`browser.scriptResult(scriptName: string, script: Script): Accessor<any>`

`type Script = (callback: (result?: any) => void) => void`

##### Output:

`result of script 'foo' should equal 'bar'`

Example:

```ts
await t.assert(browser.scriptResult('foo', callback => { // This script will be executed in the browser
  // ...

  callback('bar');
}), it.should.equal('bar'));
```

#### Actions

##### executeScript

`browser.executeScript(scriptName: string, script: Script): Action`

`type Script = (callback: (result?: any) => void) => void`

```ts
await t.perform(browser.executeScript('foo', callback => { // This script will be executed in the browser
  // ...

  callback();
}));
```

##### loadPage

`browser.loadPage(url: string): Action`

##### maximizeWindow

`browser.maximizeWindow(): Action`

##### navigateBack

`browser.navigateBack(): Action`

##### navigateForward

`browser.navigateForward(): Action`

##### reloadPage

`browser.reloadPage(): Action`

##### setWindowPosition

`browser.setWindowPosition(x: number, y: number): Action`

##### setWindowSize

`browser.setWindowSize(width: number, height: number): Action`

##### sleep

`browser.sleep(duration: number): Action`

### Element

#### Factory Function

##### defineElement

`defineElement(selector: string): Element`

```ts
const {defineElement} = require('cybernaut');

const element = defineElement('#foo');
```

#### Accessors

##### tagName

`element.tagName: Accessor<string>`

##### text

`element.text: Accessor<string>`

##### visibility

`element.visibility: Accessor<boolean>`

##### x

`element.x: Accessor<number>`

##### y

`element.y: Accessor<number>`

##### width

`element.width: Accessor<number>`

##### height

`element.height: Accessor<number>`

##### cssValue

`element.cssValue(cssName: string): Accessor<string>`

##### propertyValue

`element.propertyValue(propertyName: string): Accessor<string | null>`

#### Actions

##### clearValue

`element.clearValue(): Action`

##### click

`element.click(): Action`

##### sendKeys

`element.sendKeys(...keys: string[]): Action`

##### submitForm

`element.submitForm(): Action`

### PredicateBuilder

#### Factory Function

##### it

`it: {should: PredicateBuilder}`

```ts
const {it} = require('cybernaut');
```

#### Predicates

##### contain

`it.should.contain(expectedValue: string): Predicate<string>`

`it.should.not.contain(expectedValue: string): Predicate<string>`

##### equal `===`

`it.should.equal<T>(expectedValue: T): Predicate<T>`

`it.should.not.equal<T>(expectedValue: T): Predicate<T>`

The comparison is done via [`deep-strict-equal`][20].

##### match

`it.should.match(regex: RegExp): Predicate<string>`

`it.should.not.match(regex: RegExp): Predicate<string>`

##### be.above `>`

`it.should.be.above(expectedValue: number): Predicate<number>`

##### be.at.least `>=`

`it.should.be.at.least(expectedValue: number): Predicate<number>`

##### be.below `<`

`it.should.be.below(expectedValue: number): Predicate<number>`

##### be.at.most `<=`

`it.should.be.at.most(expectedValue: number): Predicate<number>`

## Development

### Installing dev dependencies

```sh
npm install
```

### Watching sources and unit tests

```sh
npm run watch
```

### Checking for formatting and linting errors

```sh
npm run check
```

### Formatting sources

```sh
npm run format
```

### Committing a new change

```sh
npm run cz
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[0]: https://img.shields.io/npm/v/cybernaut.svg?maxAge=3600
[1]: https://www.npmjs.com/package/cybernaut
[2]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[3]: https://travis-ci.org/clebert/cybernaut
[4]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[5]: https://coveralls.io/github/clebert/cybernaut?branch=master
[6]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[7]: https://github.com/semantic-release/semantic-release
[8]: https://badges.greenkeeper.io/clebert/cybernaut.svg
[9]: https://greenkeeper.io/
[10]: https://raw.githubusercontent.com/clebert/cybernaut/master/example/screenshot.png
[11]: https://github.com/giggio/node-chromedriver
[12]: https://github.com/tapjs/tap-mocha-reporter
[13]: https://github.com/clebert/cybernaut/tree/master/example
[14]: https://github.com/SeleniumHQ/selenium
[15]: https://github.com/vladikoff/node-geckodriver
[16]: https://github.com/SeleniumHQ/selenium/issues/3625
[17]: https://img.shields.io/badge/TypeScript-friendly-blue.svg
[18]: http://www.typescriptlang.org/
[19]: https://github.com/clebert/cybernaut/blob/master/config-schema.json
[20]: https://github.com/sindresorhus/deep-strict-equal
[21]: https://www.docker.com/
[22]: https://babeljs.io/
[23]: https://palantir.github.io/tslint/
[24]: https://palantir.github.io/tslint/rules/no-floating-promises/
[25]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[26]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[27]: https://nodejs.org/en/
[28]: https://testanything.org/
