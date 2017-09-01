import {Accessor} from '@cybernaut/types/lib/Accessor';
import {ConditionBuilder} from './ConditionBuilder';
import {Loggable} from './Loggable';

export class Property extends Loggable {
  private readonly accessor: Accessor;

  public constructor(description: string, accessor: Accessor) {
    super(description, ['accessor']);

    this.accessor = accessor;
  }

  public get is(): ConditionBuilder {
    return new ConditionBuilder(this.log, this.accessor, false);
  }

  public get isNot(): ConditionBuilder {
    return new ConditionBuilder(this.log, this.accessor, true);
  }
}
