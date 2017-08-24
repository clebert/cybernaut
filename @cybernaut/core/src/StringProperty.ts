import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Describable} from './Describable';
import {StringConditionBuilder} from './StringConditionBuilder';

export class StringProperty extends Describable {
  private readonly accessor: Accessor<string>;

  public constructor(description: string, accessor: Accessor<string>) {
    super(description);

    this.accessor = accessor;
  }

  public get is(): StringConditionBuilder {
    return new StringConditionBuilder(this.description, this.accessor, false);
  }

  public get isNot(): StringConditionBuilder {
    return new StringConditionBuilder(this.description, this.accessor, true);
  }
}
