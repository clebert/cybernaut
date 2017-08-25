# [![Cybernaut][cybernaut-logo]][cybernaut-website]

## Packages

Cybernaut is a multi-package repository (sometimes called [monorepo][external-monorepo]).

### For end users

#### [@cybernaut/engine][package-engine] ❤️

> The heart of Cybernaut: An engine for reliably asserting/verifying conditions and for reliably performing actions.

#### [@cybernaut/chrome][package-chrome] 🔥

> A [`@cybernaut/engine`][package-engine]-compatible API for [Google Chrome][external-google-chrome].

#### @cybernaut/selenium (planned)

> A [`@cybernaut/engine`][package-engine]-compatible API for [Selenium WebDriver][external-selenium-webdriver].

### For API developers

#### [@cybernaut/core][package-core]

> The foundation (the core) of all [`@cybernaut/engine`][package-engine]-compatible APIs.

#### [@cybernaut/mocks][package-mocks]

> Shared [mock objects][external-mock-object].

#### [@cybernaut/types][package-types]

> Shared [TypeScript][external-typescript] type definitions.

#### [@cybernaut/utils][package-utils]

> Shared utility functions.

[cybernaut-logo]: https://clebert.github.io/cybernaut/logo.svg
[cybernaut-website]: https://cybernaut.js.org/

[package-chrome]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/chrome
[package-core]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/core
[package-engine]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/engine
[package-mocks]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/mocks
[package-types]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types
[package-utils]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/utils

[external-google-chrome]: https://www.google.com/chrome/
[external-mock-object]: https://en.wikipedia.org/wiki/Mock_object
[external-monorepo]: https://github.com/babel/babel/blob/master/doc/design/monorepo.md
[external-typescript]: http://www.typescriptlang.org/
[external-selenium-webdriver]: http://www.seleniumhq.org/projects/webdriver/
