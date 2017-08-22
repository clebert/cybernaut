import {Accessor} from '@cybernaut/types/lib/Accessor';
import {Describable} from './Describable';
import {GenericConditionBuilder} from './GenericConditionBuilder';

export class GenericProperty<T> extends Describable {
  private readonly accessor: Accessor<T>;

  public constructor(description: string, accessor: Accessor<T>) {
    super(description);

    this.accessor = accessor;
  }

  public get is(): GenericConditionBuilder<T> {
    return new GenericConditionBuilder(this.description, this.accessor, false);
  }

  public get isNot(): GenericConditionBuilder<T> {
    return new GenericConditionBuilder(this.description, this.accessor, true);
  }
}
