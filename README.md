# [![Cybernaut][cybernaut-logo]][cybernaut-website]

[![Package Version][npm-cybernaut-engine-badge]][npm-cybernaut-org]
[![Build Status][travis-ci-badge]][travis-ci]
[![Coverage Status][coveralls-badge]][coveralls]

> Reliable, automated web UI testing in BDD-style.

## Packages

Cybernaut is a multi-package repository (sometimes called [monorepo][monorepo]).

### For end users

#### [@cybernaut/engine][cybernaut-engine] ❤️

> The heart of Cybernaut: An engine for reliably asserting/verifying conditions and for reliably performing actions.

#### [@cybernaut/chrome][cybernaut-chrome] 🔥

> A [`@cybernaut/engine`][cybernaut-engine]-compatible API for [Google Chrome][google-chrome].

#### @cybernaut/selenium (planned)

> A [`@cybernaut/engine`][cybernaut-engine]-compatible API for [Selenium WebDriver][selenium-webdriver].

### For API developers

#### [@cybernaut/core][cybernaut-core]

> The foundation (the core) of all [`@cybernaut/engine`][cybernaut-engine]-compatible APIs.

#### [@cybernaut/mocks][cybernaut-mocks]

> Shared [mock objects][mock-object].

#### [@cybernaut/types][cybernaut-types]

> Shared [TypeScript][type-script] type definitions.

#### [@cybernaut/utils][cybernaut-utils]

> Shared utility functions.

## Development

### Installing dependencies and bootstrapping packages

```sh
npm install
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

```sh
npm run format
```

*Note: By default, a [Git Hook][git-hook] is installed to automatically format all files of a commit.*

### Releasing a new version

```sh
npm run release
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[cybernaut-chrome]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/chrome
[cybernaut-core]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/core
[cybernaut-engine]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/engine
[cybernaut-logo]: https://clebert.github.io/cybernaut/logo.svg
[cybernaut-mocks]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/mocks
[cybernaut-types]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types
[cybernaut-utils]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/utils
[cybernaut-website]: https://cybernaut.js.org/
[git-hook]: https://git-scm.com/docs/githooks
[google-chrome]: https://www.google.com/chrome/
[mock-object]: https://en.wikipedia.org/wiki/Mock_object
[monorepo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[npm-cybernaut-engine-badge]: https://img.shields.io/npm/v/@cybernaut/engine.svg
[npm-cybernaut-org]: https://www.npmjs.com/org/cybernaut
[selenium-webdriver]: http://www.seleniumhq.org/projects/webdriver/
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[type-script]: http://www.typescriptlang.org/
