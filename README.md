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
const {browser, defineElement, it, test} = require('cybernaut');

test('The gitbook should include the chapter "Starting Cybernaut"', async t => {
  await t.perform(browser.loadPage('https://cybernaut.js.org/'));

  const summary = defineElement('div.book-summary', 'summary');

  if (await t.verify(summary.visibility, it.should.equal(false))) {
    const toggleSummaryButton = defineElement(
      'div.book-header > a:nth-child(1).js-toolbar-action',
      'toggle-summary-button'
    );

    await t.perform(toggleSummaryButton.click());

    await t.perform(browser.sleep(1000, 'an animation is running'));
  }

  const chapterLink = defineElement(
    'div.book-summary > nav > ul > li[data-level="1.2"].chapter',
    'chapter-link-1-2'
  );

  await t.perform(chapterLink.click());

  const textHeadline = defineElement('section > h1', 'headline');

  await t.assert(textHeadline.text, it.should.equal('Starting Cybernaut'));
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
[npm-cybernaut]: https://www.npmjs.com/package/cybernaut
[npm-cybernaut-badge]: https://img.shields.io/npm/v/cybernaut.svg?maxAge=3600
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[typescript]: http://www.typescriptlang.org/
[typescript-badge]: https://img.shields.io/badge/TypeScript-friendly-blue.svg
