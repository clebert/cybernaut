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
* [Class `Test`](#class-test)
  * [`assert`](#assert)
  * [`perform`](#perform)
  * [`verify`](#verify)
  * [`fail`](#fail)
  * [`pass`](#pass)
* [Class `Browser`](#class-browser)
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
* [Class `Element`](#class-element)
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
* [Class `PredicateBuilder`](#class-predicatebuilder)
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

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`skip`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`browser`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`defineElement`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`it`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

### [Class `Test`](#api)

#### [`assert`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`perform`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`verify`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`fail`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`pass`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

### [Class `Browser`](#api)

#### [`pageTitle`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`pageUrl`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowX`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowY`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowWidth`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`windowHeight`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`scriptResult`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`executeScript`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`loadPage`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`maximizeWindow`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`navigateBack`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`navigateForward`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`reloadPage`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`setWindowPosition`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`setWindowSize`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`sleep`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

### [Class `Element`](#api)

#### [`tagName`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`text`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`visibility`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`x`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`y`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`width`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`height`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`cssValue`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`propertyValue`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`clearValue`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`click`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`sendKeys`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`submitForm`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

### [Class `PredicateBuilder`](#api)

#### [`contain`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`not.contain`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`equal`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`not.equal`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`match`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`not.match`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.above`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.at.least`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.below`](#api)

Type definition: **`TODO`**

Example [TAP][28] output: `TODO`

Example usage:

```ts
TODO
```

#### [`be.at.most`](#api)

Type definition: **`TODO`**

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
