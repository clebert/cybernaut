import {WebDriver} from 'selenium-webdriver';
import {Accessor} from '../accessor';
import {Predicate} from '../predicate';
import {Verifier, createVerifier, verify} from '../verification';

type AccessorMock<T> = Pick<Accessor<T>, 'name'> & {
  readonly get: jest.Mock<Promise<T>>
};

type PredicateMock<T> = Pick<Predicate<T>, 'description'> & {
  readonly compare: jest.Mock<string>;
  readonly test: jest.Mock<boolean>;
};

const driver = {} as WebDriver;

describe('given a newly created verifier() is called', () => {
  let accessor: AccessorMock<string>;
  let description: string;
  let predicate: PredicateMock<string>;
  let verifier: Verifier;

  beforeEach(() => {
    accessor = {name: '<accessorName>', get: jest.fn<Promise<string>>()};

    predicate = {
      description: '<predicateDescription>',
      compare: jest.fn<string>().mockReturnValue('<predicateComparison>'),
      test: jest.fn<boolean>()
    };

    description = `${accessor.name} ${predicate.description}`;
    verifier = createVerifier(accessor, predicate);
  });

  test('then it should call accessor.get() once', async () => {
    await verifier(driver, 2, 1);

    expect(accessor.get.mock.calls.length).toBe(1);
    expect(accessor.get.mock.calls[0][0]).toBe(driver);
  });

  describe('when the call to accessor.get() returns an actual value', () => {
    beforeEach(() => {
      accessor.get.mockImplementation(async () => '<actualValue>');
    });

    test('then it should call predicate.test() once', async () => {
      await verifier(driver, 2, 1);

      expect(predicate.test.mock.calls.length).toBe(1);
      expect(predicate.test.mock.calls[0][0]).toBe('<actualValue>');
    });

    describe('when the call to predicate.test() returns true', () => {
      test('then it should return a valid verification', async () => {
        predicate.test.mockReturnValue(true);

        const verification = await verifier(driver, 1, 0);

        expect(verification.description).toBe(description);
        expect(verification.result).toBe('valid');

        expect((await verifier(driver, 1, 1)).description).toBe(description);
        expect((await verifier(driver, 1, 2)).description).toBe(description);

        expect((await verifier(driver, 2, 1)).description).toBe(
          description + ' (attempt 2 of 2)'
        );

        expect((await verifier(driver, 2, 2)).description).toBe(
          description + ' (attempt 2 of 3)'
        );
      });
    });

    describe('when the call to predicate.test() returns false', () => {
      beforeEach(() => {
        predicate.test.mockReturnValue(false);
      });

      test('then it should call predicate.compare() once', async () => {
        await verifier(driver, 2, 1);

        expect(predicate.compare.mock.calls.length).toBe(1);
        expect(predicate.compare.mock.calls[0][0]).toBe('<actualValue>');
      });

      test('then it should return an invalid verification', async () => {
        const verification = await verifier(driver, 2, 1);

        expect(verification.description).toBe(
          `${description} (<predicateComparison>)`
        );

        expect(verification.result).toBe('invalid');
      });
    });

    describe('when the call to predicate.test() throws an error', () => {
      test('then it should return an error verification', async () => {
        predicate.test.mockImplementationOnce(() => {
          throw new Error('<message>');
        });

        predicate.test.mockImplementationOnce(() => {
          throw new Error();
        });

        predicate.test.mockImplementationOnce(() => {
          throw undefined;
        });

        for (const message of ['<message>', 'unknown error', 'unknown error']) {
          const verification = await verifier(driver, 2, 1);

          expect(verification.description).toBe(`${description} (${message})`);
          expect(verification.result).toBe('error');
        }
      });
    });
  });

  describe('when the call to accessor.get() throws an error', () => {
    test('then it should return an error verification', async () => {
      accessor.get.mockImplementationOnce(async () => {
        throw new Error('<message>');
      });

      accessor.get.mockImplementationOnce(async () => {
        throw new Error();
      });

      accessor.get.mockImplementationOnce(async () => {
        throw undefined;
      });

      for (const message of ['<message>', 'unknown error', 'unknown error']) {
        const verification = await verifier(driver, 2, 1);

        expect(verification.description).toBe(`${description} (${message})`);
        expect(verification.result).toBe('error');
      }
    });
  });
});

describe('given verify() is called with a retries-option of 1', () => {
  const options = {retries: 1, retryDelay: 0};

  let verifier: jest.Mock<Verifier>;

  beforeEach(() => {
    verifier = jest.fn<Verifier>();
  });

  describe('when any call to verifier() returns a valid verification', () => {
    beforeEach(() => {
      verifier.mockImplementation(async () => ({
        description: 'attempt 1', result: 'valid'
      }));
    });

    test('then it should call verifier() once', async () => {
      await verify(verifier, driver, options);

      expect(verifier.mock.calls.length).toBe(1);
      expect(verifier.mock.calls[0][0]).toBe(driver);
      expect(verifier.mock.calls[0][1]).toBe(1);
      expect(verifier.mock.calls[0][2]).toBe(options.retries);
    });

    test('then it should return the verification', async () => {
      const verification = await verify(verifier, driver, options);

      expect(verification).toEqual({description: 'attempt 1', result: 'valid'});
    });
  });

  for (const result of ['invalid', 'error']) {
    const name =
      `when any call to verifier() returns an ${result} verification`;

    describe(name, () => {
      beforeEach(() => {
        verifier.mockImplementationOnce(async () => ({
          description: 'attempt 1', result
        }));

        verifier.mockImplementationOnce(async () => ({
          description: 'attempt 2', result
        }));
      });

      test('then it should call verifier() twice', async () => {
        await verify(verifier, driver, options);

        expect(verifier.mock.calls.length).toBe(2);
        expect(verifier.mock.calls[0][0]).toBe(driver);
        expect(verifier.mock.calls[0][1]).toBe(1);
        expect(verifier.mock.calls[0][2]).toBe(options.retries);
        expect(verifier.mock.calls[1][0]).toBe(driver);
        expect(verifier.mock.calls[1][1]).toBe(2);
        expect(verifier.mock.calls[1][2]).toBe(options.retries);
      });

      test('then it should return the second verification', async () => {
        const verification = await verify(verifier, driver, options);

        expect(verification).toEqual({description: 'attempt 2', result});
      });

      test('then it should delay the second call to verifier()', async () => {
        try {
          jest.useFakeTimers();

          const retryDelay = 123;
          const promise = verify(verifier, driver, {...options, retryDelay});

          await Promise.resolve();
          await Promise.resolve();

          expect(verifier.mock.calls.length).toBe(1);

          jest.runTimersToTime(retryDelay - 1);

          await Promise.resolve();
          await Promise.resolve();

          expect(verifier.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await Promise.resolve();
          await Promise.resolve();

          expect(verifier.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  }
});
