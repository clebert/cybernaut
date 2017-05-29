import {Test} from '../test';
import {and, given, shortSleep, then, when} from './test-utils';

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

const defaultOptions = {retries: 0, retryDelay: 10};
const error = new Error('<cause>');

given('a new test is created with retries=0 and retryDelay=10', () => {
  let accessor: AccessorMock;
  let action: ActionMock;
  let logger: LoggerMock;
  let predicate: PredicateMock;
  let t: Test<object>;

  beforeEach(() => {
    accessor = {
      description: '<accessorDescription>', get: jest.fn<Promise<string>>()
    };

    action = {
      description: '<actionDescription>', perform: jest.fn<Promise<void>>()
    };

    logger = {pass: jest.fn<Promise<void>>()};

    predicate = {
      compare: jest.fn<string>().mockReturnValue('<predicateComparison>'),
      description: '<predicateDescription>',
      test: jest.fn<boolean>()
    };

    t = new Test<object>({}, logger, defaultOptions);
  });

  when('test.assert() is called without options', () => {
    and('the verification is valid in the first attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValue(true);
      });

      then('it should call logger.pass() without attempts', async () => {
        await t.assert(accessor, predicate);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Assert: <accessorDescription> <predicateDescription>'
        );
      });
    });

    and('the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      then('it should throw an error with a comparison', async () => {
        await expect(t.assert(accessor, predicate)).rejects.toEqual(new Error(
          'Assert: <accessorDescription> <predicateDescription> ' +
          '(<predicateComparison>)'
        ));
      });

      then('it should not call logger.pass()', async () => {
        try {
          await t.assert(accessor, predicate);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });

    and('the verification is erroneous in the first attempt', () => {
      beforeEach(() => {
        accessor.get.mockImplementation(async () => {
          throw error;
        });
      });

      then('it should throw an error with a cause', async () => {
        await expect(t.assert(accessor, predicate)).rejects.toEqual(new Error(
          'Assert: <accessorDescription> <predicateDescription> (<cause>)'
        ));
      });

      then('it should not call logger.pass()', async () => {
        try {
          await t.assert(accessor, predicate);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });
  });

  when('test.assert() is called with retries=1', () => {
    const options = {retries: 1};

    and('the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      then('it should call logger.pass() with attempts', async () => {
        await t.assert(accessor, predicate, options);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Assert: <accessorDescription> <predicateDescription> ' +
          '(attempt 2 of 2)'
        );
      });

      then('it should delay the second attempt by 10 ms', async () => {
        try {
          jest.useFakeTimers();

          const promise = t.assert(accessor, predicate, options);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(defaultOptions.retryDelay - 1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(2);
          expect(predicate.test.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  });

  when('test.assert() is called with retries=1 and retryDelay=20', () => {
    const options = {retries: 1, retryDelay: 20};

    and('the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      then('it should delay the second attempt by 20 ms', async () => {
        try {
          jest.useFakeTimers();

          const promise = t.assert(accessor, predicate, options);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(options.retryDelay - 1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(2);
          expect(predicate.test.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  });

  when('test.perform() is called without options', () => {
    and('the execution is successful in the first attempt', () => {
      then('it should call logger.pass() without attempts', async () => {
        await t.perform(action);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Perform: <actionDescription>'
        );
      });
    });

    and('the execution is erroneous until the second attempt', () => {
      beforeEach(() => {
        action.perform.mockImplementationOnce(async () => {
          throw error;
        });
      });

      then('it should throw an error with a cause', async () => {
        await expect(t.perform(action)).rejects.toEqual(new Error(
          'Perform: <actionDescription> (<cause>)'
        ));
      });

      then('it should not call logger.pass()', async () => {
        try {
          await t.perform(action);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });
  });

  when('test.perform() is called with retries=1', () => {
    const options = {retries: 1};

    and('the execution is erroneous until the second attempt', () => {
      beforeEach(() => {
        action.perform.mockImplementationOnce(async () => {
          throw error;
        });
      });

      then('it should call logger.pass() with attempts', async () => {
        await t.perform(action, options);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Perform: <actionDescription> (attempt 2 of 2)'
        );
      });

      then('it should delay the second attempt by 10 ms', async () => {
        try {
          jest.useFakeTimers();

          const promise = t.perform(action, options);

          await shortSleep();

          expect(action.perform.mock.calls.length).toBe(1);

          jest.runTimersToTime(defaultOptions.retryDelay - 1);

          await shortSleep();

          expect(action.perform.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await shortSleep();

          expect(action.perform.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  });

  when('test.perform() is called with retries=1 and retryDelay=20', () => {
    const options = {retries: 1, retryDelay: 20};

    and('the execution is erroneous until the second attempt', () => {
      beforeEach(() => {
        action.perform.mockImplementationOnce(async () => {
          throw error;
        });
      });

      then('it should delay the second attempt by 20 ms', async () => {
        try {
          jest.useFakeTimers();

          const promise = t.perform(action, options);

          await shortSleep();

          expect(action.perform.mock.calls.length).toBe(1);

          jest.runTimersToTime(options.retryDelay - 1);

          await shortSleep();

          expect(action.perform.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await shortSleep();

          expect(action.perform.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  });

  when('test.verify() is called without options', () => {
    and('the verification is valid in the first attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValue(true);
      });

      then('it should return true', async () => {
        expect(await t.verify(accessor, predicate)).toBe(true);
      });

      then('it should call logger.pass() without attempts', async () => {
        await t.verify(accessor, predicate);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Verify: <accessorDescription> <predicateDescription>'
        );
      });
    });

    and('the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      then('it should return false', async () => {
        expect(await t.verify(accessor, predicate)).toBe(false);
      });

      then('it should call logger.pass() with a comparison', async () => {
        await t.verify(accessor, predicate);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Verify: <accessorDescription> <predicateDescription> ' +
          '(<predicateComparison>)'
        );
      });
    });

    and('the verification is erroneous in the first attempt', () => {
      beforeEach(() => {
        accessor.get.mockImplementation(async () => {
          throw error;
        });
      });

      then('it should throw an error with a cause', async () => {
        await expect(t.verify(accessor, predicate)).rejects.toEqual(new Error(
          'Verify: <accessorDescription> <predicateDescription> (<cause>)'
        ));
      });

      then('it should not call logger.pass()', async () => {
        try {
          await t.verify(accessor, predicate);
        } catch (e) {/* */}

        expect(logger.pass.mock.calls.length).toBe(0);
      });
    });
  });

  when('test.verify() is called with retries=1', () => {
    const options = {retries: 1};

    and('the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      then('it should return true', async () => {
        expect(await t.verify(accessor, predicate, options)).toBe(true);
      });

      then('it should call logger.pass() with attempts', async () => {
        await t.verify(accessor, predicate, options);

        expect(logger.pass.mock.calls.length).toBe(1);

        expect(logger.pass.mock.calls[0][0]).toBe(
          'Verify: <accessorDescription> <predicateDescription> ' +
          '(attempt 2 of 2)'
        );
      });

      then('it should delay the second attempt by 10 ms', async () => {
        try {
          jest.useFakeTimers();

          const promise = t.verify(accessor, predicate, options);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(defaultOptions.retryDelay - 1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(2);
          expect(predicate.test.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  });

  when('test.verify() is called with retries=1 and retryDelay=20', () => {
    const options = {retries: 1, retryDelay: 20};

    and('the verification is invalid until the second attempt', () => {
      beforeEach(() => {
        predicate.test.mockReturnValueOnce(false);
        predicate.test.mockReturnValue(true);
      });

      then('it should delay the second attempt by 20 ms', async () => {
        try {
          jest.useFakeTimers();

          const promise = t.verify(accessor, predicate, options);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(options.retryDelay - 1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(1);
          expect(predicate.test.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await shortSleep();

          expect(accessor.get.mock.calls.length).toBe(2);
          expect(predicate.test.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  });
});
