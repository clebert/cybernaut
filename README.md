# [![Cybernaut][cybernaut-logo]][cybernaut-website]

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]
[![GitHub Stars][badge-github-image]][badge-github-link]

> Reliable, automated web UI testing in BDD-style.

## Packages

Cybernaut is a multi-package repository (sometimes called [monorepo][external-monorepo]).

### For end users

#### [@cybernaut/engine][package-engine] ❤️

> The heart of Cybernaut: An engine for reliably asserting/verifying conditions and for reliably performing actions.

#### [@cybernaut/chrome][package-chrome] 🔥

> A [`@cybernaut/engine`][package-engine]-compatible API for [Google Chrome][external-google-chrome].

### For API developers

#### [@cybernaut/core][package-core]

> The foundation (the core) of all [`@cybernaut/engine`][package-engine]-compatible APIs.

#### [@cybernaut/mocks][package-mocks]

> Shared [mock objects][external-mock-object].

#### [@cybernaut/types][package-types]

> Shared [TypeScript][external-typescript] type definitions.

#### [@cybernaut/utils][package-utils]

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

*Note: By default, a [Git Hook][external-git-hook] is installed to automatically format all files of a commit.*

### Releasing a new version

```sh
npm run release
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/engine.svg
[badge-npm-link]: https://www.npmjs.com/org/cybernaut
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master
[badge-github-image]: https://img.shields.io/github/stars/clebert/cybernaut.svg?style=social&label=GitHub&style=plastic
[badge-github-link]: https://github.com/clebert/cybernaut

[cybernaut-logo]: https://clebert.github.io/cybernaut/logo.svg
[cybernaut-website]: https://cybernaut.js.org/

[package-chrome]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/chrome
[package-core]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/core
[package-engine]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/engine
[package-mocks]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/mocks
[package-types]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types
[package-utils]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/utils

[external-git-hook]: https://git-scm.com/docs/githooks
[external-google-chrome]: https://www.google.com/chrome/
[external-mock-object]: https://en.wikipedia.org/wiki/Mock_object
[external-monorepo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[external-typescript]: http://www.typescriptlang.org/
