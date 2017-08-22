import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Describable} from './Describable';
import {NumberConditionBuilder} from './NumberConditionBuilder';

export class NumberProperty extends Describable {
  private readonly accessor: Accessor<number>;

  public constructor(description: string, accessor: Accessor<number>) {
    super(description);

    this.accessor = accessor;
  }

  public get is(): NumberConditionBuilder {
    return new NumberConditionBuilder(this.description, this.accessor, false);
  }

  public get isNot(): NumberConditionBuilder {
    return new NumberConditionBuilder(this.description, this.accessor, true);
  }
}
