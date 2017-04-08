import {Key} from 'selenium-webdriver';

export async function sleep(
  duration: number,
  /* istanbul ignore next */
  _setTimeout: typeof setTimeout = setTimeout
): Promise<void> {
  return new Promise<void>(resolve => {
    _setTimeout(resolve, duration);
  });
}

const KeyName = Object.create(null);

for (const keyName of Object.keys(Key) as (keyof Key)[]) {
  KeyName[Key[keyName]] = keyName;
}

export function translate(char: string): string {
  return KeyName[char] ? 'Key.' + KeyName[char] : char;
}
