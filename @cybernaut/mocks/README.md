# @cybernaut/mocks

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]
[![GitHub Stars][badge-github-image]][badge-github-link]

> Shared [mock objects][external-mock-object].

## Installation

```sh
npm install --save-dev @cybernaut/mocks @types/jest
```

*Note: [TypeScript][external-typescript] users need to install [`@types/jest`][external-types-jest] as a dev dependency.*

## Type definitions

*Note: The type definitions for `Action<T>` and `Condition<T>` can be found [here][type-definitions-cybernaut-types].*

### @cybernaut/mocks/lib/MockAction

```ts
/// <reference types="jest" />

import {Action} from '@cybernaut/types/lib/Action';

export class MockAction<T> implements Action<T> {
  public readonly description: string;
  public readonly implementation: jest.Mock<Promise<T>>;

  public constructor(description: string);
}
```

### @cybernaut/mocks/lib/MockCondition

```ts
/// <reference types="jest" />

import {Condition} from '@cybernaut/types/lib/Condition';

export class MockCondition<T> implements Condition<T> {
  public readonly description: string;
  public readonly accessor: jest.Mock<T>;
  public readonly predicate: jest.Mock<T>;
  public readonly negated: boolean;

  public constructor(description: string, negated: boolean);
}
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/mocks.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/mocks
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master
[badge-github-image]: https://img.shields.io/github/stars/clebert/cybernaut.svg?style=social&label=GitHub&style=plastic
[badge-github-link]: https://github.com/clebert/cybernaut

[external-mock-object]: https://en.wikipedia.org/wiki/Mock_object
[external-typescript]: http://www.typescriptlang.org/
[external-types-jest]: https://www.npmjs.com/package/@types/jest

[type-definitions-cybernaut-types]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#type-definitions
