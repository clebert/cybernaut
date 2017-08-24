import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';
import {GenericConditionBuilder} from './GenericConditionBuilder';

export class NumberConditionBuilder extends GenericConditionBuilder<number> {
  public constructor(
    description: string,
    accessor: Accessor<number>,
    negated: boolean
  ) {
    super(description, accessor, negated);
  }

  public above(value: number): Condition<number> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(description, actualValue => actualValue > value);
  }

  public atLeast(value: number): Condition<number> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(description, actualValue => actualValue >= value);
  }

  public atMost(value: number): Condition<number> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(description, actualValue => actualValue <= value);
  }

  public below(value: number): Condition<number> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(description, actualValue => actualValue < value);
  }

  public between(minValue: number, maxValue: number): Condition<number> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(
      description,
      actualValue => actualValue >= minValue && actualValue <= maxValue
    );
  }
}
