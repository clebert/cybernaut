import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Condition} from '@cybernaut/types/lib/Condition';
import {GenericConditionBuilder} from './GenericConditionBuilder';

export class StringConditionBuilder extends GenericConditionBuilder<string> {
  public constructor(
    description: string,
    accessor: Accessor<string>,
    negated: boolean
  ) {
    super(description, accessor, negated);
  }

  public containing(value: string): Condition<string> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(
      description,
      actualValue => actualValue.indexOf(value) > -1
    );
  }

  public matching(value: RegExp): Condition<string> {
    const description = this.describeMethodCall(...arguments);

    return this.condition(description, actualValue => value.test(actualValue));
  }
}
