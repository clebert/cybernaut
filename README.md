# ![Cybernaut][cybernaut-logo]

[![Build Status][travis-ci-badge]][travis-ci]
[![Coverage Status][coveralls-badge]][coveralls]

> Reliable, automated web UI testing in BDD-style.

## Packages

Cybernaut is a multi-package repository (sometimes called [monorepo][monorepo]).

### For end users

#### [@cybernaut/engine][cybernaut-engine]

> An engine for reliably asserting/verifying conditions and for reliably performing actions.

#### [@cybernaut/chrome][cybernaut-chrome]

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

### Compiling sources

```sh
npm run compile
```

### Running unit tests

```sh
npm test
```

### Compiling sources and running unit tests continuously

```sh
npm run watch
```

### Linting sources

```sh
npm run lint
```

### Formatting sources

```sh
npm run format
```

*Note: By default, a [Git Hook][git-hook] is installed to automatically format all files of a commit.*

### Checking formatting of sources

```sh
npm run format:check
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[cybernaut-chrome]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/chrome
[cybernaut-core]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/core
[cybernaut-engine]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/engine
[cybernaut-logo]: https://clebert.github.io/cybernaut/images/logo.svg
[cybernaut-mocks]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/mocks
[cybernaut-types]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/types
[cybernaut-utils]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/utils
[git-hook]: https://git-scm.com/docs/githooks
[google-chrome]: https://www.google.com/chrome/
[mock-object]: https://en.wikipedia.org/wiki/Mock_object
[monorepo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[selenium-webdriver]: http://www.seleniumhq.org/projects/webdriver/
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[type-script]: http://www.typescriptlang.org/
