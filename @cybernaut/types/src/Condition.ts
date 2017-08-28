import {Accessor} from './Accessor';
import {Predicate} from './Predicate';

export interface Condition {
  readonly description: string;
  readonly accessor: Accessor;
  readonly predicate: Predicate;
  readonly negated: boolean;
}
