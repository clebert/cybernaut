import {WebDriver} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';
import {format} from './description';
import {Predicate} from './predicate';
import {run} from './step';

function describe<T>(accessor: Accessor<T>, predicate: Predicate<T>): string {
  return `${format(accessor.description)} ${format(predicate.description)}`;
}

function ok(message: string, attempts: number, retries: number): string {
  return `${message} (succeeded at attempt ${attempts} of ${retries + 1})`;
}

function notOk(message: string, error: Error): string {
  return `${message} (failed because ${error.message})`;
}

export abstract class Test {
  private readonly _driver: WebDriver;
  private readonly _retries: number;
  private readonly _retryDelay: number;

  public constructor(driver: WebDriver, retries: number, retryDelay: number) {
    this._driver = driver;
    this._retries = retries;
    this._retryDelay = retryDelay;
  }

  public abstract fail(message: string): void;
  public abstract pass(message: string): void;

  public async assert<T>(
    accessor: Accessor<T>,
    predicate: Predicate<T>,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<void> {
    const message = 'Assert: ' + describe(accessor, predicate);

    try {
      const attempts = await run(
        async () => {
          await this._test(accessor, predicate);
        },
        retries,
        retryDelay
      );

      this.pass(ok(message, attempts, retries));
    } catch (e) {
      this.fail(notOk(message, e));
    }
  }

  public async perform(
    action: Action,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<void> {
    const message = 'Perform: ' + format(action.description);

    try {
      const attempts = await run(
        async () => {
          await action.perform(this._driver);
        },
        retries,
        retryDelay
      );

      this.pass(ok(message, attempts, retries));
    } catch (e) {
      this.fail(notOk(message, e));
    }
  }

  public async verify<T>(
    accessor: Accessor<T>,
    predicate: Predicate<T>,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<boolean> {
    const message = 'Verify: ' + describe(accessor, predicate);

    try {
      const attempts = await run(
        async () => {
          await this._test(accessor, predicate);
        },
        retries,
        retryDelay
      );

      this.pass(ok(message, attempts, retries));

      return true;
    } catch (e) {
      this.pass(notOk(message, e));

      return false;
    }
  }

  private async _test<T>(
    accessor: Accessor<T>, predicate: Predicate<T>
  ): Promise<void> {
    const actualValue = await accessor.get(this._driver);

    if (!predicate.test(actualValue)) {
      throw new Error(format({
        template: 'the predicate evaluates to false, the actual value is {}',
        args: [actualValue]
      }));
    }
  }
}
