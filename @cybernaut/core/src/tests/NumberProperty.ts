import {NumberProperty} from '../NumberProperty';

const accessor = async () => 0;
const property = new NumberProperty('property', accessor);

function test(negated: boolean): void {
  const verb = negated ? 'isNot' : 'is';

  describe(`NumberProperty.${verb}.above()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].above(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.above(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(2);

        expect(property[verb].above(10).predicate(11)).toBe(true);
        expect(property[verb].above(10).predicate(Infinity)).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(3);

        expect(property[verb].above(10).predicate(9)).toBe(false);
        expect(property[verb].above(10).predicate(10)).toBe(false);
        expect(property[verb].above(10).predicate(NaN)).toBe(false);
      });
    });
  });

  describe(`NumberProperty.${verb}.atLeast()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].atLeast(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.atLeast(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(3);

        expect(property[verb].atLeast(10).predicate(10)).toBe(true);
        expect(property[verb].atLeast(10).predicate(11)).toBe(true);
        expect(property[verb].atLeast(10).predicate(Infinity)).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(2);

        expect(property[verb].atLeast(10).predicate(9)).toBe(false);
        expect(property[verb].atLeast(10).predicate(NaN)).toBe(false);
      });
    });
  });

  describe(`NumberProperty.${verb}.atMost()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].atMost(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.atMost(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(2);

        expect(property[verb].atMost(10).predicate(9)).toBe(true);
        expect(property[verb].atMost(10).predicate(10)).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(3);

        expect(property[verb].atMost(10).predicate(11)).toBe(false);
        expect(property[verb].atMost(10).predicate(Infinity)).toBe(false);
        expect(property[verb].atMost(10).predicate(NaN)).toBe(false);
      });
    });
  });

  describe(`NumberProperty.${verb}.below()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].below(10);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.below(10)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(1);

        expect(property[verb].below(10).predicate(9)).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(4);

        expect(property[verb].below(10).predicate(10)).toBe(false);
        expect(property[verb].below(10).predicate(11)).toBe(false);
        expect(property[verb].below(10).predicate(Infinity)).toBe(false);
        expect(property[verb].below(10).predicate(NaN)).toBe(false);
      });
    });
  });

  describe(`NumberProperty.${verb}.between()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].between(9, 11);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.between(9, 11)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(3);

        expect(property[verb].between(9, 11).predicate(9)).toBe(true);
        expect(property[verb].between(9, 11).predicate(10)).toBe(true);
        expect(property[verb].between(9, 11).predicate(11)).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(4);

        expect(property[verb].between(9, 11).predicate(8)).toBe(false);
        expect(property[verb].between(9, 11).predicate(12)).toBe(false);
        expect(property[verb].between(9, 11).predicate(Infinity)).toBe(false);
        expect(property[verb].between(9, 11).predicate(NaN)).toBe(false);
      });
    });
  });
}

test(false);
test(true);
