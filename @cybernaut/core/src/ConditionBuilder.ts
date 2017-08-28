import deepStrictEqual = require('deep-strict-equal');

import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';
import {Predicate} from '@cybernaut/types/lib/Predicate';
import {format} from '@cybernaut/utils/lib/format';
import {Describable} from './Describable';

export class ConditionBuilder extends Describable {
  private readonly accessor: Accessor;
  private readonly negated: boolean;

  public constructor(
    description: string,
    accessor: Accessor,
    negated: boolean
  ) {
    super(description);

    this.accessor = accessor;
    this.negated = negated;
  }

  /* tslint:disable-next-line no-any */
  public equalTo(value: any): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build('any', description, actualValue => {
      if (actualValue !== actualValue && value !== value) {
        return true;
      }

      return deepStrictEqual(actualValue, value);
    });
  }

  public above(value: number): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build(
      'number',
      description,
      actualValue => actualValue > value
    );
  }

  public atLeast(value: number): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build(
      'number',
      description,
      actualValue => actualValue >= value
    );
  }

  public atMost(value: number): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build(
      'number',
      description,
      actualValue => actualValue <= value
    );
  }

  public below(value: number): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build(
      'number',
      description,
      actualValue => actualValue < value
    );
  }

  public between(minValue: number, maxValue: number): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build(
      'number',
      description,
      actualValue => actualValue >= minValue && actualValue <= maxValue
    );
  }

  public containing(value: string): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build(
      'string',
      description,
      actualValue => actualValue.indexOf(value) > -1
    );
  }

  public matching(value: RegExp): Condition {
    const description = this.describeMethodCall(...arguments);

    return this.build('string', description, actualValue =>
      value.test(actualValue)
    );
  }

  private build(
    type: 'any' | 'number' | 'string',
    description: string,
    predicate: Predicate
  ): Condition {
    const {accessor, negated} = this;

    return {
      description,
      accessor,
      predicate: actualValue => {
        if (type !== 'any') {
          /* tslint:disable-next-line strict-type-predicates */
          if (typeof actualValue !== type) {
            throw new Error(
              `Expected an actual value of type ${type}, got: ${format(
                actualValue
              )}`
            );
          }
        }

        return predicate(actualValue);
      },
      negated
    };
  }
}
