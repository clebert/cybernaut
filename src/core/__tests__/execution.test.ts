import {Executor, createExecutor, execute} from '../execution';
import {given, shortSleep, then, when} from './test-utils';

interface ActionMock {
  readonly description: string;
  readonly perform: jest.Mock<Promise<void>>;
}

const driver = {};

given('a newly created executor() is called', () => {
  let action: ActionMock;
  let executor: Executor<object>;

  beforeEach(() => {
    action = {
      description: '<actionDescription>',
      perform: jest.fn<Promise<void>>()
    };

    executor = createExecutor(action);
  });

  then('it should call action.perform() once', async () => {
    await executor(driver, 2, 1);

    expect(action.perform.mock.calls.length).toBe(1);
    expect(action.perform.mock.calls[0][0]).toBe(driver);
  });

  when('the call to action.perform() does not throw an error', () => {
    then('it should return a successful execution', async () => {
      const execution = await executor(driver, 1, 0);

      expect(execution.description).toBe('<actionDescription>');
      expect(execution.error).toBe(false);

      expect((await executor(driver, 1, 1)).description).toBe(
        '<actionDescription>'
      );

      expect((await executor(driver, 1, 2)).description).toBe(
        '<actionDescription>'
      );

      expect((await executor(driver, 2, 1)).description).toBe(
        '<actionDescription>' + ' (attempt 2 of 2)'
      );

      expect((await executor(driver, 2, 2)).description).toBe(
        '<actionDescription>' + ' (attempt 2 of 3)'
      );
    });
  });

  when('the call to action.perform() throws an error', () => {
    then('it should return an erroneous execution', async () => {
      action.perform.mockImplementationOnce(async () => {
        throw new Error('<cause>');
      });

      action.perform.mockImplementationOnce(async () => {
        throw new Error();
      });

      action.perform.mockImplementationOnce(async () => {
        throw undefined;
      });

      for (const message of ['<cause>', 'unknown error', 'unknown error']) {
        const execution = await executor(driver, 2, 1);

        expect(execution.description).toBe(`<actionDescription> (${message})`);
        expect(execution.error).toBe(true);
      }
    });
  });
});

given('execute() is called with retries=1', () => {
  const options = {retries: 1, retryDelay: 0};

  let executor: jest.Mock<Executor<object>>;

  beforeEach(() => {
    executor = jest.fn<Executor<object>>();
  });

  when('any call to executor() returns a successful execution', () => {
    beforeEach(() => {
      executor.mockImplementation(async () => ({
        description: 'attempt 1',
        error: false
      }));
    });

    then('it should call executor() once', async () => {
      await execute(executor, driver, options);

      expect(executor.mock.calls.length).toBe(1);
      expect(executor.mock.calls[0][0]).toBe(driver);
      expect(executor.mock.calls[0][1]).toBe(1);
      expect(executor.mock.calls[0][2]).toBe(options.retries);
    });

    then('it should return the execution', async () => {
      const execution = await execute(executor, driver, options);

      expect(execution).toEqual({description: 'attempt 1', error: false});
    });
  });

  when('any call to executor() returns an erroneous execution', () => {
    beforeEach(() => {
      executor.mockImplementationOnce(async () => ({
        description: 'attempt 1',
        error: true
      }));

      executor.mockImplementationOnce(async () => ({
        description: 'attempt 2',
        error: true
      }));
    });

    then('it should call executor() twice', async () => {
      await execute(executor, driver, options);

      expect(executor.mock.calls.length).toBe(2);
      expect(executor.mock.calls[0][0]).toBe(driver);
      expect(executor.mock.calls[0][1]).toBe(1);
      expect(executor.mock.calls[0][2]).toBe(options.retries);
      expect(executor.mock.calls[1][0]).toBe(driver);
      expect(executor.mock.calls[1][1]).toBe(2);
      expect(executor.mock.calls[1][2]).toBe(options.retries);
    });

    then('it should return the second execution', async () => {
      const execution = await execute(executor, driver, options);

      expect(execution).toEqual({description: 'attempt 2', error: true});
    });

    then('it should delay the second call to executor()', async () => {
      try {
        jest.useFakeTimers();

        const retryDelay = 123;
        const promise = execute(executor, driver, {...options, retryDelay});

        await shortSleep();

        expect(executor.mock.calls.length).toBe(1);

        jest.runTimersToTime(retryDelay - 1);

        await shortSleep();

        expect(executor.mock.calls.length).toBe(1);

        jest.runTimersToTime(1);

        await shortSleep();

        expect(executor.mock.calls.length).toBe(2);

        await promise;
      } finally {
        jest.useRealTimers();
      }
    });
  });
});
