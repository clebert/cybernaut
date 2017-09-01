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
- [`@cybernaut/types/lib/Condition`][type-definition-condition]
- [`@cybernaut/types/lib/Predicate`][type-definition-predicate]

### @cybernaut/core/lib/Loggable

```ts
export abstract class Loggable {
  protected readonly log: string;

  constructor(description: string, keysToIgnore: string[] = []);
}
```

### @cybernaut/core/lib/ConditionBuilder

```ts
import {Loggable} from '@cybernaut/core/lib/Loggable';
import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';
import {Predicate} from '@cybernaut/types/lib/Predicate';

export class ConditionBuilder extends Loggable {
  public constructor(description: string, accessor: Accessor, negated: boolean);

  public equalTo(value: any): Condition;

  public above(value: number): Condition;
  public atLeast(value: number): Condition;
  public atMost(value: number): Condition;
  public below(value: number): Condition;
  public between(minValue: number, maxValue: number): Condition;

  public containing(value: string): Condition;
  public matching(value: RegExp): Condition;
}
```

### @cybernaut/core/lib/Property

```ts
import {ConditionBuilder} from '@cybernaut/core/lib/ConditionBuilder';
import {Loggable} from '@cybernaut/core/lib/Loggable';
import {Accessor} from '@cybernaut/types/lib/Accessor';

export class Property extends Loggable {
  public constructor(description: string, accessor: Accessor);

  public readonly is: ConditionBuilder;
  public readonly isNot: ConditionBuilder;
}
```

---
Built by (c) Clemens Akens. Released under the terms of the [MIT License][cybernaut-license].

[badge-npm-image]: https://img.shields.io/npm/v/@cybernaut/core.svg
[badge-npm-link]: https://www.npmjs.com/package/@cybernaut/core
[badge-travis-image]: https://travis-ci.org/clebert/cybernaut.svg?branch=master
[badge-travis-link]: https://travis-ci.org/clebert/cybernaut
[badge-coveralls-image]: https://coveralls.io/repos/github/clebert/cybernaut/badge.svg?branch=master
[badge-coveralls-link]: https://coveralls.io/github/clebert/cybernaut?branch=master

[cybernaut-license]: https://github.com/clebert/cybernaut/blob/master/LICENSE

[package-engine]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/engine

[type-definition-accessor]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibaccessor
[type-definition-condition]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibcondition
[type-definition-predicate]: https://github.com/clebert/cybernaut/tree/master/@cybernaut/types#cybernauttypeslibpredicate
