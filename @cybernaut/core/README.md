# @cybernaut/core

[![Package Version][badge-npm-image]][badge-npm-link]
[![Build Status][badge-travis-image]][badge-travis-link]
[![Coverage Status][badge-coveralls-image]][badge-coveralls-link]

> The foundation (the core) of all [`@cybernaut/engine`][package-engine]-compatible APIs.

## Installation

```sh
npm install --save @cybernaut/core
```

## Type definitions

### External imports

- [`@cybernaut/types/lib/Accessor`][type-definition-accessor]
- [`@cybernaut/types/lib/Predicate`][type-definition-predicate]
- [`@cybernaut/types/lib/Condition`][type-definition-condition]

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

---
Built by (c) Clemens Akens. Released under the MIT license.

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/core.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/core
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[package-engine]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/engine

[type-definition-accessor]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibaccessor
[type-definition-condition]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibcondition
[type-definition-predicate]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibpredicate
