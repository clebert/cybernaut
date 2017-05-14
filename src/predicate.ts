import deepStrictEqual = require('deep-strict-equal');

export interface Predicate<T> {
  readonly description: string;

  compare(actualValue: T): string;
  test(actualValue: T): boolean;
}

export interface Serializer {
  serialize(value: any): string; // tslint:disable-line no-any
}

abstract class AbstractPredicate<T, S> implements Predicate<T> {
  protected readonly _not: string;
  protected readonly _serializer: Serializer;
  protected readonly _value: S;

  public constructor(serializer: Serializer, negated: boolean, value: S) {
    this._not = negated ? ' not' : '';
    this._serializer = serializer;
    this._value = value;
  }

  public abstract get description(): string;

  public abstract compare(actualValue: T): string;

  public test(actualValue: T): boolean {
    return this._not ? !this._test(actualValue) : this._test(actualValue);
  }

  protected abstract _test(actualValue: T): boolean;

  protected _serialize(value: any): string { // tslint:disable-line no-any
    return this._serializer.serialize(value);
  }
}

class ContainPredicate extends AbstractPredicate<string, string> {
  public get description(): string {
    return `should${this._not} contain ${this._serialize(this._value)}`;
  }

  public compare(actualValue: string): string {
    return `expected ${this._serialize(actualValue)}${this._not} ` +
      `to contain ${this._serialize(this._value)}`;
  }

  protected _test(actualValue: string): boolean {
    return actualValue.indexOf(this._value) > -1;
  }
}

class EqualPredicate<T> extends AbstractPredicate<T, T> {
  public get description(): string {
    return `should${this._not} equal ${this._serialize(this._value)}`;
  }

  public compare(actualValue: T): string {
    return `expected ${this._serialize(actualValue)}${this._not} ` +
      `to equal ${this._serialize(this._value)}`;
  }

  protected _test(actualValue: T): boolean {
    if (actualValue !== actualValue && this._value !== this._value) {
      return true;
    }

    return deepStrictEqual(actualValue, this._value);
  }
}

class MatchPredicate extends AbstractPredicate<string, RegExp> {
  public get description(): string {
    return `should${this._not} match ${this._serialize(this._value)}`;
  }

  public compare(actualValue: string): string {
    return `expected ${this._serialize(actualValue)}${this._not} ` +
      `to match ${this._serialize(this._value)}`;
  }

  protected _test(actualValue: string): boolean {
    return this._value.test(actualValue);
  }
}

export class NegatablePredicateBuilder {
  protected readonly _negated: boolean;
  protected readonly _serializer: Serializer;

  public constructor(serializer: Serializer, negated: boolean) {
    this._negated = negated;
    this._serializer = serializer;
  }

  public contain(value: string): Predicate<string> {
    return new ContainPredicate(this._serializer, this._negated, value);
  }

  public equal<T>(value: T): Predicate<T> {
    return new EqualPredicate(this._serializer, this._negated, value);
  }

  public match(value: RegExp): Predicate<string> {
    return new MatchPredicate(this._serializer, this._negated, value);
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

  protected _test(actualValue: number): boolean {
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

  protected _test(actualValue: number): boolean {
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

  protected _test(actualValue: number): boolean {
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

  protected _test(actualValue: number): boolean {
    return actualValue < this._value;
  }
}

export class PredicateBuilder extends NegatablePredicateBuilder {
  public constructor(serializer: Serializer) {
    super(serializer, false);
  }

  public get not(): NegatablePredicateBuilder {
    return new NegatablePredicateBuilder(this._serializer, true);
  }

  public beAbove(value: number): Predicate<number> {
    return new BeAbovePredicate(this._serializer, this._negated, value);
  }

  public beAtLeast(value: number): Predicate<number> {
    return new BeAtLeastPredicate(this._serializer, this._negated, value);
  }

  public beAtMost(value: number): Predicate<number> {
    return new BeAtMostPredicate(this._serializer, this._negated, value);
  }

  public beBelow(value: number): Predicate<number> {
    return new BeBelow(this._serializer, this._negated, value);
  }
}
