import {Action} from '@cybernaut/types/lib/Action';
import {Condition} from '@cybernaut/types/lib/Condition';
import {format} from '@cybernaut/utils/lib/format';
import {getOption} from '@cybernaut/utils/lib/getOption';

interface ConditionResult {
  /* tslint:disable-next-line no-any */
  readonly actualValue: any;
  readonly attempts: number;
}

export interface EngineOptions {
  readonly retries: number;
  readonly retryDelay: number;
}

async function sleep(duration: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, duration);
  });
}

export class Engine {
  private readonly retries: number;
  private readonly retryDelay: number;

  public constructor(options?: Partial<EngineOptions>) {
    this.retries = getOption(options, 'retries', 4);
    this.retryDelay = getOption(options, 'retryDelay', 1000);

    this.assert = this.assert.bind(this);
    this.perform = this.perform.bind(this);
    this.verify = this.verify.bind(this);
  }

  public async assert(condition: Condition): Promise<void> {
    const {description} = condition;

    let result: ConditionResult | undefined;

    try {
      result = await this.check(condition);
    } catch (error) {
      throw new Error(`Assert: ${description} => Error: ${error.message}`);
    }

    const {actualValue, attempts} = result;

    if (attempts === 0) {
      throw new Error(
        `Assert: ${description} => Actual value: ${format(actualValue)}`
      );
    }
  }

  public async perform<T>(action: Action<T>): Promise<T> {
    const {description, implementation} = action;

    let attempt = 1;

    while (true) {
      try {
        return await implementation();
      } catch (error) {
        if (attempt > this.retries) {
          throw new Error(`Perform: ${description} => Error: ${error.message}`);
        }
      }

      attempt += 1;

      await sleep(this.retryDelay);
    }
  }

  public async verify(condition: Condition): Promise<boolean> {
    const {description} = condition;

    try {
      const {attempts} = await this.check(condition);

      if (attempts === 0) {
        return false;
      }

      return true;
    } catch (error) {
      throw new Error(`Verify: ${description} => Error: ${error.message}`);
    }
  }

  private async check(condition: Condition): Promise<ConditionResult> {
    const {accessor, negated, predicate} = condition;

    let attempt = 1;

    while (true) {
      try {
        const actualValue = await accessor();
        const result = predicate(actualValue);

        if (negated ? !result : result) {
          return {actualValue, attempts: attempt};
        }

        if (attempt > this.retries) {
          return {actualValue, attempts: 0};
        }
      } catch (error) {
        if (attempt > this.retries) {
          throw error;
        }
      }

      attempt += 1;

      await sleep(this.retryDelay);
    }
  }
}
