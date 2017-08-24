# @cybernaut/utils

[![Package Version][npm-cybernaut-utils-badge]][npm-cybernaut-utils]
[![Build Status][travis-ci-badge]][travis-ci]
[![Coverage Status][coveralls-badge]][coveralls]

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

[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[npm-cybernaut-utils]: https://www.npmjs.com/package/@cybernaut/utils
[npm-cybernaut-utils-badge]: https://img.shields.io/npm/v/@cybernaut/utils.svg
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
