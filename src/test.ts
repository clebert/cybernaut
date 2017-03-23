import {WebDriver} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Action} from './action';
import {format} from './description';
import {Predicate} from './predicate';
import {Step, run} from './step';

export abstract class Test {
  private readonly _driver: WebDriver;
  private readonly _stepTimeout: number;

  public constructor(driver: WebDriver, stepTimeout: number) {
    this._driver = driver;
    this._stepTimeout = stepTimeout;
  }

  public abstract fail(message: string, cause: Error): void;
  public abstract pass(message: string): void;

  public async assert<T>(
    accessor: Accessor<T>, predicate: Predicate<T>, stepTimeout?: number
  ): Promise<void> {
    const message =
      `${format(accessor.description)} ${format(predicate.description)}`;

    try {
      await this._run(async () => {
        if (!predicate.test(await accessor.get(this._driver))) {
          throw new Error('Predicate evaluates to false');
        }
      }, stepTimeout);

      this.pass(message);
    } catch (e) {
      this.fail(message, e);
    }
  }

  public async perform(action: Action, stepTimeout?: number): Promise<void> {
    const message = format(action.description);

    try {
      await this._run(async () => {
        await action.perform(this._driver);
      }, stepTimeout);

      this.pass(message);
    } catch (e) {
      this.fail(message, e);
    }
  }

  public async verify<T>(
    accessor: Accessor<T>, predicate: Predicate<T>, stepTimeout?: number
  ): Promise<boolean> {
    try {
      await this._run(async () => {
        if (!predicate.test(await accessor.get(this._driver))) {
          throw new Error('Predicate evaluates to false');
        }
      }, stepTimeout);

      return true;
    } catch (e) {
      return false;
    }
  }

  private async _run(
    step: Step, stepTimeout: number = this._stepTimeout
  ): Promise<void> {
    await this._driver.manage().timeouts().implicitlyWait(stepTimeout);
    await this._driver.manage().timeouts().pageLoadTimeout(stepTimeout);
    await this._driver.manage().timeouts().setScriptTimeout(stepTimeout);

    await run(step, stepTimeout);
  }
}
