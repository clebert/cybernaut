import {getOption} from '../getOption';

interface Options {
  key: number;
}

describe('getOption()', () => {
  it('should return the default value', () => {
    expect.assertions(3);

    expect(getOption<Options, 'key'>(undefined, 'key', 1)).toBe(1);
    expect(getOption<Options, 'key'>({}, 'key', 1)).toBe(1);
    expect(getOption<Options, 'key'>({key: undefined}, 'key', 1)).toBe(1);
  });

  it('should return the option value', () => {
    expect.assertions(1);

    expect(getOption<Options, 'key'>({key: 0}, 'key', 1)).toBe(0);
  });
});
