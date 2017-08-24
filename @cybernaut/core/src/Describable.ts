import {format} from '@cybernaut/utils/lib/format';

export abstract class Describable {
  protected description: string;

  public constructor(description: string) {
    this.description = description;

    const blacklist = new Set(['describeMethodCall', 'description']);

    return new Proxy(this, {
      get: (target, property) => {
        if (typeof property === 'string' && !blacklist.has(property)) {
          target.description = `${description}.${property}`;
        }

        return target[property as keyof this];
      }
    });
  }

  /* tslint:disable-next-line no-any */
  protected describeMethodCall(...args: any[]): string {
    return `${this.description}(${args.map(format).join(', ')})`;
  }
}
