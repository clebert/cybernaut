import {StringProperty} from '../StringProperty';

const accessor = async () => '';
const property = new StringProperty('property', accessor);

function test(negated: boolean): void {
  const verb = negated ? 'isNot' : 'is';

  describe(`StringProperty.${verb}.containing()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].containing('foo');

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.containing('foo')`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(2);

        expect(property[verb].containing('foo').predicate('foo')).toBe(true);
        expect(property[verb].containing('foo').predicate('foobar')).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(2);

        expect(property[verb].containing('foo').predicate('bar')).toBe(false);
        expect(property[verb].containing('foo').predicate('')).toBe(false);
      });
    });
  });

  describe(`StringProperty.${verb}.matching()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].matching(/foo/g);

      expect(condition.accessor).toBe(accessor);
      expect(condition.description).toBe(`property.${verb}.matching(/foo/g)`);
      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(2);

        expect(property[verb].matching(/foo/).predicate('foo')).toBe(true);
        expect(property[verb].matching(/foo/).predicate('foobar')).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(2);

        expect(property[verb].matching(/foo/).predicate('bar')).toBe(false);
        expect(property[verb].matching(/foo/).predicate('')).toBe(false);
      });
    });
  });
}

test(false);
test(true);
