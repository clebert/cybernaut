# ![Cybernaut][logo-svg]

[![npm][npm-cybernaut-badge]][npm-cybernaut]
[![build][travis-ci-badge]][travis-ci]
[![coverage][coveralls-badge]][coveralls]
[![semantic-release][semantic-release-badge]][semantic-release]
[![Greenkeeper][greenkeeper-badge]][greenkeeper]
[![TypeScript][typescript-badge]][typescript]

> Reliable, zero configuration end-to-end testing in BDD-style.

[![Example][example-png]][example-png]

WYSIWYM—the above **human-readable** test output corresponds to what is programmed:

```js
import {browser, defineElement, it, test} from 'cybernaut';

test('This is an end-to-end test example for Cybernaut', async t => {
  await t.perform(browser.loadPage('http://example.com/'), {retries: 0});

  await t.assert(browser.pageTitle, it.should.equal('Example Domain'));

  const moreInformationLink = defineElement('more-information-link', 'a');

  await t.perform(moreInformationLink.click());

  await t.assert(browser.pageTitle, it.should.contain('IANA'));
});
```

This [example][example] can be easily executed in a Docker container,

on Chrome:

```sh
git clone https://github.com/clebert/cybernaut.git && cd cybernaut && \
./scripts/docker/build-example.sh chrome && ./scripts/docker/run-example.sh chrome
```

on Firefox:

```sh
git clone https://github.com/clebert/cybernaut.git && cd cybernaut && \
./scripts/docker/build-example.sh firefox && ./scripts/docker/run-example.sh firefox
```

on iPhone 6 Plus (via Mobile Emulation):

```sh
git clone https://github.com/clebert/cybernaut.git && cd cybernaut && \
./scripts/docker/build-example.sh iphone && ./scripts/docker/run-example.sh iphone
```

## Installation

```sh
npm install --save-dev cybernaut
```

*Note: It is recommended to run your end-to-end tests with Docker.
Otherwise, if the default configuration is used, a current version of Chrome must be installed.
Cybernaut is tested with Chrome and Firefox and **provides** the latest drivers for these two.*

## Introduction

Cybernaut is build on top of selenium-webdriver and lets you control a browser with just a few lines of code.
Your end-to-end test code will look simple, concise and easy to read and is automatically output line by line in a human-readable form.
It provides a [`Promise`][mdn-promise]-based API and allows the use of [`async`][mdn-async]/[`await`][mdn-await] to write code without nesting and with the possibility of using control-flow primitives such as `if...else`.

There are pre-built Docker containers to run your end-to-end tests effortlessly in any environment such as Travis CI.

The integrated test runner executes all steps of your end-to-end tests in an atomic way.
This means that if one part of a test step fails, the entire test step fails and can then be repeated.
By this mechanism, a high reliability and thus stability of your end-to-end tests can be ensured.

## Documentation

You can find the documentation [here][homepage].

---
Built by (c) Clemens Akens. Released under the MIT license.

[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[example]: https://github.com/clebert/cybernaut/tree/master/example
[example-png]: https://clebert.github.io/cybernaut/images/example.png
[greenkeeper]: https://greenkeeper.io/
[greenkeeper-badge]: https://badges.greenkeeper.io/clebert/cybernaut.svg
[homepage]: https://cybernaut.js.org/
[logo-svg]: https://clebert.github.io/cybernaut/images/logo.svg
[mdn-async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[mdn-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[npm-cybernaut]: https://www.npmjs.com/package/cybernaut
[npm-cybernaut-badge]: https://img.shields.io/npm/v/cybernaut.svg?maxAge=3600
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[typescript]: http://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-friendly-blue.svg
