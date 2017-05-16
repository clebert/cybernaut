import {Key} from 'selenium-webdriver';
import {inspect} from 'util';

// tslint:disable
export function format(value: any): string {
  return inspect(value, {breakLength: Infinity} as any);
}
// tslint:enable

const KeyName = Object.create(null);

for (const keyName of Object.keys(Key).sort() as (keyof Key)[]) {
  KeyName[Key[keyName]] = keyName;
}

export function serialize(char: string): string {
  return KeyName[char] ? 'Key.' + String(KeyName[char]) : `'${char}'`;
}

export async function sleep(durationInMillis: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, durationInMillis);
  });
}
