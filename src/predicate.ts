import deepStrictEqual = require('deep-strict-equal');

import {Description} from './description';

export interface Predicate<T> {
  readonly description: Description;

  test(value: T): boolean;
}

export class PredicateBuilder {
  private _at: string = '';
  private _be: string = '';
  private _not: string = '';

  public get at(): this {
    this._at = ' at';

    return this;
  }

  public get be(): this {
    this._be = ' be';

    return this;
  }

  public get not(): this {
    this._not = ' not';

    return this;
  }

  public contain(expectedValue: string): Predicate<string> {
    const description = {template: 'contain {}', args: [expectedValue]};

    return this._build<string>(
      description, actualValue => actualValue.indexOf(expectedValue) > -1
    );
  }

  public equal<T>(expectedValue: T): Predicate<T> {
    const description = {template: 'equal {}', args: [expectedValue]};

    return this._build<T>(
      description, actualValue => deepStrictEqual(actualValue, expectedValue)
    );
  }

  public match(regex: RegExp): Predicate<string> {
    const description = {template: 'match {}', args: [regex]};

    return this._build<string>(
      description, actualValue => regex.test(actualValue)
    );
  }

  public above(expectedValue: number): Predicate<number> {
    const description = {template: 'above {}', args: [expectedValue]};

    return this._build<number>(
      description, actualValue => actualValue > expectedValue
    );
  }

  public least(expectedValue: number): Predicate<number> {
    const description = {template: 'least {}', args: [expectedValue]};

    return this._build<number>(
      description, actualValue => actualValue >= expectedValue
    );
  }

  public below(expectedValue: number): Predicate<number> {
    const description = {template: 'below {}', args: [expectedValue]};

    return this._build<number>(
      description, actualValue => actualValue < expectedValue
    );
  }

  public most(expectedValue: number): Predicate<number> {
    const description = {template: 'most {}', args: [expectedValue]};

    return this._build<number>(
      description, actualValue => actualValue <= expectedValue
    );
  }

  private _build<T>(
    {args, template}: Description, test: (value: T) => boolean
  ): Predicate<T> {
    return {
      description: {
        template: `should${this._not}${this._be}${this._at} ${template}`, args
      },
      test: this._not ? value => !test(value) : test
    };
  }
}
