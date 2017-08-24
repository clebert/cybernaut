# @cybernaut/utils

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
