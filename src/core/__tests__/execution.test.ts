// tslint:disable no-any no-object-literal-type-assertion

import {Executor, createExecutor, execute} from '../execution';

interface ActionMock {
  readonly description: string;
  readonly perform: jest.Mock<Promise<void>>;
}

const driver = {} as any;

describe('given a newly created executor() is called', () => {
  let action: ActionMock;
  let executor: Executor;

  beforeEach(() => {
    action = {
      description: '<actionDescription>', perform: jest.fn<Promise<void>>()
    };

    executor = createExecutor(action);
  });

  test('then it should call action.perform() once', async () => {
    await executor(driver, 2, 1);

    expect(action.perform.mock.calls.length).toBe(1);
    expect(action.perform.mock.calls[0][0]).toBe(driver);
  });

  describe('when the call to action.perform() does not throw an error', () => {
    test('then it should return a non-error execution', async () => {
      const execution = await executor(driver, 1, 0);

      expect(execution.description).toBe(action.description);
      expect(execution.error).toBe(false);

      expect((await executor(driver, 1, 1)).description).toBe(
        action.description
      );

      expect((await executor(driver, 1, 2)).description).toBe(
        action.description
      );

      expect((await executor(driver, 2, 1)).description).toBe(
        action.description + ' (attempt 2 of 2)'
      );

      expect((await executor(driver, 2, 2)).description).toBe(
        action.description + ' (attempt 2 of 3)'
      );
    });
  });

  describe('when the call to action.perform() throws an error', () => {
    test('then it should return an error execution', async () => {
      action.perform.mockImplementationOnce(async () => {
        throw new Error('<message>');
      });

      action.perform.mockImplementationOnce(async () => {
        throw new Error();
      });

      action.perform.mockImplementationOnce(async () => {
        throw undefined;
      });

      for (const message of ['<message>', 'unknown error', 'unknown error']) {
        const execution = await executor(driver, 2, 1);

        expect(execution.description).toBe(
          `${action.description} (${message})`
        );

        expect(execution.error).toBe(true);
      }
    });
  });
});

describe('given execute() is called with a retries-option of 1', () => {
  const options = {retries: 1, retryDelay: 0};

  let executor: jest.Mock<Executor>;

  beforeEach(() => {
    executor = jest.fn<Executor>();
  });

  describe('when any call to executor() returns a non-error execution', () => {
    beforeEach(() => {
      executor.mockImplementation(async () => ({
        description: 'attempt 1', error: false
      }));
    });

    test('then it should call executor() once', async () => {
      await execute(executor, driver, options);

      expect(executor.mock.calls.length).toBe(1);
      expect(executor.mock.calls[0][0]).toBe(driver);
      expect(executor.mock.calls[0][1]).toBe(1);
      expect(executor.mock.calls[0][2]).toBe(options.retries);
    });

    test('then it should return the execution', async () => {
      const execution = await execute(executor, driver, options);

      expect(execution).toEqual({description: 'attempt 1', error: false});
    });
  });

  describe('when any call to executor() returns an error execution', () => {
    beforeEach(() => {
      executor.mockImplementationOnce(async () => ({
        description: 'attempt 1', error: true
      }));

      executor.mockImplementationOnce(async () => ({
        description: 'attempt 2', error: true
      }));
    });

    test('then it should call executor() twice', async () => {
      await execute(executor, driver, options);

      expect(executor.mock.calls.length).toBe(2);
      expect(executor.mock.calls[0][0]).toBe(driver);
      expect(executor.mock.calls[0][1]).toBe(1);
      expect(executor.mock.calls[0][2]).toBe(options.retries);
      expect(executor.mock.calls[1][0]).toBe(driver);
      expect(executor.mock.calls[1][1]).toBe(2);
      expect(executor.mock.calls[1][2]).toBe(options.retries);
    });

    test('then it should return the second execution', async () => {
      const execution = await execute(executor, driver, options);

      expect(execution).toEqual({description: 'attempt 2', error: true});
    });

    test('then it should delay the second call to executor()', async () => {
      try {
        jest.useFakeTimers();

        const retryDelay = 123;
        const promise = execute(executor, driver, {...options, retryDelay});

        await Promise.resolve();
        await Promise.resolve();
        await Promise.resolve();

        expect(executor.mock.calls.length).toBe(1);

        jest.runTimersToTime(retryDelay - 1);

        await Promise.resolve();
        await Promise.resolve();
        await Promise.resolve();

        expect(executor.mock.calls.length).toBe(1);

        jest.runTimersToTime(1);

        await Promise.resolve();
        await Promise.resolve();
        await Promise.resolve();

        expect(executor.mock.calls.length).toBe(2);

        await promise;
      } finally {
        jest.useRealTimers();
      }
    });
  });
});
