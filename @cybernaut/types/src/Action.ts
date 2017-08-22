import {Implementation} from './Implementation';

export interface Action<T> {
  readonly description: string;
  readonly implementation: Implementation<T>;
}
