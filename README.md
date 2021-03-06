# [![Cybernaut][cybernaut-logo]][cybernaut-website]

[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> Reliable, automated Web UI testing.

**⚠️ Cybernaut is deprecated in favor of [PageObjectJS](https://pageobject.js.org/).**

## Getting started

Please take a look at the [`@cybernaut/test` README][readme-test].

## Packages

Cybernaut is a multi-package repository.

### [@cybernaut/test][package-test] ❤️

> A solution for writing reliable tests using any Web UI testing framework.

### [@cybernaut/puppeteer][package-puppeteer] ⭐️

> Convenience functions for using [Puppeteer][external-puppeteer] with [`@cybernaut/test`][package-test].

## Development

### Installing dependencies and bootstrapping packages

```sh
npm install
```

### Upgrading dependencies

```sh
npm run upgrade
```

### Compiling sources and running unit tests continuously

```sh
npm run watch
```

### Running CI tests

```sh
npm test
```

### Formatting sources

By default, a [Git Hook][external-git-hook] is installed to automatically format all files of a commit.
Manually, it can be executed with the following command:

```sh
npm run format
```

### Committing a change

```sh
npm run commit
```

### Releasing a new version

```sh
npm run release
```

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE
[cybernaut-logo]: https://cybernaut.js.org/logo.svg
[cybernaut-website]: https://cybernaut.js.org/

[package-puppeteer]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/puppeteer
[package-test]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/test

[readme-test]: https://github.com/clebert/cybernaut/blob/master/@cybernaut/test/README.md

[external-git-hook]: https://git-scm.com/docs/githooks
[external-puppeteer]: https://github.com/GoogleChrome/puppeteer
