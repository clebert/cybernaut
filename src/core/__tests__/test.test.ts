import {Options} from '../options';
import {Test} from '../test';

interface AccessorMock {
  readonly description: string;
  readonly get: jest.Mock<Promise<string>>;
}

interface ActionMock {
  readonly description: string;
  readonly perform: jest.Mock<Promise<void>>;
}

interface LoggerMock {
  readonly pass: jest.Mock<Promise<void>>;
}

interface PredicateMock {
  readonly compare: jest.Mock<string>;
  readonly description: string;
  readonly test: jest.Mock<boolean>;
}

describe('given a new test is created', () => {
  let accessor: AccessorMock;
  let action: ActionMock;
  let error: Error;
  let logger: LoggerMock;
  let options: Partial<Options>;
  let predicate: PredicateMock;
  let t: Test<object>;

  beforeEach(() => {
    accessor = {
      description: '<accessorDescription>', get: jest.fn<Promise<string>>()
    };

    action = {
      description: '<actionDescription>', perform: jest.fn<Promise<void>>()
    };

    error = new Error('<cause>');
    logger = {pass: jest.fn<Promise<void>>()};
    options = {retries: 1};

    predicate = {
      compare: jest.fn<string>().mockReturnValue('<predicateComparison>'),
      description: '<predicateDescription>',
      test: jest.fn<boolean>()
    };

    t = new Test({}, logger, {retries: 0, retryDelay: 0});
  });

  describe('when test.assert() is called without options (retries=0)', () => {
    describe('and the verification is valid in the first attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValue(true);
      });

      test('then it should return void', async () => {
        expect(await t.assert(accessor, predicate)).toBeUndefined();
      });

      test('then it should call logger.pass() without attempts', async () => {
        await t.assert(accessor, predicate);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Assert: <accessorDescription> <predicateDescription>'
        );
      });
    });

    describe('and the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      test('then it should throw an error with a comparison', async () => {
        await expect(t.assert(accessor, predicate)).rejects.toEqual(new Error(
          'Assert: <accessorDescription> <predicateDescription> ' +
          '(<predicateComparison>)'
        ));
      });

      test('then it should not call logger.pass()', async () => {
        try {
          await t.assert(accessor, predicate);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });

    describe('and the verification is erroneous in the first attempt', () => {
      beforeEach(() => {
        accessor.get.mockImplementation(async () => {
          throw error;
        });
      });

      test('then it should throw an error with a cause', async () => {
        await expect(t.assert(accessor, predicate)).rejects.toEqual(new Error(
          'Assert: <accessorDescription> <predicateDescription> (<cause>)'
        ));
      });

      test('then it should not call logger.pass()', async () => {
        try {
          await t.assert(accessor, predicate);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });
  });

  describe('when test.assert() is called with options (retries=1)', () => {
    describe('and the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      test('then it should return void', async () => {
        expect(await t.assert(accessor, predicate, options)).toBeUndefined();
      });

      test('then it should call logger.pass() with attempts', async () => {
        await t.assert(accessor, predicate, options);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Assert: <accessorDescription> <predicateDescription> ' +
          '(attempt 2 of 2)'
        );
      });
    });
  });

  describe('when test.perform() is called without options (retries=0)', () => {
    describe('and the execution is completed in the first attempt', () => {
      test('then it should return void', async () => {
        expect(await t.perform(action)).toBeUndefined();
      });

      test('then it should call logger.pass() without attempts', async () => {
        await t.perform(action);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Perform: <actionDescription>'
        );
      });
    });

    describe('and the execution is erroneous until the second attempt', () => {
      beforeEach(() => {
        action.perform.mockImplementationOnce(async () => {
          throw error;
        });
      });

      test('then it should throw an error with a cause', async () => {
        await expect(t.perform(action)).rejects.toEqual(new Error(
          'Perform: <actionDescription> (<cause>)'
        ));
      });

      test('then it should not call logger.pass()', async () => {
        try {
          await t.perform(action);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });
  });

  describe('when test.perform() is called with options (retries=1)', () => {
    describe('and the execution is erroneous until the second attempt', () => {
      beforeEach(() => {
        action.perform.mockImplementationOnce(async () => {
          throw error;
        });
      });

      test('then it should return void', async () => {
        expect(await t.perform(action, options)).toBeUndefined();
      });

      test('then it should call logger.pass() with attempts', async () => {
        await t.perform(action, options);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Perform: <actionDescription> (attempt 2 of 2)'
        );
      });
    });
  });

  describe('when test.verify() is called without options (retries=0)', () => {
    describe('and the verification is valid in the first attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValue(true);
      });

      test('then it should return true', async () => {
        expect(await t.verify(accessor, predicate)).toBe(true);
      });

      test('then it should call logger.pass() without attempts', async () => {
        await t.verify(accessor, predicate);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Verify: <accessorDescription> <predicateDescription>'
        );
      });
    });

    describe('and the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      test('then it should return false', async () => {
        expect(await t.verify(accessor, predicate)).toBe(false);
      });

      test('then it should call logger.pass() with a comparison', async () => {
        await t.verify(accessor, predicate);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Verify: <accessorDescription> <predicateDescription> ' +
          '(<predicateComparison>)'
        );
      });
    });

    describe('and the verification is erroneous in the first attempt', () => {
      beforeEach(() => {
        accessor.get.mockImplementation(async () => {
          throw error;
        });
      });

      test('then it should throw an error with a cause', async () => {
        await expect(t.verify(accessor, predicate)).rejects.toEqual(new Error(
          'Verify: <accessorDescription> <predicateDescription> (<cause>)'
        ));
      });

      test('then it should not call logger.pass()', async () => {
        try {
          await t.verify(accessor, predicate);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });
  });

  describe('when test.verify() is called with options (retries=1)', () => {
    describe('and the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      test('then it should return true', async () => {
        expect(await t.verify(accessor, predicate, options)).toBe(true);
      });

      test('then it should call logger.pass() with attempts', async () => {
        await t.verify(accessor, predicate, options);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Verify: <accessorDescription> <predicateDescription> ' +
          '(attempt 2 of 2)'
        );
      });
    });
  });
});
