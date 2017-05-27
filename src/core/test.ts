import {Accessor} from './accessor';
import {Action} from './action';
import {createExecutor, execute} from './execution';
import {Options} from './options';
import {Predicate} from './predicate';
import {createVerifier, verify} from './verification';

export interface Logger {
  pass(message: string): void;
}

export class Test<T> {
  private readonly _driver: T;
  private readonly _logger: Logger;
  private readonly _options: Options;

  public constructor(driver: T, logger: Logger, options: Options) {
    this._driver = driver;
    this._logger = logger;
    this._options = options;
  }

  public async assert<U>(
    accessor: Accessor<T, U>,
    predicate: Predicate<U>,
    options?: Partial<Options>
  ): Promise<void> {
    const verifier = createVerifier(accessor, predicate);

    const verification = await verify(
      verifier, this._driver, {...this._options, ...options}
    );

    const message = 'Assert: ' + verification.description;

    if (verification.result === 'error' || verification.result === 'invalid') {
      throw new Error(message);
    }

    this._logger.pass(message);
  }

  public async perform(
    action: Action<T>, options?: Partial<Options>
  ): Promise<void> {
    const executor = createExecutor(action);

    const execution = await execute(
      executor, this._driver, {...this._options, ...options}
    );

    const message = 'Perform: ' + execution.description;

    if (execution.error) {
      throw new Error(message);
    }

    this._logger.pass(message);
  }

  public async verify<U>(
    accessor: Accessor<T, U>,
    predicate: Predicate<U>,
    options?: Partial<Options>
  ): Promise<boolean> {
    const verifier = createVerifier(accessor, predicate);

    const verification = await verify(
      verifier, this._driver, {...this._options, ...options}
    );

    const message = 'Verify: ' + verification.description;

    if (verification.result === 'error') {
      throw new Error(message);
    }

    this._logger.pass(message);

    return verification.result === 'valid';
  }
}
