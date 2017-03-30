# Cybernaut

[![npm][0]][1]
[![build][2]][3]
[![coverage][4]][5]
[![semantic-release][6]][7]
[![Greenkeeper][8]][9]
[![TypeScript][17]][18]

Reliable, zero configuration end-to-end testing in BDD-style.

```ts
import {browser, defineElement, it, test} from 'cybernaut';

test('Star the "clebert/cybernaut" repository on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.contain('clebert/cybernaut'));

  const starButton = defineElement('ul.pagehead-actions > li:nth-child(2) > a:nth-child(1)');

  await t.perform(starButton.click());
});
```

[![Example][10]][13]

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

Cybernaut must be started directly from the command line:

```sh
$(npm bin)/cybernaut
```

Directories are recursed, with all `**/*.e2e.js` files being treated as test files.

Cybernaut produces output in TAP format, [`tap-mocha-reporter`][12] can be used to format it:

```sh
npm install --save-dev tap-mocha-reporter
```

```sh
$(npm bin)/cybernaut | $(npm bin)/tap-mocha-reporter spec
```

It is recommended to write tests using async functions, which are natively supported by Node.js as of version 7. Alternatively, the tests must be transpiled using TypeScript or Babel. A working example project can be found [here][13].

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

## API

* [Test](#test)
* [Browser](#browser)
* [Element](#element)
* [PredicateBuilder](#predicatebuilder)

### Test

#### `test(name: string, implementation?: (t: Test) => Promise<void>): void`

```ts
import {test} from 'cybernaut';

test('foo'); // This test will be marked as TODO

test('bar', async t => { // This test will be executed
  // ...
});
```

#### `skip(name: string, implementation: (t: Test) => Promise<void>): void`

```ts
import {skip} from 'cybernaut';

skip('foo', async t => { // This test won't be executed (and marked as SKIP)
  // ...
});
```

#### Methods

#### `t.assert<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<void>`

#### `t.perform(action: Action, retries?: number, retryDelay?: number): Promise<void>`

#### `t.verify<T>(accessor: Accessor<T>, predicate: Predicate<T>, retries?: number, retryDelay?: number): Promise<boolean>`

#### `t.fail(message: string, cause: Error): void`

#### `t.pass(message: string): void`

### Browser

#### `browser`

```ts
import {browser} from 'cybernaut';
```

#### Accessors

#### `browser.pageTitle: Accessor<string>`

#### `browser.pageUrl: Accessor<string>`

#### `browser.windowX: Accessor<number>`

#### `browser.windowY: Accessor<number>`

#### `browser.windowWidth: Accessor<number>`

#### `browser.windowHeight: Accessor<number>`

#### Actions

#### `browser.loadPage(url: string): Action`

#### `browser.maximizeWindow(): Action`

#### `browser.navigateBack(): Action`

#### `browser.navigateForward(): Action`

#### `browser.reloadPage(): Action`

#### `browser.setWindowPosition(x: number, y: number): Action`

#### `browser.setWindowSize(width: number, height: number): Action`

#### `browser.sleep(duration: number): Action`

### Element

##### defineElement

`defineElement(selector: string): Element`

```ts
import {defineElement} from 'cybernaut';

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

##### it

`it: {should: PredicateBuilder}`

```ts
import {it} from 'cybernaut';
```

#### Predicates

##### contain

`it.should.contain(expectedValue: string): Predicate<string>`

`it.should.not.contain(expectedValue: string): Predicate<string>`

##### equal `===`

`it.should.equal<T>(expectedValue: T): Predicate<T>`

`it.should.not.equal<T>(expectedValue: T): Predicate<T>`

The comparison is performed with [`deep-strict-equal`][20].

##### match

`it.should.match(regex: RegExp): Predicate<string>`

`it.should.not.match(regex: RegExp): Predicate<string>`

##### above `>`

`it.should.be.above(expectedValue: number): Predicate<number>`

##### least `>=`

`it.should.be.at.least(expectedValue: number): Predicate<number>`

##### below `<`

`it.should.be.below(expectedValue: number): Predicate<number>`

##### most `<=`

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