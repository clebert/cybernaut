import {WebDriver} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';
import {format} from './description';
import {Predicate} from './predicate';
import {run} from './step';

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
    const accessorString = format(accessor.description);
    const predicateString = format(predicate.description);
    const message = `Assert: ${accessorString} ${predicateString}`;

    try {
      const attempts = await run(async () => {
        await this._test(accessor, predicate);
      }, retries, retryDelay);

      this.pass(
        `${message} (succeeded at attempt ${attempts} of ${retries + 1})`
      );
    } catch (e) {
      this.fail(`${message} (failed because ${e.message})`);
    }
  }

  public async perform(
    action: Action,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<void> {
    const message = 'Perform: ' + format(action.description);

    try {
      const attempts = await run(async () => {
        await action.perform(this._driver);
      }, retries, retryDelay);

      this.pass(
        `${message} (succeeded at attempt ${attempts} of ${retries + 1})`
      );
    } catch (e) {
      this.fail(`${message} (failed because ${e.message})`);
    }
  }

  public async verify<T>(
    accessor: Accessor<T>,
    predicate: Predicate<T>,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<boolean> {
    const accessorString = format(accessor.description);
    const predicateString = format(predicate.description);
    const message = `Verify: ${accessorString} ${predicateString}`;

    try {
      const attempts = await run(async () => {
        await this._test(accessor, predicate);
      }, retries, retryDelay);

      this.pass(
        `${message} (succeeded at attempt ${attempts} of ${retries + 1})`
      );

      return true;
    } catch (e) {
      this.pass(`${message} (failed because ${e.message})`);

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
