import deepStrictEqual = require('deep-strict-equal');

import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';
import {Predicate} from '@cybernaut/types/lib/Predicate';
import {Describable} from './Describable';

export class GenericConditionBuilder<T> extends Describable {
  private readonly accessor: Accessor<T>;
  private readonly negated: boolean;

  public constructor(
    description: string,
    accessor: Accessor<T>,
    negated: boolean
  ) {
    super(description);

    this.accessor = accessor;
    this.negated = negated;
  }

  public equalTo(value: T): Condition<T> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(description, actualValue => {
      if (actualValue !== actualValue && value !== value) {
        return true;
      }

      return deepStrictEqual(actualValue, value);
    });
  }

  protected condition(
    description: string,
    predicate: Predicate<T>
  ): Condition<T> {
    const {accessor, negated} = this;

    return {description, accessor, predicate, negated};
  }
}
