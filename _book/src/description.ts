import {inspect} from 'util';

export interface Description {
  readonly template: string;
  readonly args?: any[]; // tslint:disable-line no-any
}

export function format(description: Description): string {
  const args = (description.args || []).map(arg => inspect(arg, {
    breakLength: Infinity
  } as any)); // tslint:disable-line no-any

  const formattedString = description.template.replace(/\{\}/g, () => {
    if (args.length === 0) {
      throw new Error('Missing format argument');
    }

    return args.shift() as string;
  });

  if (args.length > 0) {
    throw new Error('Superfluous format argument');
  }

  return formattedString;
}
