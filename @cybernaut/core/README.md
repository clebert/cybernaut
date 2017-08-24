# @cybernaut/core

> The foundation (the core) of all [`@cybernaut/engine`][cybernaut-engine]-compatible APIs.

## Installation

```sh
npm install --save @cybernaut/core
```

## Type definitions

### @cybernaut/core/lib/Describable

```ts
export abstract class Describable {
  protected description: string;

  public constructor(description: string);

  protected describeMethodCall(...args: any[]): string;
}
```

### @cybernaut/core/lib/GenericConditionBuilder

```ts
import {Describable} from '@cybernaut/core/lib/Describable';
import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';
import {Predicate} from '@cybernaut/types/lib/Predicate';

export class GenericConditionBuilder<T> extends Describable {
  public constructor(description: string, accessor: Accessor<T>, negated: boolean);

  public equalTo(value: T): Condition<T>;

  protected condition(description: string, predicate: Predicate<T>): Condition<T>;
}
```

### @cybernaut/core/lib/GenericProperty

```ts
import {Describable} from '@cybernaut/core/lib/Describable';
import {GenericConditionBuilder} from '@cybernaut/core/lib/GenericConditionBuilder';
import {Accessor} from '@cybernaut/types/lib/Accessor';

export class GenericProperty<T> extends Describable {
  public constructor(description: string, accessor: Accessor<T>);

  public readonly is: GenericConditionBuilder<T>;
  public readonly isNot: GenericConditionBuilder<T>;
}
```

### @cybernaut/core/lib/NumberConditionBuilder

```ts
import {GenericConditionBuilder} from '@cybernaut/core/lib/GenericConditionBuilder';
import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';

export class NumberConditionBuilder extends GenericConditionBuilder<number> {
  public constructor(description: string, accessor: Accessor<number>, negated: boolean);

  public above(value: number): Condition<number>;
  public atLeast(value: number): Condition<number>;
  public atMost(value: number): Condition<number>;
  public below(value: number): Condition<number>;
  public between(minValue: number, maxValue: number): Condition<number>;
}
```

### @cybernaut/core/lib/NumberProperty

```ts
import {Describable} from '@cybernaut/core/lib/Describable';
import {NumberConditionBuilder} from '@cybernaut/core/lib/NumberConditionBuilder';
import {Accessor} from '@cybernaut/types/lib/Accessor';

export class NumberProperty extends Describable {
  public constructor(description: string, accessor: Accessor<number>);

  public readonly is: NumberConditionBuilder;
  public readonly isNot: NumberConditionBuilder;
}
```

### @cybernaut/core/lib/StringConditionBuilder

```ts
import {GenericConditionBuilder} from '@cybernaut/core/lib/GenericConditionBuilder';
import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';

export class StringConditionBuilder extends GenericConditionBuilder<string> {
  public constructor(description: string, accessor: Accessor<string>, negated: boolean);

  public containing(value: string): Condition<string>;
  public matching(value: RegExp): Condition<string>;
}
```

### @cybernaut/core/lib/StringProperty

```ts
import {Describable} from '@cybernaut/core/lib/Describable';
import {StringConditionBuilder} from '@cybernaut/core/lib/StringConditionBuilder';
import {Accessor} from '@cybernaut/types/lib/Accessor';

export class StringProperty extends Describable {
  public constructor(description: string, accessor: Accessor<string>);

  public readonly is: StringConditionBuilder;
  public readonly isNot: StringConditionBuilder;
}
```

*Note: The type definitions for `Accessor<T>`, `Condition<T>`, and `Predicate<T>` can be found [here][cybernaut-types-type-definitions].*

---
Built by (c) Clemens Akens. Released under the MIT license.

[cybernaut-engine]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/engine
[cybernaut-types-type-definitions]: https://github.com/clebert/cybernaut/tree/master/%40cybernaut/types#type-definitions