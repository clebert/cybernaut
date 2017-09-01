import {format} from '@cybernaut/utils/lib/format';

export abstract class Loggable {
  private readonly description: string;

  private additionalDescription: string;

  /* istanbul ignore next */
  public constructor(description: string, keysToIgnore: string[] = []) {
    const blacklist = new Set([...keysToIgnore, 'log']);

    this.description = this.additionalDescription = description;

    return new Proxy(this, {
      get: (target, property, receiver) => {
        let value: this[keyof this];

        if (typeof property !== 'string' || blacklist.has(property)) {
          value = target[property as keyof this];

          return value === target ? receiver : value;
        }

        const additionalDescription = target.additionalDescription;

        target.additionalDescription += `.${property}`;

        value = target[property as keyof this];

        /* tslint:disable-next-line strict-type-predicates */
        if (typeof value !== 'function') {
          return value === target ? receiver : value;
        }

        target.additionalDescription = additionalDescription;

        /* tslint:disable-next-line no-any */
        return (...args: any[]) => {
          target.additionalDescription += `.${property}(${args
            .map(format)
            .join(', ')})`;

          /* tslint:disable-next-line ban-types */
          return (value as Function).apply(receiver, args);
        };
      }
    });
  }

  protected get log(): string {
    try {
      return this.additionalDescription;
    } finally {
      this.additionalDescription = this.description;
    }
  }
}
