# [![Cybernaut][cybernaut-logo]][cybernaut-website]

[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> Reliable, automated Web UI testing in BDD-style.

## Packages

Cybernaut is a multi-package repository.

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

*Note: Please also install [Google Chrome][external-google-chrome] 59 or later.*

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

```sh
npm run format
```

*Note: By default, a [Git Hook][external-git-hook] is installed to automatically format all files of a commit.*

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

[package-chrome]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/chrome
[package-core]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/core
[package-engine]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/engine
[package-mocks]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/mocks
[package-types]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types
[package-utils]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/utils

[external-git-hook]: https://git-scm.com/docs/githooks
[external-google-chrome]: https://www.google.com/chrome/
[external-mock-object]: https://en.wikipedia.org/wiki/Mock_object
[external-typescript]: http://www.typescriptlang.org/
