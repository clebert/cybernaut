# @cybernaut/mocks

> Shared [mock objects][mock-object].

## Installation

```sh
npm install --save-dev @cybernaut/mocks @types/jest
```

*Note: [TypeScript][type-script] users need to install [`@types/jest`][types-jest] as a dev dependency.*

## Type definitions

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

*Note: The type definitions for `Action<T>` and `Condition<T>` can be found [here][cybernaut-types-type-definitions].*

---
Built by (c) Clemens Akens. Released under the MIT license.

[cybernaut-types-type-definitions]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/types#type-definitions
[mock-object]: https://en.wikipedia.org/wiki/Mock_object
[type-script]: http://www.typescriptlang.org/
[types-jest]: https://www.npmjs.com/package/@types/jest
