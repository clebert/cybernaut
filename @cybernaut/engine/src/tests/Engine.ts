import {MockAction} from '@cybernaut/mocks/lib/MockAction';
import {MockCondition} from '@cybernaut/mocks/lib/MockCondition';
import {Engine} from '../Engine';

/* This function works in conjunction with Jest fake timers. */
async function nap(): Promise<void> {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}

/* tslint:disable-next-line no-any */
let action: MockAction<any>;
let condition: MockCondition;
let negatedCondition: MockCondition;
let error: Error;

beforeEach(() => {
  action = new MockAction('action');
  condition = new MockCondition('condition', false);
  negatedCondition = new MockCondition('negatedCondition', true);
  error = new Error('error');
});

describe('Engine.retries', () => {
  it('should be the default value', () => {
    expect(new Engine().retries).toBe(4);
  });

  it('should be the specified value', () => {
    expect(new Engine(2).retries).toBe(2);
  });
});

describe('Engine.retryDelay', () => {
  it('should be the default value', () => {
    expect(new Engine().retryDelay).toBe(250);
  });

  it('should be the specified value', () => {
    expect(new Engine(2, 0).retryDelay).toBe(0);
  });
});

describe('Engine.assert()', () => {
  it('should throw an error when the specified accessor throws', async () => {
    condition.accessor.mockImplementation(async () => {
      throw error;
    });

    const {assert} = new Engine(4, 0);

    await expect(assert(condition)).rejects.toEqual(
      new Error('Assert: condition => Error: error')
    );

    expect(condition.accessor.mock.calls).toEqual([[], [], [], [], []]);
    expect(condition.predicate.mock.calls.length).toBe(0);
  });

  it('should return when the specified predicate finally succeeds', async () => {
    condition.accessor.mockImplementation(async () => 'value');

    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {assert} = new Engine(4, 0);

    await assert(condition);

    expect(condition.accessor.mock.calls).toEqual([[], []]);
    expect(condition.predicate.mock.calls).toEqual([['value'], ['value']]);
  });

  it('should throw an error when the specified predicate fails', async () => {
    condition.accessor.mockImplementation(async () => 'value');
    condition.predicate.mockImplementation(() => false);

    const {assert} = new Engine(2, 0);

    await expect(assert(condition)).rejects.toEqual(
      new Error("Assert: condition => Actual value: 'value'")
    );

    expect(condition.accessor.mock.calls).toEqual([[], [], []]);

    expect(condition.predicate.mock.calls).toEqual([
      ['value'],
      ['value'],
      ['value']
    ]);
  });

  it('should return when the specified negated predicate fails', async () => {
    negatedCondition.accessor.mockImplementation(async () => 'value');
    negatedCondition.predicate.mockImplementation(() => false);

    const {assert} = new Engine(2, 0);

    await assert(negatedCondition);

    expect(negatedCondition.accessor.mock.calls).toEqual([[]]);
    expect(negatedCondition.predicate.mock.calls).toEqual([['value']]);
  });

  it('should delay any retry', async () => {
    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {assert, retryDelay} = new Engine();

    try {
      jest.useFakeTimers();

      const promise = assert(condition);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(1);
      expect(condition.predicate.mock.calls.length).toBe(1);

      jest.runTimersToTime(retryDelay - 1);

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

describe('Engine.verify()', () => {
  it('should throw an error when the specified accessor throws', async () => {
    condition.accessor.mockImplementation(async () => {
      throw error;
    });

    const {verify} = new Engine(4, 0);

    await expect(verify(condition)).rejects.toEqual(
      new Error('Verify: condition => Error: error')
    );

    expect(condition.accessor.mock.calls).toEqual([[], [], [], [], []]);
    expect(condition.predicate.mock.calls.length).toBe(0);
  });

  it('should return true when the specified predicate finally succeeds', async () => {
    condition.accessor.mockImplementation(async () => 'value');

    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {verify} = new Engine(4, 0);

    expect(await verify(condition)).toBe(true);

    expect(condition.accessor.mock.calls).toEqual([[], []]);
    expect(condition.predicate.mock.calls).toEqual([['value'], ['value']]);
  });

  it('should return false when the specified predicate fails', async () => {
    condition.accessor.mockImplementation(async () => 'value');
    condition.predicate.mockImplementation(() => false);

    const {verify} = new Engine(2, 0);

    expect(await verify(condition)).toBe(false);

    expect(condition.accessor.mock.calls).toEqual([[], [], []]);

    expect(condition.predicate.mock.calls).toEqual([
      ['value'],
      ['value'],
      ['value']
    ]);
  });

  it('should return true when the specified negated predicate fails', async () => {
    negatedCondition.accessor.mockImplementation(async () => 'value');
    negatedCondition.predicate.mockImplementation(() => false);

    const {verify} = new Engine(2, 0);

    expect(await verify(negatedCondition)).toBe(true);

    expect(negatedCondition.accessor.mock.calls).toEqual([[]]);
    expect(negatedCondition.predicate.mock.calls).toEqual([['value']]);
  });

  it('should delay any retry', async () => {
    condition.predicate
      .mockImplementationOnce(() => false)
      .mockImplementation(() => true);

    const {retryDelay, verify} = new Engine();

    try {
      jest.useFakeTimers();

      const promise = verify(condition);

      await nap();

      expect(condition.accessor.mock.calls.length).toBe(1);
      expect(condition.predicate.mock.calls.length).toBe(1);

      jest.runTimersToTime(retryDelay - 1);

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

describe('Engine.perform()', () => {
  it('should throw an error when the specified implementation throws', async () => {
    action.implementation.mockImplementation(async () => {
      throw error;
    });

    const {perform} = new Engine(4, 0);

    await expect(perform(action)).rejects.toEqual(
      new Error('Perform: action => Error: error')
    );

    expect(action.implementation.mock.calls).toEqual([[], [], [], [], []]);
  });

  it('should return when the specified implementation finally returns', async () => {
    action.implementation
      .mockImplementationOnce(async () => {
        throw error;
      })
      .mockImplementation(async () => 'screenshot');

    const {perform} = new Engine(4, 0);

    await perform(action);

    expect(action.implementation.mock.calls).toEqual([[], []]);
  });

  it('should respect the specified retries and retryDelay values', async () => {
    action.implementation.mockImplementation(async () => {
      throw error;
    });

    const {perform} = new Engine(2, 0);

    await expect(perform(action)).rejects.toBeDefined();

    expect(action.implementation.mock.calls).toEqual([[], [], []]);
  });

  it('should delay any retry', async () => {
    action.implementation
      .mockImplementationOnce(async () => {
        throw error;
      })
      .mockImplementation(async () => 'screenshot');

    const {perform, retryDelay} = new Engine();

    try {
      jest.useFakeTimers();

      const promise = perform(action);

      await nap();

      expect(action.implementation.mock.calls.length).toBe(1);

      jest.runTimersToTime(retryDelay - 1);

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
