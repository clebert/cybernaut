# ![Cybernaut](https://clebert.github.io/cybernaut/images/logo.svg)

[![Build Status](https://travis-ci.org/clebert/cybernaut.svg?branch=master)](https://travis-ci.org/clebert/cybernaut)

> Reliable, automated web UI testing in BDD-style.

## Packages

Cybernaut is a multi-package repository (sometimes called [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)).

### For end users

#### [@cybernaut/engine](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/engine)

> An engine for reliably asserting/verifying conditions and for reliably performing actions.

#### [@cybernaut/chromeless](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/chromeless)

> A [@cybernaut/engine](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/engine)-compatible API for [Chromeless](https://github.com/graphcool/chromeless).

#### @cybernaut/selenium (planned)

> A [@cybernaut/engine](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/engine)-compatible API for [Selenium WebDriver](http://www.seleniumhq.org/projects/webdriver/).

### For API developers

#### [@cybernaut/core](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/core)

> The foundation (the core) of all [@cybernaut/engine](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/engine)-compatible APIs.

#### [@cybernaut/mocks](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/mocks)

> Shared [mock objects](https://en.wikipedia.org/wiki/Mock_object).

#### [@cybernaut/types](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/types)

> Shared [TypeScript](http://www.typescriptlang.org/) type definitions.

#### [@cybernaut/utils](https://github.com/clebert/cybernaut/tree/master/%40cybernaut/utils)

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

*Note: By default, a [Git Hook](https://git-scm.com/docs/githooks) is installed to automatically format all files of a commit.*

### Checking formatting of sources

```sh
npm run format:check
```

---
Built by (c) Clemens Akens. Released under the MIT license.
