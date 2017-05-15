import {Predicate, PredicateBuilder} from '../predicate';

let should: PredicateBuilder;

beforeEach(() => {
  should = new PredicateBuilder();
});

describe('given a predicate is created via should.contain()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.contain('foo');
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare('bar')).toBe("expected 'bar' to contain 'foo'");
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe("should contain 'foo'");
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test('foo')).toBe(true);
      expect(predicate.test('foobar')).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test('bar')).toBe(false);
      expect(predicate.test('')).toBe(false);
    });
  });
});

describe('given a predicate is created via should.equal()', () => {
  let predicate: Predicate<object>;

  beforeEach(() => {
    predicate = should.equal({foo: 'foo'});
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare({foo: 'bar'})).toBe(
        "expected { foo: 'bar' } to equal { foo: 'foo' }"
      );
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe("should equal { foo: 'foo' }");
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test({foo: 'foo'})).toBe(true);
      expect(should.equal(NaN).test(NaN)).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test({foo: 'bar'})).toBe(false);
      expect(should.equal(NaN).test(0)).toBe(false);
    });
  });
});

describe('given a predicate is created via should.match()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.match(/foo/);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare('bar')).toBe("expected 'bar' to match /foo/");
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe('should match /foo/');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test('foo')).toBe(true);
      expect(predicate.test('foobar')).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test('bar')).toBe(false);
      expect(predicate.test('')).toBe(false);
    });
  });
});

describe('given a predicate is created via should.beGreaterThan()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beGreaterThan(10);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare(11)).toBe('expected 11 to be greater than 10');
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe('should be greater than 10');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test(11)).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test(9)).toBe(false);
      expect(predicate.test(10)).toBe(false);
      expect(predicate.test(NaN)).toBe(false);
    });
  });
});

const name = 'given a predicate is created via should.beGreaterThanOrEqual()';

describe(name, () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beGreaterThanOrEqual(10);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare(11)).toBe(
        'expected 11 to be greater than or equal 10'
      );
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe('should be greater than or equal 10');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test(10)).toBe(true);
      expect(predicate.test(11)).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test(9)).toBe(false);
      expect(predicate.test(NaN)).toBe(false);
    });
  });
});

describe('given a predicate is created via should.beLessThan()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beLessThan(10);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare(11)).toBe('expected 11 to be less than 10');
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe('should be less than 10');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test(9)).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test(10)).toBe(false);
      expect(predicate.test(11)).toBe(false);
      expect(predicate.test(NaN)).toBe(false);
    });
  });
});

describe('given a predicate is created via should.beLessThanOrEqual()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beLessThanOrEqual(10);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare(11)).toBe(
        'expected 11 to be less than or equal 10'
      );
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe('should be less than or equal 10');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test(9)).toBe(true);
      expect(predicate.test(10)).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test(11)).toBe(false);
      expect(predicate.test(NaN)).toBe(false);
    });
  });
});

describe('given a predicate is created via should.beBetween()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beBetween(9, 11);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare(10)).toBe(
        'expected 10 to be between 9 and 11, inclusive'
      );
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe(
        'should be between 9 and 11, inclusive'
      );
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test(9)).toBe(true);
      expect(predicate.test(10)).toBe(true);
      expect(predicate.test(11)).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test(8)).toBe(false);
      expect(predicate.test(12)).toBe(false);
      expect(predicate.test(NaN)).toBe(false);
    });
  });
});
