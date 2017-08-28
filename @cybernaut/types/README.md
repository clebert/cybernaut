# @cybernaut/types

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> Shared [TypeScript][external-typescript] type definitions.

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
export type Accessor = () => Promise<any>;
```

### @cybernaut/types/lib/Predicate

```ts
export type Predicate = (actualValue: any) => boolean;
```

### @cybernaut/types/lib/Condition

```ts
import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Predicate} from '@cybernaut/types/lib/Predicate';

export interface Condition {
  readonly description: string;
  readonly accessor: Accessor;
  readonly predicate: Predicate;
  readonly negated: boolean;
}
```

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/types.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/types
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE

[external-typescript]: http://www.typescriptlang.org/
