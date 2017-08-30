import {Condition} from '@cybernaut/types/lib/Condition';
import {Property} from '../Property';

const accessor = async () => undefined;
const property = new Property('property', accessor);

function test(negated: boolean): void {
  const verb = negated ? 'isNot' : 'is';

  /* tslint:disable-next-line no-any */
  let createCondition: (a: any, b?: any) => Condition;

  describe(`Property.${verb}.equalTo()`, () => {
    beforeEach(() => {
      createCondition = value => property[verb].equalTo(value);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition(['foo', {}]);

      expect(condition.accessor).toBe(accessor);

      expect(condition.description).toBe(
        `property.${verb}.equalTo(['foo', {}])`
      );

      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition(['foo', {}]).predicate(['foo', {}])).toBe(true);
        expect(createCondition(NaN).predicate(NaN)).toBe(true);
        expect(createCondition(null).predicate(null)).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition(['foo', {}]).predicate(['bar', {}])).toBe(false);
        expect(createCondition(NaN).predicate(0)).toBe(false);
        expect(createCondition(null).predicate(undefined)).toBe(false);
      });
    });
  });

  describe(`Property.${verb}.above()`, () => {
    beforeEach(() => {
      createCondition = value => property[verb].above(value);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.above(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition(10).predicate(11)).toBe(true);
        expect(createCondition(10).predicate(Infinity)).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition(10).predicate(9)).toBe(false);
        expect(createCondition(10).predicate(10)).toBe(false);
        expect(createCondition(10).predicate(NaN)).toBe(false);
      });

      it('should throw an error', () => {
        expect(() => createCondition(10).predicate({})).toThrowError(
          'Expected an actual value of type number, got: {}'
        );
      });
    });
  });

  describe(`Property.${verb}.atLeast()`, () => {
    beforeEach(() => {
      createCondition = value => property[verb].atLeast(value);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.atLeast(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition(10).predicate(10)).toBe(true);
        expect(createCondition(10).predicate(11)).toBe(true);
        expect(createCondition(10).predicate(Infinity)).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition(10).predicate(9)).toBe(false);
        expect(createCondition(10).predicate(NaN)).toBe(false);
      });

      it('should throw an error', () => {
        expect(() => createCondition(10).predicate({})).toThrowError(
          'Expected an actual value of type number, got: {}'
        );
      });
    });
  });

  describe(`Property.${verb}.atMost()`, () => {
    beforeEach(() => {
      createCondition = value => property[verb].atMost(value);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.atMost(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition(10).predicate(9)).toBe(true);
        expect(createCondition(10).predicate(10)).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition(10).predicate(11)).toBe(false);
        expect(createCondition(10).predicate(Infinity)).toBe(false);
        expect(createCondition(10).predicate(NaN)).toBe(false);
      });

      it('should throw an error', () => {
        expect(() => createCondition(10).predicate({})).toThrowError(
          'Expected an actual value of type number, got: {}'
        );
      });
    });
  });

  describe(`Property.${verb}.below()`, () => {
    beforeEach(() => {
      createCondition = value => property[verb].below(value);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.below(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition(10).predicate(9)).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition(10).predicate(10)).toBe(false);
        expect(createCondition(10).predicate(11)).toBe(false);
        expect(createCondition(10).predicate(Infinity)).toBe(false);
        expect(createCondition(10).predicate(NaN)).toBe(false);
      });

      it('should throw an error', () => {
        expect(() => createCondition(10).predicate({})).toThrowError(
          'Expected an actual value of type number, got: {}'
        );
      });
    });
  });

  describe(`Property.${verb}.between()`, () => {
    beforeEach(() => {
      createCondition = (minValue, maxValue) =>
        property[verb].between(minValue, maxValue);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition(9, 11);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.between(9, 11)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition(9, 11).predicate(9)).toBe(true);
        expect(createCondition(9, 11).predicate(10)).toBe(true);
        expect(createCondition(9, 11).predicate(11)).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition(9, 11).predicate(8)).toBe(false);
        expect(createCondition(9, 11).predicate(12)).toBe(false);
        expect(createCondition(9, 11).predicate(Infinity)).toBe(false);
        expect(createCondition(9, 11).predicate(NaN)).toBe(false);
      });

      it('should throw an error', () => {
        expect(() => createCondition(9, 11).predicate({})).toThrowError(
          'Expected an actual value of type number, got: {}'
        );
      });
    });
  });

  describe(`Property.${verb}.containing()`, () => {
    beforeEach(() => {
      createCondition = value => property[verb].containing(value);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition('foo');

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.containing('foo')`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition('foo').predicate('foo')).toBe(true);
        expect(createCondition('foo').predicate('foobar')).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition('foo').predicate('bar')).toBe(false);
        expect(createCondition('foo').predicate('')).toBe(false);
      });

      it('should throw an error', () => {
        expect(() => createCondition('foo').predicate({})).toThrowError(
          'Expected an actual value of type string, got: {}'
        );
      });
    });
  });

  describe(`Property.${verb}.matching()`, () => {
    beforeEach(() => {
      createCondition = value => property[verb].matching(value);
    });

    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      const condition = createCondition(/foo/g);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.matching(/foo/g)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect(createCondition(/foo/).predicate('foo')).toBe(true);
        expect(createCondition(/foo/).predicate('foobar')).toBe(true);
      });

      it('should return false', () => {
        expect(createCondition(/foo/).predicate('bar')).toBe(false);
        expect(createCondition(/foo/).predicate('')).toBe(false);
      });

      it('should throw an error', () => {
        expect(() => createCondition(/foo/).predicate({})).toThrowError(
          'Expected an actual value of type string, got: {}'
        );
      });
    });
  });
}

test(false);
test(true);
