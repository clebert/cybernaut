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

### @cybernaut/utils/lib/getRecording

```ts
export function getRecording(recordable: object): string;
```

### @cybernaut/utils/lib/recordable

```ts
export function recordable<T extends object>(
  description: string,
  keysToIgnore?: string[]
): (target: T) => T;
```

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/utils.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/utils
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE
