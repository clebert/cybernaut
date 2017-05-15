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

describe('given a predicate is created via should.beAbove()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beAbove(10);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare(11)).toBe('expected 11 to be greater than 10');
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe('should be above 10');
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

describe('given a predicate is created via should.beAtLeast()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beAtLeast(10);
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
      expect(predicate.description).toBe('should be at least 10');
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

describe('given a predicate is created via should.beAtMost()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beAtMost(10);
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
      expect(predicate.description).toBe('should be at most 10');
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

describe('given a predicate is created via should.beBelow()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beBelow(10);
  });

  describe('when predicate.compare() is called', () => {
    test('then it should return a comparison', () => {
      expect(predicate.compare(11)).toBe('expected 11 to be less than 10');
    });
  });

  describe('when predicate.description is accessed', () => {
    test('then it should evaluate to a description', () => {
      expect(predicate.description).toBe('should be below 10');
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
