import {execute} from '../execute';

/* This function works in conjunction with Jest fake timers. */
async function nap(): Promise<void> {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

describe('execute()', () => {
  /* tslint:disable-next-line no-any */
  let testStep: jest.Mock<any>;
  let error: Error;

  beforeEach(() => {
    testStep = jest.fn();
    error = new Error('error');
  });

  it('should throw an error', async () => {
    testStep.mockImplementation(async () => {
      throw error;
    });

    const maxRetries = 2;

    await expect(execute(testStep, maxRetries, 0)).rejects.toBe(error);

    expect(testStep.mock.calls.length).toEqual(maxRetries + 1);
  });

  it('should return a value', async () => {
    testStep
      .mockImplementationOnce(async () => {
        throw error;
      })
      .mockImplementation(async () => 'value');

    expect(await execute(testStep, 1, 0)).toBe('value');

    expect(testStep.mock.calls.length).toEqual(2);
  });

  it('should delay any retry', async () => {
    testStep
      .mockImplementationOnce(async () => {
        throw error;
      })
      .mockImplementation(async () => 'value');

    const retryDelay = 1000;

    try {
      jest.useFakeTimers();

      const promise = execute(testStep, 1, retryDelay);

      await nap();

      expect(testStep.mock.calls.length).toBe(1);

      jest.runTimersToTime(retryDelay - 1);

      await nap();

      expect(testStep.mock.calls.length).toBe(1);

      jest.runTimersToTime(1);

      await nap();

      expect(await promise).toBe('value');

      expect(testStep.mock.calls.length).toEqual(2);
    } finally {
      jest.useRealTimers();
    }
  });
});
