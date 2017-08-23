import {MockAction} from '@cybernaut/mocks/lib//MockAction';
import {MockCondition} from '@cybernaut/mocks/lib//MockCondition';
import {Engine} from '../Engine';

// This function works in conjunction with Jest fake timers.
async function nap(): Promise<void> {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

let action: MockAction<any>; // tslint:disable-line no-any
let condition: MockCondition<any>; // tslint:disable-line no-any
let negatedCondition: MockCondition<any>; // tslint:disable-line no-any
let error: Error;

beforeEach(() => {
  action = new MockAction('an action');
  condition = new MockCondition('a condition', false);
  negatedCondition = new MockCondition('a negated condition', true);
  error = new Error('an error');
});

describe('Test.assert()', () => {
  it('should throw an error when the specified accessor throws', async () => {
    expect.assertions(3);

    condition.accessor.mockImplementation(async () => {
      throw error;
    });

    const {assert} = new Engine({retryDelay: 0});

    await expect(assert(condition)).rejects.toEqual(
      new Error('Assert: a condition => Error: an error')
    );

    expect(condition.accessor.mock.calls).toEqual([[], [], [], [], []]);
    expect(condition.predicate.mock.calls.length).toBe(0);
  });

  it('should return when the specified predicate finally succeeds', async () => {
    expect.assertions(2);

    condition.accessor.mockImplementation(async () => 'a value');

    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {assert} = new Engine({retryDelay: 0});

    await assert(condition);

    expect(condition.accessor.mock.calls).toEqual([[], []]);
    expect(condition.predicate.mock.calls).toEqual([['a value'], ['a value']]);
  });

  it('should throw an error when the specified predicate fails', async () => {
    expect.assertions(3);

    condition.accessor.mockImplementation(async () => 'a value');
    condition.predicate.mockImplementation(() => false);

    const {assert} = new Engine({retries: 2, retryDelay: 0});

    await expect(assert(condition)).rejects.toEqual(
      new Error("Assert: a condition => Actual value: 'a value'")
    );

    expect(condition.accessor.mock.calls).toEqual([[], [], []]);

    expect(condition.predicate.mock.calls).toEqual([
      ['a value'],
      ['a value'],
      ['a value']
    ]);
  });

  it('should return when the specified negated predicate fails', async () => {
    expect.assertions(2);

    negatedCondition.accessor.mockImplementation(async () => 'a value');
    negatedCondition.predicate.mockImplementation(() => false);

    const {assert} = new Engine({retries: 2, retryDelay: 0});

    await assert(negatedCondition);

    expect(negatedCondition.accessor.mock.calls).toEqual([[]]);
    expect(negatedCondition.predicate.mock.calls).toEqual([['a value']]);
  });

  it('should delay any retry', async () => {
    expect.assertions(6);

    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {assert} = new Engine();

    try {
      jest.useFakeTimers();

      const promise = assert(condition);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(1);
      expect(condition.predicate.mock.calls.length).toBe(1);

      jest.runTimersToTime(999);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(1);
      expect(condition.predicate.mock.calls.length).toBe(1);

      jest.runTimersToTime(1);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(2);
      expect(condition.predicate.mock.calls.length).toBe(2);

      await promise;
    } finally {
      jest.useRealTimers();
    }
  });
});

describe('Test.verify()', () => {
  it('should throw an error when the specified accessor throws', async () => {
    expect.assertions(3);

    condition.accessor.mockImplementation(async () => {
      throw error;
    });

    const {verify} = new Engine({retryDelay: 0});

    await expect(verify(condition)).rejects.toEqual(
      new Error('Verify: a condition => Error: an error')
    );

    expect(condition.accessor.mock.calls).toEqual([[], [], [], [], []]);
    expect(condition.predicate.mock.calls.length).toBe(0);
  });

  it('should return true when the specified predicate finally succeeds', async () => {
    expect.assertions(3);

    condition.accessor.mockImplementation(async () => 'a value');

    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {verify} = new Engine({retryDelay: 0});

    expect(await verify(condition)).toBe(true);

    expect(condition.accessor.mock.calls).toEqual([[], []]);
    expect(condition.predicate.mock.calls).toEqual([['a value'], ['a value']]);
  });

  it('should return false when the specified predicate fails', async () => {
    expect.assertions(3);

    condition.accessor.mockImplementation(async () => 'a value');
    condition.predicate.mockImplementation(() => false);

    const {verify} = new Engine({retries: 2, retryDelay: 0});

    expect(await verify(condition)).toBe(false);

    expect(condition.accessor.mock.calls).toEqual([[], [], []]);

    expect(condition.predicate.mock.calls).toEqual([
      ['a value'],
      ['a value'],
      ['a value']
    ]);
  });

  it('should return true when the specified negated predicate fails', async () => {
    expect.assertions(3);

    negatedCondition.accessor.mockImplementation(async () => 'a value');
    negatedCondition.predicate.mockImplementation(() => false);

    const {verify} = new Engine({retries: 2, retryDelay: 0});

    expect(await verify(negatedCondition)).toBe(true);

    expect(negatedCondition.accessor.mock.calls).toEqual([[]]);
    expect(negatedCondition.predicate.mock.calls).toEqual([['a value']]);
  });

  it('should delay any retry', async () => {
    expect.assertions(6);

    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {verify} = new Engine();

    try {
      jest.useFakeTimers();

      const promise = verify(condition);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(1);
      expect(condition.predicate.mock.calls.length).toBe(1);

      jest.runTimersToTime(999);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(1);
      expect(condition.predicate.mock.calls.length).toBe(1);

      jest.runTimersToTime(1);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(2);
      expect(condition.predicate.mock.calls.length).toBe(2);

      await promise;
    } finally {
      jest.useRealTimers();
    }
  });
});

describe('Test.perform()', () => {
  it('should throw an error when the specified implementation throws', async () => {
    expect.assertions(2);

    action.implementation.mockImplementation(async () => {
      throw error;
    });

    const {perform} = new Engine({retryDelay: 0});

    await expect(perform(action)).rejects.toEqual(
      new Error('Perform: an action => Error: an error')
    );

    expect(action.implementation.mock.calls).toEqual([[], [], [], [], []]);
  });

  it('should return when the specified implementation finally returns', async () => {
    expect.assertions(1);

    action.implementation
      .mockImplementationOnce(async () => {
        throw error;
      })
      .mockImplementation(async () => 'a screenshot');

    const {perform} = new Engine({retryDelay: 0});

    await perform(action);

    expect(action.implementation.mock.calls).toEqual([[], []]);
  });

  it('should respect custom engine options', async () => {
    expect.assertions(2);

    action.implementation.mockImplementation(async () => {
      throw error;
    });

    const {perform} = new Engine({retries: 2, retryDelay: 0});

    await expect(perform(action)).rejects.toBeDefined();

    expect(action.implementation.mock.calls).toEqual([[], [], []]);
  });

  it('should delay any retry', async () => {
    expect.assertions(3);

    action.implementation
      .mockImplementationOnce(async () => {
        throw error;
      })
      .mockImplementation(async () => 'a screenshot');

    const {perform} = new Engine();

    try {
      jest.useFakeTimers();

      const promise = perform(action);

      await nap();

      expect(action.implementation.mock.calls.length).toBe(1);

      jest.runTimersToTime(999);

      await nap();

      expect(action.implementation.mock.calls.length).toBe(1);

      jest.runTimersToTime(1);

      await nap();

      expect(action.implementation.mock.calls.length).toBe(2);

      await promise;
    } finally {
      jest.useRealTimers();
    }
  });
});
