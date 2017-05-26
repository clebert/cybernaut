import {Action} from './action';
import {Options} from './options';
import {sleep} from './utils';

export interface Execution {
  readonly description: string;
  readonly error: boolean;
}

export type Executor<T> = (
  driver: T, attempt: number, retries: number
) => Promise<Execution>;

export function createExecutor<T>(action: Action<T>): Executor<T> {
  const {description} = action;

  return async (driver: T, attempt: number, retries: number) => {
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

export async function execute<T>(
  executor: Executor<T>, driver: T, options: Options, _attempt: number = 1
): Promise<Execution> {
  const {retries, retryDelay} = options;

  const execution = await executor(driver, _attempt, retries);

  if (!execution.error || retries < _attempt) {
    return execution;
  }

  await sleep(retryDelay);

  return execute(executor, driver, options, _attempt + 1);
}
