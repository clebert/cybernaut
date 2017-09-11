import {sleep} from './sleep';

export async function execute<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  retryDelay: number
): Promise<T> {
  let attempt = 1;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt > maxRetries) {
        throw error;
      }
    }

    attempt += 1;

    await sleep(retryDelay);
  }
}
