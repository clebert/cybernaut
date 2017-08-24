# @cybernaut/types

[![Package Version][npm-cybernaut-types-badge]][npm-cybernaut-types]
[![Build Status][travis-ci-badge]][travis-ci]
[![Coverage Status][coveralls-badge]][coveralls]

> Shared [TypeScript][type-script] type definitions.

## Installation

```sh
npm install --save @cybernaut/types
```

## Type definitions

### @cybernaut/types/lib/Implementation

```ts
export type Implementation<T> = () => Promise<T>;
```

### @cybernaut/types/lib/Action

```ts
import {Implementation} from '@cybernaut/types/lib/Implementation';

export interface Action<T> {
  readonly description: string;
  readonly implementation: Implementation<T>;
}
```

### @cybernaut/types/lib/Accessor

```ts
export type Accessor<T> = () => Promise<T>;
```

### @cybernaut/types/lib/Predicate

```ts
export type Predicate<T> = (actualValue: T) => boolean;
```

### @cybernaut/types/lib/Condition

```ts
import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Predicate} from '@cybernaut/types/lib/Predicate';

export interface Condition<T> {
  readonly description: string;
  readonly accessor: Accessor<T>;
  readonly predicate: Predicate<T>;
  readonly negated: boolean;
}
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[npm-cybernaut-types]: https://www.npmjs.com/package/@cybernaut/types
[npm-cybernaut-types-badge]: https://img.shields.io/npm/v/@cybernaut/types.svg
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[type-script]: http://www.typescriptlang.org/
