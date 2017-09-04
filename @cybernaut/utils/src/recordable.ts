import {format} from './format';

/* tslint:disable-next-line no-any */
function formatArgs(args: any[]): string {
  return args.map(format).join(', ');
}

export function recordable<T extends object>(
  description: string,
  keysToIgnore: string[] = []
): (target: T) => T {
  const blacklist = new Set(keysToIgnore);

  return (target: T) => {
    let additionalDescription = description;

    Object.defineProperty(target, Symbol.for('recording'), {
      get: () => {
        try {
          return additionalDescription;
        } finally {
          additionalDescription = description;
        }
      }
    });

    return new Proxy(target, {
      get: (_, property, proxy) => {
        if (typeof property !== 'string') {
          /* tslint:disable-next-line no-any */
          return (target as any)[property];
        }

        const previousAdditionalDescription = additionalDescription;

        if (!blacklist.has(property)) {
          additionalDescription += `.${property}`;
        }

        const value = target[property as keyof T];

        /* tslint:disable-next-line strict-type-predicates */
        if (typeof value !== 'function') {
          return value === target ? proxy : value;
        }

        additionalDescription = previousAdditionalDescription;

        /* tslint:disable-next-line no-any */
        return (...args: any[]) => {
          if (!blacklist.has(property)) {
            additionalDescription += `.${property}(${formatArgs(args)})`;
          }

          /* tslint:disable-next-line ban-types */
          const result = (value as Function).apply(proxy, args);

          return result === target ? proxy : result;
        };
      }
    });
  };
}
