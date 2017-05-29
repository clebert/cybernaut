# ![Cybernaut][logo-svg]

[![npm][npm-cybernaut-badge]][npm-cybernaut]
[![build][travis-ci-badge]][travis-ci]
[![coverage][coveralls-badge]][coveralls]
[![Greenkeeper][greenkeeper-badge]][greenkeeper]
[![TypeScript][typescript-badge]][typescript]

> Reliable, automated web UI testing in BDD-style.

[![Example][example-png]][example-png]

WYSIWYM—the above **human-readable** test output corresponds to what is programmed:

```js
const {browser, defineElement, it, test} = require('cybernaut');

test('This is an example test', async t => {
  await t.perform(browser.loadPage('http://example.com/'), {retries: 0});

  await t.assert(browser.pageTitle, it.should.equal('Example Domain'));

  const moreInformationLink = defineElement('more-information-link', 'a');

  await t.perform(moreInformationLink.click());

  await t.assert(browser.pageTitle, it.should.contain('IANA'));
});
```

## Getting started

Although it is possible to run your tests [locally][testing-locally], it is recommended to run them on Docker.
For this, only Docker has to be [installed][docker-installation], no further dependencies are required.

To get started, put a test file (e.g. test.e2e.js) into a directory:

```sh
mkdir -p cybernaut-tests/ & vi cybernaut-tests/test.e2e.js
```

and run it on Chrome with Docker:

```sh
docker run -it --rm \
  -v "$(pwd)"/cybernaut-tests:/opt/cybernaut-tests \
  -v /dev/shm:/dev/shm \
  clebert/cybernaut-chrome:latest
```

**For further information, please consult the [documentation][testing-with-docker].**

## Introduction

Cybernaut is built on top of selenium-webdriver and lets you control a browser with just a few lines of code.
Your test code will look simple, concise and easy to read and is automatically output line by line in a human-readable form (WYSIWYM).
It provides a [`Promise`][mdn-promise]-based API and allows the use of [`async`][mdn-async]/[`await`][mdn-await] to write your code without nesting and with the possibility of using control-flow primitives such as `if...else`.

Additionally, there are [pre-built][docker-containers] Docker containers to run your tests effortlessly in any environment such as Travis CI.

### Writing reliable tests will be easy

Let's say we want to write a test which checks the text of a headline element.

A test written with, for example, selenium-webdriver consists of three test steps.
Each of these test steps can go wrong:

```js
// Fails if the headline element does not yet exist.
const headline = await driver.findElement(By.css('h1'));

// Fails if the headline element is stale.
const text = await headline.getText();

// Fails if the actual text does not equal the expected text.
assert.equal(text, 'Lorem ipsum');
```

Cybernaut allows all these test steps to be implemented in a single test step. This single test step is executed in an atomic way.
This means that if one part of this test step fails, the entire test step fails and can then be repeated as a whole by the integrated test runner:

```js
// Can not fail because it is just a definition of an element.
const headline = defineElement('headline', 'h1');

// Can fail but only after several attempts.
await t.assert(headline.text, it.should.equal('Lorem ipsum'));
```

By this mechanism, a high reliability and thus stability of your tests can be ensured.

---
Built by (c) Clemens Akens. Released under the MIT license.

[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[docker-containers]: https://cybernaut.js.org/docs/overview/testing-with-docker.html#docker-containers
[docker-installation]: https://docs.docker.com/engine/installation/
[example]: https://github.com/clebert/cybernaut/tree/master/example
[example-png]: https://clebert.github.io/cybernaut/images/example.png
[greenkeeper]: https://greenkeeper.io/
[greenkeeper-badge]: https://badges.greenkeeper.io/clebert/cybernaut.svg
[logo-svg]: https://clebert.github.io/cybernaut/images/logo.svg
[mdn-async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[mdn-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[npm-cybernaut]: https://www.npmjs.com/package/cybernaut
[npm-cybernaut-badge]: https://img.shields.io/npm/v/cybernaut.svg?maxAge=3600
[testing-locally]: https://cybernaut.js.org/docs/overview/testing-locally.html
[testing-with-docker]: https://cybernaut.js.org/docs/overview/testing-with-docker.html
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[typescript]: http://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-friendly-blue.svg
