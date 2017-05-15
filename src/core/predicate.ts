import deepStrictEqual = require('deep-strict-equal');

import {inspect} from 'util';

export interface Predicate<T> {
  readonly description: string;

  compare(actualValue: T): string;
  test(actualValue: T): boolean;
}

// tslint:disable no-any
function format(value: any): string {
  return inspect(value, {breakLength: Infinity} as any);
}
// tslint:enable no-any

export class PredicateBuilder {
  public contain(value: string): Predicate<string> {
    const description = 'contain ' + format(value);

    return {
      description: 'should ' + description,
      compare(actualValue: string): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: string): boolean {
        return actualValue.indexOf(value) > -1;
      }
    };
  }

  public equal<T>(value: T): Predicate<T> {
    const description = 'equal ' + format(value);

    return {
      description: 'should ' + description,
      compare(actualValue: T): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: T): boolean {
        if (actualValue !== actualValue && value !== value) {
          return true;
        }

        return deepStrictEqual(actualValue, value);
      }
    };
  }

  public match(value: RegExp): Predicate<string> {
    const description = 'match ' + format(value);

    return {
      description: 'should ' + description,
      compare(actualValue: string): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: string): boolean {
        return value.test(actualValue);
      }
    };
  }

  public beGreaterThan(value: number): Predicate<number> {
    const description = 'be greater than ' + format(value);

    return {
      description: 'should ' + description,
      compare(actualValue: number): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: number): boolean {
        return actualValue > value;
      }
    };
  }

  public beGreaterThanOrEqual(value: number): Predicate<number> {
    const description = 'be greater than or equal ' + format(value);

    return {
      description: 'should ' + description,
      compare(actualValue: number): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: number): boolean {
        return actualValue >= value;
      }
    };
  }

  public beLessThan(value: number): Predicate<number> {
    const description = 'be less than ' + format(value);

    return {
      description: 'should ' + description,
      compare(actualValue: number): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: number): boolean {
        return actualValue < value;
      }
    };
  }

  public beLessThanOrEqual(value: number): Predicate<number> {
    const description = 'be less than or equal ' + format(value);

    return {
      description: 'should ' + description,
      compare(actualValue: number): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: number): boolean {
        return actualValue <= value;
      }
    };
  }

  public beBetween(minValue: number, maxValue: number): Predicate<number> {
    const description =
      `be between ${format(minValue)} and ${format(maxValue)}, inclusive`;

    return {
      description: 'should ' + description,
      compare(actualValue: number): string {
        return `expected ${format(actualValue)} to ` + description;
      },
      test(actualValue: number): boolean {
        return actualValue >= minValue && actualValue <= maxValue;
      }
    };
  }
}
