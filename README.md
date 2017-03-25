# Cybernaut

[![npm][0]][1]
[![build][2]][3]
[![coverage][4]][5]
[![TypeScript][17]][18]
[![commitizen][6]][7]
[![Greenkeeper][8]][9]

Reliable, zero configuration end-to-end testing in BDD-style.

```ts
const {browser, it, test} = require('cybernaut');

test('Check existence of "clebert/cybernaut" repository on GitHub', async t => {
  await t.perform(browser.loadPage('https://github.com/clebert/cybernaut'));

  await t.assert(browser.pageTitle, it.should.match(/clebert\/cybernaut/));
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
  "stepTimeout": 10000
}
```

A separate configuration can be passed as a command line argument:

```sh
$(npm bin)/cybernaut firefox-config.js
```

The configuration can be written as JSON or JavaScript module:

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

```ts
test(name: string, implementation: (t: Test) => Promise<void>, stepTimeout?: number): void

skip(name: string, implementation?: (t: Test) => Promise<void>, stepTimeout?: number): void

todo(name: string, implementation?: (t: Test) => Promise<void>, stepTimeout?: number): void
```

```ts
import {skip, test, todo} from 'cybernaut';

test('foo', async t => {
  // ...
});

skip('bar');
todo('baz');
```

#### Methods

```ts
t.assert<T>(accessor: Accessor<T>, predicate: Predicate<T>, stepTimeout?: number): Promise<void>
```

```ts
t.perform(action: Action, stepTimeout?: number): Promise<void>
```

```ts
t.verify<T>(accessor: Accessor<T>, predicate: Predicate<T>, stepTimeout?: number): Promise<boolean>
```

```ts
t.fail(message: string, cause: Error): void
```

```ts
t.pass(message: string): void
```

### Browser

```ts
import {browser} from 'cybernaut';
```

#### Accessors

```ts
browser.pageTitle: Accessor<string>
```

```ts
browser.pageUrl: Accessor<string>
```

```ts
browser.windowX: Accessor<number>
```

```ts
browser.windowY: Accessor<number>
```

```ts
browser.windowWidth: Accessor<number>
```

```ts
browser.windowHeight: Accessor<number>
```

#### Actions

```ts
browser.loadPage(url: string): Action
```

```ts
browser.maximizeWindow(): Action
```

```ts
browser.navigateBack(): Action
```

```ts
browser.navigateForward(): Action
```

```ts
browser.reloadPage(): Action
```

```ts
browser.setWindowPosition(x: number, y: number): Action
```

```ts
browser.setWindowSize(width: number, height: number): Action
```

```ts
browser.sleep(duration: number): Action
```

### Element

```ts
defineElement(selector: string): Element
```

```ts
import {defineElement} from 'cybernaut';

const element = defineElement('#foo');
```

#### Accessors

```ts
element.tagName: Accessor<string>
```

```ts
element.text: Accessor<string>
```

```ts
element.visibility: Accessor<boolean>
```

```ts
element.x: Accessor<number>
```

```ts
element.y: Accessor<number>
```

```ts
element.width: Accessor<number>
```

```ts
element.height: Accessor<number>
```

```ts
element.cssValue(cssName: string): Accessor<string>
```

```ts
element.propertyValue(propertyName: string): Accessor<string | null>
```

#### Actions

```ts
element.clearValue(): Action
```

```ts
element.click(): Action
```

```ts
element.sendKeys(...keys: string[]): Action
```

```ts
element.submitForm(): Action
```

### PredicateBuilder

```ts
import {it} from 'cybernaut';
```

#### Predicates

```ts
it.should.contain(expectedValue: string): Predicate<string>

it.should.not.contain(expectedValue: string): Predicate<string>
```

```ts
it.should.equal<T>(expectedValue: T): Predicate<T>

it.should.not.equal<T>(expectedValue: T): Predicate<T>
```

```ts
it.should.match(regex: RegExp): Predicate<string>

it.should.not.match(regex: RegExp): Predicate<string>
```

```ts
it.should.be.above(expectedValue: number): Predicate<number>
```

```ts
it.should.be.at.least(expectedValue: number): Predicate<number>
```

```ts
it.should.be.below(expectedValue: number): Predicate<number>
```

```ts
it.should.be.at.most(expectedValue: number): Predicate<number>
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

### Publishing a new version

```sh
npm run release
```

```sh
git push --follow-tags origin master
```

```sh
npm publish
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[0]: https://img.shields.io/npm/v/cybernaut.svg?maxAge=3600
[1]: https://www.npmjs.com/package/cybernaut
[2]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[3]: https://travis-ci.org/clebert/cybernaut
[4]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[5]: https://coveralls.io/github/clebert/cybernaut?branch=master
[6]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[7]: http://commitizen.github.io/cz-cli/
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
