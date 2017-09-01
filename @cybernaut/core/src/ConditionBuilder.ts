import deepStrictEqual = require('deep-strict-equal');

import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';
import {Predicate} from '@cybernaut/types/lib/Predicate';
import {format} from '@cybernaut/utils/lib/format';
import {Loggable} from './Loggable';

export class ConditionBuilder extends Loggable {
  private readonly accessor: Accessor;
  private readonly negated: boolean;

  public constructor(
    description: string,
    accessor: Accessor,
    negated: boolean
  ) {
    super(description, ['accessor', 'negated', 'build']);

    this.accessor = accessor;
    this.negated = negated;
  }

  /* tslint:disable-next-line no-any */
  public equalTo(value: any): Condition {
    return this.build('any', this.log, actualValue => {
      if (actualValue !== actualValue && value !== value) {
        return true;
      }

      return deepStrictEqual(actualValue, value);
    });
  }

  public above(value: number): Condition {
    return this.build('number', this.log, actualValue => actualValue > value);
  }

  public atLeast(value: number): Condition {
    return this.build('number', this.log, actualValue => actualValue >= value);
  }

  public atMost(value: number): Condition {
    return this.build('number', this.log, actualValue => actualValue <= value);
  }

  public below(value: number): Condition {
    return this.build('number', this.log, actualValue => actualValue < value);
  }

  public between(minValue: number, maxValue: number): Condition {
    return this.build(
      'number',
      this.log,
      actualValue => actualValue >= minValue && actualValue <= maxValue
    );
  }

  public containing(value: string): Condition {
    return this.build(
      'string',
      this.log,
      actualValue => actualValue.indexOf(value) > -1
    );
  }

  public matching(value: RegExp): Condition {
    return this.build('string', this.log, actualValue =>
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
