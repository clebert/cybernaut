# @cybernaut/types

> Shared [TypeScript][type-script] type definitions.

## Installation

```sh
npm install --save @cybernaut/types
```

## Type definitions

```ts
type Implementation<T> = () => Promise<T>;

interface Action<T> {
    readonly description: string;
    readonly implementation: Implementation<T>;
}

type Accessor<T> = () => Promise<T>;
type Predicate<T> = (actualValue: T) => boolean;

interface Condition<T> {
    readonly description: string;
    readonly accessor: Accessor<T>;
    readonly predicate: Predicate<T>;
    readonly negated: boolean;
}
```

---
Built by (c) Clemens Akens. Released under the MIT license.

[type-script]: http://www.typescriptlang.org/
