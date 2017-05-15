import deepStrictEqual = require('deep-strict-equal');

import {inspect} from 'util';

export interface Predicate<T> {
  readonly description: string;

  compare(actualValue: T): string;
  test(actualValue: T): boolean;
}

abstract class AbstractPredicate<T, S> implements Predicate<T> {
  protected readonly _value: S;

  public constructor(value: S) {
    this._value = value;
  }

  public abstract get description(): string;

  public abstract compare(actualValue: T): string;
  public abstract test(actualValue: T): boolean;

  // tslint:disable no-any
  protected _serialize(value: any): string {
    return inspect(value, {breakLength: Infinity} as any);
  }
  // tslint:enable no-any
}

class ContainPredicate extends AbstractPredicate<string, string> {
  public get description(): string {
    return `should contain ${this._serialize(this._value)}`;
  }

  public compare(actualValue: string): string {
    return `expected ${this._serialize(actualValue)} ` +
      `to contain ${this._serialize(this._value)}`;
  }

  public test(actualValue: string): boolean {
    return actualValue.indexOf(this._value) > -1;
  }
}

class EqualPredicate<T> extends AbstractPredicate<T, T> {
  public get description(): string {
    return `should equal ${this._serialize(this._value)}`;
  }

  public compare(actualValue: T): string {
    return `expected ${this._serialize(actualValue)} ` +
      `to equal ${this._serialize(this._value)}`;
  }

  public test(actualValue: T): boolean {
    if (actualValue !== actualValue && this._value !== this._value) {
      return true;
    }

    return deepStrictEqual(actualValue, this._value);
  }
}

class MatchPredicate extends AbstractPredicate<string, RegExp> {
  public get description(): string {
    return `should match ${this._serialize(this._value)}`;
  }

  public compare(actualValue: string): string {
    return `expected ${this._serialize(actualValue)} ` +
      `to match ${this._serialize(this._value)}`;
  }

  public test(actualValue: string): boolean {
    return this._value.test(actualValue);
  }
}

class BeAbovePredicate extends AbstractPredicate<number, number> {
  public get description(): string {
    return `should be above ${this._serialize(this._value)}`;
  }

  public compare(actualValue: number): string {
    return `expected ${this._serialize(actualValue)} ` +
      `to be greater than ${this._serialize(this._value)}`;
  }

  public test(actualValue: number): boolean {
    return actualValue > this._value;
  }
}

class BeAtLeastPredicate extends AbstractPredicate<number, number> {
  public get description(): string {
    return `should be at least ${this._serialize(this._value)}`;
  }

  public compare(actualValue: number): string {
    return `expected ${this._serialize(actualValue)} ` +
      `to be greater than or equal ${this._serialize(this._value)}`;
  }

  public test(actualValue: number): boolean {
    return actualValue >= this._value;
  }
}

class BeAtMostPredicate extends AbstractPredicate<number, number> {
  public get description(): string {
    return `should be at most ${this._serialize(this._value)}`;
  }

  public compare(actualValue: number): string {
    return `expected ${this._serialize(actualValue)} ` +
      `to be less than or equal ${this._serialize(this._value)}`;
  }

  public test(actualValue: number): boolean {
    return actualValue <= this._value;
  }
}

class BeBelow extends AbstractPredicate<number, number> {
  public get description(): string {
    return `should be below ${this._serialize(this._value)}`;
  }

  public compare(actualValue: number): string {
    return `expected ${this._serialize(actualValue)} ` +
      `to be less than ${this._serialize(this._value)}`;
  }

  public test(actualValue: number): boolean {
    return actualValue < this._value;
  }
}

export class PredicateBuilder {
  public contain(value: string): Predicate<string> {
    return new ContainPredicate(value);
  }

  public equal<T>(value: T): Predicate<T> {
    return new EqualPredicate(value);
  }

  public match(value: RegExp): Predicate<string> {
    return new MatchPredicate(value);
  }

  public beAbove(value: number): Predicate<number> {
    return new BeAbovePredicate(value);
  }

  public beAtLeast(value: number): Predicate<number> {
    return new BeAtLeastPredicate(value);
  }

  public beAtMost(value: number): Predicate<number> {
    return new BeAtMostPredicate(value);
  }

  public beBelow(value: number): Predicate<number> {
    return new BeBelow(value);
  }
}
