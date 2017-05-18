// tslint:disable no-any no-object-literal-type-assertion

import {inspect} from 'util';

export function format(value: any): string {
  return inspect(value, {breakLength: Infinity} as any);
}
