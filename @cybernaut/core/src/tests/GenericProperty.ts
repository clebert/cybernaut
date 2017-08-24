import {GenericProperty} from '../GenericProperty';

const accessor = async () => undefined;

/* tslint:disable-next-line no-any */
const property = new GenericProperty<any>('property', accessor);

function test(negated: boolean): void {
  const verb = negated ? 'isNot' : 'is';

  describe(`GenericProperty.${verb}.equalTo()`, () => {
    it(`should return a ${negated ? 'negated ' : ''}condition`, () => {
      expect.assertions(3);

      const condition = property[verb].equalTo(['foo', {}]);

      expect(condition.accessor).toBe(accessor);

      expect(condition.description).toBe(
        `property.${verb}.equalTo(['foo', {}])`
      );

      expect(condition.negated).toBe(negated);
    });

    describe('condition.predicate()', () => {
      it('should return true', () => {
        expect.assertions(3);

        expect(property[verb].equalTo(['foo', {}]).predicate(['foo', {}])).toBe(
          true
        );

        expect(property[verb].equalTo(NaN).predicate(NaN)).toBe(true);
        expect(property[verb].equalTo(null).predicate(null)).toBe(true);
      });

      it('should return false', () => {
        expect.assertions(3);

        expect(property[verb].equalTo(['foo', {}]).predicate(['bar', {}])).toBe(
          false
        );

        expect(property[verb].equalTo(NaN).predicate(0)).toBe(false);
        expect(property[verb].equalTo(null).predicate(undefined)).toBe(false);
      });
    });
  });
}

test(false);
test(true);
