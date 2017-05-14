import {Predicate, PredicateBuilder} from '../predicate';

interface MockSerializer {
  serialize: jest.Mock<string>;
}

let serializer: MockSerializer;
let should: PredicateBuilder;

beforeEach(() => {
  serializer = {serialize: jest.fn<string>()};
  should = new PredicateBuilder(serializer);
});

describe('given a predicate is created via should.beAbove()', () => {
  let predicate: Predicate<number>;

  beforeEach(() => {
    predicate = should.beAbove(10);
  });

  describe('when predicate.compare() is called', () => {
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare(11);
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe(
        'expected <actualValue> to be greater than <value>'
      );
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe(11);
      expect(serializer.serialize.mock.calls[1][0]).toBe(10);
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should be above <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe(10);
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
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare(11);
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe(
        'expected <actualValue> to be greater than or equal <value>'
      );
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe(11);
      expect(serializer.serialize.mock.calls[1][0]).toBe(10);
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should be at least <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe(10);
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
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare(11);
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe(
        'expected <actualValue> to be less than or equal <value>'
      );
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe(11);
      expect(serializer.serialize.mock.calls[1][0]).toBe(10);
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should be at most <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe(10);
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
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare(11);
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe('expected <actualValue> to be less than <value>');
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe(11);
      expect(serializer.serialize.mock.calls[1][0]).toBe(10);
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should be below <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe(10);
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

describe('given a predicate is created via should.contain()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.contain('foo');
  });

  describe('when predicate.compare() is called', () => {
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare('bar');
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe('expected <actualValue> to contain <value>');
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe('bar');
      expect(serializer.serialize.mock.calls[1][0]).toBe('foo');
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should contain <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe('foo');
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

describe('given a predicate is created via should.not.contain()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.not.contain('foo');
  });

  describe('when predicate.compare() is called', () => {
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare('bar');
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe('expected <actualValue> not to contain <value>');
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe('bar');
      expect(serializer.serialize.mock.calls[1][0]).toBe('foo');
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should not contain <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe('foo');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test('bar')).toBe(true);
      expect(predicate.test('')).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test('foo')).toBe(false);
      expect(predicate.test('foobar')).toBe(false);
    });
  });
});

describe('given a predicate is created via should.equal()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.equal('foo');
  });

  describe('when predicate.compare() is called', () => {
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare('bar');
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe('expected <actualValue> to equal <value>');
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe('bar');
      expect(serializer.serialize.mock.calls[1][0]).toBe('foo');
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should equal <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe('foo');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test('foo')).toBe(true);
      expect(should.equal(NaN).test(NaN)).toBe(true);
      expect(should.equal({foo: 'foo'}).test({foo: 'foo'})).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test('bar')).toBe(false);
      expect(should.equal(NaN).test(0)).toBe(false);
      expect(should.equal({foo: 'foo'}).test({foo: 'bar'})).toBe(false);
    });
  });
});

describe('given a predicate is created via should.not.equal()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.not.equal('foo');
  });

  describe('when predicate.compare() is called', () => {
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare('bar');
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe('expected <actualValue> not to equal <value>');
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe('bar');
      expect(serializer.serialize.mock.calls[1][0]).toBe('foo');
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should not equal <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toBe('foo');
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test('bar')).toBe(true);
      expect(should.not.equal(NaN).test(0)).toBe(true);
      expect(should.not.equal({foo: 'foo'}).test({foo: 'bar'})).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test('foo')).toBe(false);
      expect(should.not.equal(NaN).test(NaN)).toBe(false);
      expect(should.not.equal({foo: 'foo'}).test({foo: 'foo'})).toBe(false);
    });
  });
});

describe('given a predicate is created via should.match()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.match(/foo/);
  });

  describe('when predicate.compare() is called', () => {
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare('bar');
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe('expected <actualValue> to match <value>');
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe('bar');
      expect(serializer.serialize.mock.calls[1][0]).toEqual(/foo/);
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should match <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toEqual(/foo/);
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

describe('given a predicate is created via should.not.match()', () => {
  let predicate: Predicate<string>;

  beforeEach(() => {
    predicate = should.not.match(/foo/);
  });

  describe('when predicate.compare() is called', () => {
    let comparison: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValueOnce('<actualValue>');
      serializer.serialize.mockReturnValueOnce('<value>');

      comparison = predicate.compare('bar');
    });

    test('then it should return a comparison', () => {
      expect(comparison).toBe('expected <actualValue> not to match <value>');
    });

    test('then it should call serializer.serialize() twice', () => {
      expect(serializer.serialize.mock.calls.length).toBe(2);
      expect(serializer.serialize.mock.calls[0][0]).toBe('bar');
      expect(serializer.serialize.mock.calls[1][0]).toEqual(/foo/);
    });
  });

  describe('when predicate.description is accessed', () => {
    let description: string;

    beforeEach(() => {
      serializer.serialize.mockReturnValue('<value>');

      description = predicate.description;
    });

    test('then it should evaluate to a description', () => {
      expect(description).toBe('should not match <value>');
    });

    test('then it should call serializer.serialize() once', () => {
      expect(serializer.serialize.mock.calls.length).toBe(1);
      expect(serializer.serialize.mock.calls[0][0]).toEqual(/foo/);
    });
  });

  describe('when predicate.test() is called', () => {
    test('then it should return true', () => {
      expect(predicate.test('bar')).toBe(true);
      expect(predicate.test('')).toBe(true);
    });

    test('then it should return false', () => {
      expect(predicate.test('foo')).toBe(false);
      expect(predicate.test('foobar')).toBe(false);
    });
  });
});
