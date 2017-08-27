# @cybernaut/utils

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> Shared utility functions.

## Installation

```sh
npm install --save @cybernaut/utils
```

## Type definitions

### @cybernaut/utils/lib/format

```ts
export function format(value: any): string;
```

### @cybernaut/utils/lib/getOption

```ts
export function getOption<T, K extends keyof T>(options: Partial<T> | undefined, key: K, defaultValue: T[K]): T[K];
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/utils.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/utils
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master
