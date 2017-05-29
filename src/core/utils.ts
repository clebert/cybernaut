// tslint:disable no-any no-object-literal-type-assertion

import {inspect} from 'util';

export function format(value: any): string {
  return inspect(value, {breakLength: Infinity} as any);
}

export async function sleep(duration: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, duration);
  });
}
