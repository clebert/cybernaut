import {WebDriver} from 'selenium-webdriver';
import {Config} from './config';
import {Accessor} from './core/accessor';
import {Action} from './core/action';
import {createExecutor, execute} from './core/execution';
import {Predicate} from './core/predicate';
import {createVerifier, verify} from './core/verification';

export interface Logger {
  pass(message: string): void;
}

export type Options = Pick<Config, 'retries' | 'retryDelay'>;

export class Test {
  private readonly _driver: WebDriver;
  private readonly _logger: Logger;
  private readonly _options: Options;

  public constructor(driver: WebDriver, logger: Logger, options: Options) {
    this._driver = driver;
    this._logger = logger;
    this._options = options;
  }

  public async assert<T>(
    accessor: Accessor<T>, predicate: Predicate<T>, options?: Partial<Options>
  ): Promise<void> {
    const verifier = createVerifier(accessor, predicate);

    const verification = await verify(
      verifier, this._driver, {...this._options, options}
    );

    const message = 'Assert: ' + verification.description;

    if (verification.result === 'error' || verification.result === 'invalid') {
      throw new Error(message);
    }

    this._logger.pass(message);
  }

  public async perform(
    action: Action, options?: Partial<Options>
  ): Promise<void> {
    const executor = createExecutor(action);

    const execution = await execute(
      executor, this._driver, {...this._options, options}
    );

    const message = 'Perform: ' + execution.description;

    if (execution.error) {
      throw new Error(message);
    }

    this._logger.pass(message);
  }

  public async verify<T>(
    accessor: Accessor<T>, predicate: Predicate<T>, options?: Partial<Options>
  ): Promise<boolean> {
    const verifier = createVerifier(accessor, predicate);

    const verification = await verify(
      verifier, this._driver, {...this._options, options}
    );

    const message = 'Verify: ' + verification.description;

    if (verification.result === 'error') {
      throw new Error(message);
    }

    this._logger.pass(message);

    return verification.result === 'valid';
  }
}
