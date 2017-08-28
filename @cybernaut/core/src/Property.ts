import {Accessor} from '@cybernaut/types/lib/Accessor';
import {ConditionBuilder} from './ConditionBuilder';
import {Describable} from './Describable';

export class Property extends Describable {
  private readonly accessor: Accessor;

  public constructor(description: string, accessor: Accessor) {
    super(description);

    this.accessor = accessor;
  }

  public get is(): ConditionBuilder {
    return new ConditionBuilder(this.description, this.accessor, false);
  }

  public get isNot(): ConditionBuilder {
    return new ConditionBuilder(this.description, this.accessor, true);
  }
}
