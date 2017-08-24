# @cybernaut/engine

> The heart of Cybernaut: An engine for reliably asserting/verifying conditions and for reliably performing actions.

## Installation

```sh
npm install --save @cybernaut/engine
```

## Compatible APIs

- [`@cybernaut/chrome`][cybernaut-chrome]
- `@cybernaut/selenium` (planned)

## Usage example (JavaScript)

```js
const {Engine} = require('@cybernaut/engine/lib/Engine');

const {assert, perform, verify} = new Engine({
  retries: 1,
  retryDelay: 500
});

(async () => {
  await assert(aCondition);

  await perform(anAction);

  if (await verify(aCondition)) {
    // Do something ...
  }
})().catch(error => {
  console.error(error);

  process.exit(1);
});
```

## Type definitions

*Note: The type definitions for `Action<T>` and `Condition<T>` can be found [here][cybernaut-types-type-definitions].*

### @cybernaut/engine/lib/Engine

```ts
import {Action} from '@cybernaut/types/lib/Action';
import {Condition} from '@cybernaut/types/lib/Condition';

export interface EngineOptions {
  readonly retries: number; // Default: 4
  readonly retryDelay: number; // Default: 1000
}

export class Engine {
  public constructor(options?: Partial<EngineOptions>);

  public assert<T>(condition: Condition<T>): Promise<void>;
  public perform<T>(action: Action<T>): Promise<T>;
  public verify<T>(condition: Condition<T>): Promise<boolean>;
}
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[cybernaut-chrome]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/chrome
[cybernaut-types-type-definitions]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/types#type-definitions
