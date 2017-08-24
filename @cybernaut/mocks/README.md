# @cybernaut/mocks

[![Package Version][npm-cybernaut-mocks-badge]][npm-cybernaut-mocks]
[![Build Status][travis-ci-badge]][travis-ci]
[![Coverage Status][coveralls-badge]][coveralls]

> Shared [mock objects][mock-object].

## Installation

```sh
npm install --save-dev @cybernaut/mocks @types/jest
```

*Note: [TypeScript][type-script] users need to install [`@types/jest`][types-jest] as a dev dependency.*

## Type definitions

*Note: The type definitions for `Action<T>` and `Condition<T>` can be found [here][cybernaut-types-type-definitions].*

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

[coveralls]: https://coveralls.io/github/clebert/cybernaut?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[cybernaut-types-type-definitions]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#type-definitions
[mock-object]: https://en.wikipedia.org/wiki/Mock_object
[npm-cybernaut-mocks]: https://www.npmjs.com/package/@cybernaut/mocks
[npm-cybernaut-mocks-badge]: https://img.shields.io/npm/v/@cybernaut/mocks.svg
[travis-ci]: https://travis-ci.org/clebert/cybernaut
[travis-ci-badge]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[type-script]: http://www.typescriptlang.org/
[types-jest]: https://www.npmjs.com/package/@types/jest
