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

* [Module `exports`](#module-exports)
  * [`test`](#test)
  * [`skip`](#skip)
  * [`browser`](#browser)
  * [`defineElement`](#defineelement)
  * [`it`](#it)
* [Interface `Test`](#interface-test)
  * [`assert`](#assert)
  * [`perform`](#perform)
  * [`verify`](#verify)
  * [`fail`](#fail)
  * [`pass`](#pass)
* [Interface `Browser`](#interface-browser)
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
* [Interface `Element`](#interface-element)
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
* [Interface `PredicateBuilder`](#interface-predicatebuilder)
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

### [Module `exports`](#api)

#### [`test`](#api)

Type definition:

- **`test(name: string, implementation?: Implementation): void`**
- `Implementation = (t: Test) => Promise<void>`
- [`Test`](#interface-test)

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
- [`Test`](#interface-test)

Example usage:

```ts
const {skip} = require('cybernaut');

skip('foo', async t => { // This test won't be executed (and marked as SKIP)
  // ...
});
```

#### [`browser`](#api)

Type definition:

- **`browser: Browser`**
- [`Browser`](#interface-browser)

Example usage:

```ts
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz'));
});
```

#### [`defineElement`](#api)

Type definition:

- **`defineElement(selector: string): Element`**
- [`Element`](#interface-element)

Example usage:

```ts
const {defineElement, test} = require('cybernaut');

test('foo', async t => {
  const bar = defineElement('#bar');

  await t.perform(bar.click());
});
```

#### [`it`](#api)

Type definition:

- **`it: {should: PredicateBuilder}`**
- [`PredicateBuilder`](#interface-predicatebuilder)

Example usage:

```ts
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

### [Interface `Test`](#api)

#### [`assert`](#api)

Type definition:

- **`assert<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```ts
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar')); // Throws an error if the condition isn't met
});
```

#### [`perform`](#api)

Type definition:

- **`perform(action: Action, retries?: number, retryDelay?: number): Promise<void>`**

Example usage:

```ts
const {browser, test} = require('cybernaut');

test('foo', async t => {
  await t.perform(browser.loadPage('http://bar.baz')); // Throws an error if the action fails
});
```

#### [`verify`](#api)

Type definition:

- **`verify<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<boolean>`**

Example usage:

```ts
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  if (await t.verify(browser.pageTitle, it.should.contain('bar'))) { // Evaluates to false if the condition isn't met
    // ...
  }
});
```

#### [`fail`](#api)

Type definition:

- **`fail(message: string, cause: Error): void`**

Example [TAP][28] output: `not ok 1 - bar (cause: baz)`

Example usage:

```ts
const {test} = require('cybernaut');

test('foo', async t => {
  t.fail('bar', new Error('baz')); // Throws a new error
});
```

#### [`pass`](#api)

Type definition:

- **`pass(message: string): void`**

Example [TAP][28] output: `ok 1 - bar`

Example usage:

```ts
const {test} = require('cybernaut');

test('foo', async t => {
  t.pass('bar'); // Prints a successful-test line in TAP format on standard output
});
```

### [Interface `Browser`](#api)

#### [`pageTitle`](#api)

Type definition:

- **`pageTitle: Accessor<string>`**

Example [TAP][28] output: `ok 1 - page title should contain 'bar' (attempt 1 of 5)`

Example usage:

```ts
const {browser, it, test} = require('cybernaut');

test('foo', async t => {
  await t.assert(browser.pageTitle, it.should.contain('bar'));
});
```

#### [`pageUrl`](#api)

Type definition:

- **`pageUrl: Accessor<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowX`](#api)

Type definition:

- **`windowX: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowY`](#api)

Type definition:

- **`windowY: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowWidth`](#api)

Type definition:

- **`windowWidth: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowHeight`](#api)

Type definition:

- **`windowHeight: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`scriptResult`](#api)

Type definition:

- **`scriptResult(scriptName: string, script: Script): Accessor<any>`**
- `Script = (callback: (result?: any) => void) => void`

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`executeScript`](#api)

Type definition:

- **`executeScript(scriptName: string, script: Script): Action`**
- `Script = (callback: (result?: any) => void) => void`

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`loadPage`](#api)

Type definition:

- **`loadPage(url: string): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`maximizeWindow`](#api)

Type definition:

- **`maximizeWindow(): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`navigateBack`](#api)

Type definition:

- **`navigateBack(): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`navigateForward`](#api)

Type definition:

- **`navigateForward(): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`reloadPage`](#api)

Type definition:

- **`reloadPage(): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`setWindowPosition`](#api)

Type definition:

- **`setWindowPosition(x: number, y: number): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`setWindowSize`](#api)

Type definition:

- **`setWindowSize(width: number, height: number): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`sleep`](#api)

Type definition:

- **`sleep(duration: number): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

### [Interface `Element`](#api)

#### [`tagName`](#api)

Type definition:

- **`tagName: Accessor<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`text`](#api)

Type definition:

- **`text: Accessor<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`visibility`](#api)

Type definition:

- **`visibility: Accessor<boolean>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`x`](#api)

Type definition:

- **`x: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`y`](#api)

Type definition:

- **`y: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`width`](#api)

Type definition:

- **`width: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`height`](#api)

Type definition:

- **`height: Accessor<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`cssValue`](#api)

Type definition:

- **`cssValue(cssName: string): Accessor<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`propertyValue`](#api)

Type definition:

- **`propertyValue(propertyName: string): Accessor<string | null>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`clearValue`](#api)

Type definition:

- **`clearValue(): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`click`](#api)

Type definition:

- **`click(): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`sendKeys`](#api)

Type definition:

- **`sendKeys(...keys: string[]): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`submitForm`](#api)

Type definition:

- **`submitForm(): Action`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

### [Interface `PredicateBuilder`](#api)

#### [`contain`](#api)

Type definition:

- **`contain(expectedValue: string): Predicate<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`not.contain`](#api)

Type definition:

- **`not.contain(expectedValue: string): Predicate<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`equal`](#api)

Type definition:

- **`equal<T>(expectedValue: T): Predicate<T>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`not.equal`](#api)

Type definition:

- **`not.equal<T>(expectedValue: T): Predicate<T>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`match`](#api)

Type definition:

- **`match(regex: RegExp): Predicate<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`not.match`](#api)

Type definition:

- **`not.match(regex: RegExp): Predicate<string>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.above`](#api)

Type definition:

- **`be.above(expectedValue: number): Predicate<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.at.least`](#api)

Type definition:

- **`be.at.least(expectedValue: number): Predicate<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.below`](#api)

Type definition:

- **`be.below(expectedValue: number): Predicate<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.at.most`](#api)

Type definition:

- **`be.at.most(expectedValue: number): Predicate<number>`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

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
