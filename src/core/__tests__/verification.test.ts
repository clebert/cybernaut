import {Verifier, createVerifier, verify} from '../verification';
import {given, shortSleep, then, when} from './test-utils';

interface AccessorMock {
  readonly description: string;
  readonly get: jest.Mock<Promise<string>>;
}

interface PredicateMock {
  readonly compare: jest.Mock<string>;
  readonly description: string;
  readonly test: jest.Mock<boolean>;
}

const driver = {};

given('a newly created verifier() is called', () => {
  let accessor: AccessorMock;
  let description: string;
  let predicate: PredicateMock;
  let verifier: Verifier<object>;

  beforeEach(() => {
    accessor = {
      description: '<accessorDescription>', get: jest.fn<Promise<string>>()
    };

    predicate = {
      compare: jest.fn<string>().mockReturnValue('<predicateComparison>'),
      description: '<predicateDescription>',
      test: jest.fn<boolean>()
    };

    description = '<accessorDescription> <predicateDescription>';
    verifier = createVerifier(accessor, predicate);
  });

  then('it should call accessor.get() once', async () => {
    await verifier(driver, 2, 1);

    expect(accessor.get.mock.calls.length).toBe(1);
    expect(accessor.get.mock.calls[0][0]).toBe(driver);
  });

  when('the call to accessor.get() returns an actual value', () => {
    beforeEach(() => {
      accessor.get.mockImplementation(async () => '<actualValue>');
    });

    then('it should call predicate.test() once', async () => {
      await verifier(driver, 2, 1);

      expect(predicate.test.mock.calls.length).toBe(1);
      expect(predicate.test.mock.calls[0][0]).toBe('<actualValue>');
    });

    when('the call to predicate.test() returns true', () => {
      then('it should return a valid verification', async () => {
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

    when('the call to predicate.test() returns false', () => {
      beforeEach(() => {
        predicate.test.mockReturnValue(false);
      });

      then('it should call predicate.compare() once', async () => {
        await verifier(driver, 2, 1);

        expect(predicate.compare.mock.calls.length).toBe(1);
        expect(predicate.compare.mock.calls[0][0]).toBe('<actualValue>');
      });

      then('it should return an invalid verification', async () => {
        const verification = await verifier(driver, 2, 1);

        expect(verification.description).toBe(
          `${description} (<predicateComparison>)`
        );

        expect(verification.result).toBe('invalid');
      });
    });

    when('the call to predicate.test() throws an error', () => {
      then('it should return an erroneous verification', async () => {
        predicate.test.mockImplementationOnce(() => {
          throw new Error('<cause>');
        });

        predicate.test.mockImplementationOnce(() => {
          throw new Error();
        });

        predicate.test.mockImplementationOnce(() => {
          throw undefined;
        });

        for (const message of ['<cause>', 'unknown error', 'unknown error']) {
          const verification = await verifier(driver, 2, 1);

          expect(verification.description).toBe(`${description} (${message})`);
          expect(verification.result).toBe('error');
        }
      });
    });
  });

  when('the call to accessor.get() throws an error', () => {
    then('it should return an erroneous verification', async () => {
      accessor.get.mockImplementationOnce(async () => {
        throw new Error('<cause>');
      });

      accessor.get.mockImplementationOnce(async () => {
        throw new Error();
      });

      accessor.get.mockImplementationOnce(async () => {
        throw undefined;
      });

      for (const message of ['<cause>', 'unknown error', 'unknown error']) {
        const verification = await verifier(driver, 2, 1);

        expect(verification.description).toBe(`${description} (${message})`);
        expect(verification.result).toBe('error');
      }
    });
  });
});

given('verify() is called with retries=1', () => {
  const options = {retries: 1, retryDelay: 0};

  let verifier: jest.Mock<Verifier<object>>;

  beforeEach(() => {
    verifier = jest.fn<Verifier<object>>();
  });

  when('any call to verifier() returns a valid verification', () => {
    beforeEach(() => {
      verifier.mockImplementation(async () => ({
        description: 'attempt 1', result: 'valid'
      }));
    });

    then('it should call verifier() once', async () => {
      await verify(verifier, driver, options);

      expect(verifier.mock.calls.length).toBe(1);
      expect(verifier.mock.calls[0][0]).toBe(driver);
      expect(verifier.mock.calls[0][1]).toBe(1);
      expect(verifier.mock.calls[0][2]).toBe(options.retries);
    });

    then('it should return the verification', async () => {
      const verification = await verify(verifier, driver, options);

      expect(verification).toEqual({description: 'attempt 1', result: 'valid'});
    });
  });

  for (const result of ['invalid', 'error']) {
    const adjective = result === 'error' ? 'erroneous' : result;

    when(`any call to verifier() returns an ${adjective} verification`, () => {
      beforeEach(() => {
        verifier.mockImplementationOnce(async () => ({
          description: 'attempt 1', result
        }));

        verifier.mockImplementationOnce(async () => ({
          description: 'attempt 2', result
        }));
      });

      then('it should call verifier() twice', async () => {
        await verify(verifier, driver, options);

        expect(verifier.mock.calls.length).toBe(2);
        expect(verifier.mock.calls[0][0]).toBe(driver);
        expect(verifier.mock.calls[0][1]).toBe(1);
        expect(verifier.mock.calls[0][2]).toBe(options.retries);
        expect(verifier.mock.calls[1][0]).toBe(driver);
        expect(verifier.mock.calls[1][1]).toBe(2);
        expect(verifier.mock.calls[1][2]).toBe(options.retries);
      });

      then('it should return the second verification', async () => {
        const verification = await verify(verifier, driver, options);

        expect(verification).toEqual({description: 'attempt 2', result});
      });

      then('it should delay the second call to verifier()', async () => {
        try {
          jest.useFakeTimers();

          const retryDelay = 123;
          const promise = verify(verifier, driver, {...options, retryDelay});

          await shortSleep();

          expect(verifier.mock.calls.length).toBe(1);

          jest.runTimersToTime(retryDelay - 1);

          await shortSleep();

          expect(verifier.mock.calls.length).toBe(1);

          jest.runTimersToTime(1);

          await shortSleep();

          expect(verifier.mock.calls.length).toBe(2);

          await promise;
        } finally {
          jest.useRealTimers();
        }
      });
    });
  }
});
