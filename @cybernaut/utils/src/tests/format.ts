import {format} from '../format';

describe('format()', () => {
  it('should return a formatted string representation of the specified value', () => {
    expect.assertions(16);

    expect(format([])).toBe('[]');

    expect(format(false)).toBe('false');
    expect(format(true)).toBe('true');

    expect(format(null)).toBe('null');
    expect(format(undefined)).toBe('undefined');

    expect(format(0)).toBe('0');
    expect(format(-1.61803)).toBe('-1.61803');
    expect(format(-Infinity)).toBe('-Infinity');
    expect(format(Infinity)).toBe('Infinity');
    expect(format(NaN)).toBe('NaN');

    expect(format({})).toBe('{}');

    expect(format(/pattern/g)).toBe('/pattern/g');

    expect(format('')).toBe("''");
    expect(format("'foo'")).toBe("'\\'foo\\''");

    expect(format([[], false, null, 0, {}, /pattern/g, ''])).toBe(
      "[[], false, null, 0, {}, /pattern/g, '']"
    );

    expect(
      format({
        array: [],
        boolean: false,
        null: null,
        number: 0,
        object: {},
        regex: /pattern/g,
        string: ''
      })
    ).toBe(
      "{array: [], boolean: false, null: null, number: 0, object: {}, regex: /pattern/g, string: ''}"
    );
  });
});
