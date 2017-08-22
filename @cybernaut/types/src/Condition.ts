import {Accessor} from './Accessor';
import {Predicate} from './Predicate';

export interface Condition<T> {
  readonly description: string;
  readonly accessor: Accessor<T>;
  readonly predicate: Predicate<T>;
  readonly negated: boolean;
}
