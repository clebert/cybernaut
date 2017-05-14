import {WebDriver} from 'selenium-webdriver';
import {Action} from './action';
import {Config} from './config';
import {sleep} from './utils';

export interface Execution {
  readonly description: string;
  readonly error: boolean;
}

export type Executor = (
  driver: WebDriver, attempt: number, retries: number
) => Promise<Execution>;

export type Options = Pick<Config, 'retries' | 'retryDelay'>;

export function createExecutor(action: Action): Executor {
  const {description} = action;

  return async (driver: WebDriver, attempt: number, retries: number) => {
    try {
      await action.perform(driver);

      const attempts = ` (attempt ${attempt} of ${retries + 1})`;

      return {
        description: action.description + (attempt > 1 ? attempts : ''),
        error: false
      };
    } catch (e) {
      const error = e && e.message ? e.message : 'unknown error';

      return {description: `${description} (${error})`, error: true};
    }
  };
}

export async function execute(
  executor: Executor, driver: WebDriver, options: Options, _attempt: number = 1
): Promise<Execution> {
  const {retries, retryDelay} = options;

  const execution = await executor(driver, _attempt, retries);

  if (!execution.error || retries < _attempt) {
    return execution;
  }

  await sleep(retryDelay);

  return execute(executor, driver, options, _attempt + 1);
}
