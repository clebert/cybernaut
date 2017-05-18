import deepStrictEqual = require('deep-strict-equal');

import {format} from '../utils/format';

export interface Predicate<T> {
  readonly description: string;

  compare(actualValue: T): string;
  test(actualValue: T): boolean;
}

abstract class AbstractPredicate<T> implements Predicate<T> {
  private readonly _not: string;

  public constructor(not: string) {
    this._not = not;
  }

  public get description(): string {
    return 'should ' + this._describe(this._not);
  }

  public compare(actualValue: T): string {
    return `expected ${format(actualValue)} to ` + this._describe(this._not);
  }

  public test(actualValue: T): boolean {
    return this._not ? !this._test(actualValue) : this._test(actualValue);
  }

  protected abstract _describe(not: string): string;
  protected abstract _test(actualValue: T): boolean;
}

class ContainPredicate extends AbstractPredicate<string> {
  private readonly _value: string;

  public constructor(value: string, not: string) {
    super(not);

    this._value = value;
  }

  protected _describe(not: string): string {
    return `${not}contain ${format(this._value)}`;
  }

  protected _test(actualValue: string): boolean {
    return actualValue.indexOf(this._value) > -1;
  }
}

class EqualPredicate<T> extends AbstractPredicate<T> {
  private readonly _value: T;

  public constructor(value: T, not: string) {
    super(not);

    this._value = value;
  }

  protected _describe(not: string): string {
    return `${not}equal ${format(this._value)}`;
  }

  protected _test(actualValue: T): boolean {
    if (actualValue !== actualValue && this._value !== this._value) {
      return true;
    }

    return deepStrictEqual(actualValue, this._value);
  }
}

class MatchPredicate extends AbstractPredicate<string> {
  private readonly _value: RegExp;

  public constructor(value: RegExp, not: string) {
    super(not);

    this._value = value;
  }

  protected _describe(not: string): string {
    return `${not}match ${format(this._value)}`;
  }

  protected _test(actualValue: string): boolean {
    return this._value.test(actualValue);
  }
}

class BeBetweenPredicate extends AbstractPredicate<number> {
  private readonly _minValue: number;
  private readonly _maxValue: number;

  public constructor(minValue: number, maxValue: number, not: string) {
    super(not);

    this._minValue = minValue;
    this._maxValue = maxValue;
  }

  protected _describe(not: string): string {
    const minValue = format(this._minValue);
    const maxValue = format(this._maxValue);

    return `${not}be between ${minValue} and ${maxValue}, inclusive`;
  }

  protected _test(actualValue: number): boolean {
    return actualValue >= this._minValue && actualValue <= this._maxValue;
  }
}

class BeGreaterThanPredicate extends AbstractPredicate<number> {
  private readonly _value: number;

  public constructor(value: number, not: string) {
    super(not);

    this._value = value;
  }

  protected _describe(not: string): string {
    return `${not}be greater than ${format(this._value)}`;
  }

  protected _test(actualValue: number): boolean {
    return actualValue > this._value;
  }
}

class BeGreaterThanOrEqualPredicate extends AbstractPredicate<number> {
  private readonly _value: number;

  public constructor(value: number, not: string) {
    super(not);

    this._value = value;
  }

  protected _describe(not: string): string {
    return `${not}be greater than or equal ${format(this._value)}`;
  }

  protected _test(actualValue: number): boolean {
    return actualValue >= this._value;
  }
}

class BeLessThanPredicate extends AbstractPredicate<number> {
  private readonly _value: number;

  public constructor(value: number, not: string) {
    super(not);

    this._value = value;
  }

  protected _describe(not: string): string {
    return `${not}be less than ${format(this._value)}`;
  }

  protected _test(actualValue: number): boolean {
    return actualValue < this._value;
  }
}

class BeLessThanOrEqualPredicate extends AbstractPredicate<number> {
  private readonly _value: number;

  public constructor(value: number, not: string) {
    super(not);

    this._value = value;
  }

  protected _describe(not: string): string {
    return `${not}be less than or equal ${format(this._value)}`;
  }

  protected _test(actualValue: number): boolean {
    return actualValue <= this._value;
  }
}

export class PredicateBuilder {
  private readonly _not: string;

  public constructor(negated: boolean = false) {
    this._not = negated ? 'not ' : '';
  }

  public get not(): PredicateBuilder {
    return new PredicateBuilder(true);
  }

  public contain(value: string): Predicate<string> {
    return new ContainPredicate(value, this._not);
  }

  public equal<T>(value: T): Predicate<T> {
    return new EqualPredicate(value, this._not);
  }

  public match(value: RegExp): Predicate<string> {
    return new MatchPredicate(value, this._not);
  }

  public beBetween(minValue: number, maxValue: number): Predicate<number> {
    return new BeBetweenPredicate(minValue, maxValue, this._not);
  }

  public beGreaterThan(value: number): Predicate<number> {
    return new BeGreaterThanPredicate(value, this._not);
  }

  public beGreaterThanOrEqual(value: number): Predicate<number> {
    return new BeGreaterThanOrEqualPredicate(value, this._not);
  }

  public beLessThan(value: number): Predicate<number> {
    return new BeLessThanPredicate(value, this._not);
  }

  public beLessThanOrEqual(value: number): Predicate<number> {
    return new BeLessThanOrEqualPredicate(value, this._not);
  }
}
