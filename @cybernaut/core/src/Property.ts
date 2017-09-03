import {Accessor} from '@cybernaut/types/lib/Accessor';
import {getRecording} from '@cybernaut/utils/lib/getRecording';
import {recordable} from '@cybernaut/utils/lib/recordable';
import {ConditionBuilder} from './ConditionBuilder';

export class Property {
  private readonly accessor: Accessor;

  public constructor(description: string, accessor: Accessor) {
    this.accessor = accessor;

    return recordable<Property>(description, ['accessor'])(this);
  }

  public get is(): ConditionBuilder {
    return new ConditionBuilder(getRecording(this), this.accessor, false);
  }

  public get isNot(): ConditionBuilder {
    return new ConditionBuilder(getRecording(this), this.accessor, true);
  }
}
