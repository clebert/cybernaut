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

  public abstract fail(message: string, cause: Error): void;
  public abstract pass(message: string): void;

  public async assert<T>(
    accessor: Accessor<T>,
    predicate: Predicate<T>,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<void> {
    const message =
      `${format(accessor.description)} ${format(predicate.description)}`;

    try {
      const attempts = await run(async () => {
        if (!predicate.test(await accessor.get(this._driver))) {
          throw new Error('Predicate evaluates to false');
        }
      }, retries, retryDelay);

      this.pass(`${message} (attempt ${attempts} of ${retries + 1})`);
    } catch (e) {
      this.fail(message, e);
    }
  }

  public async perform(
    action: Action,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<void> {
    const message = format(action.description);

    try {
      const attempts = await run(async () => {
        await action.perform(this._driver);
      }, retries, retryDelay);

      this.pass(`${message} (attempt ${attempts} of ${retries + 1})`);
    } catch (e) {
      this.fail(message, e);
    }
  }

  public async verify<T>(
    accessor: Accessor<T>,
    predicate: Predicate<T>,
    retries: number = this._retries,
    retryDelay: number = this._retryDelay
  ): Promise<boolean> {
    try {
      await run(async () => {
        if (!predicate.test(await accessor.get(this._driver))) {
          throw new Error('Predicate evaluates to false');
        }
      }, retries, retryDelay);

      return true;
    } catch (e) {
      return false;
    }
  }
}
