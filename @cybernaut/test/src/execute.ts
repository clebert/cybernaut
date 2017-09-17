import {sleep} from './sleep';

export async function execute(
  fn: () => Promise<void>,
  maxRetries: number,
  retryDelay: number
): Promise<void> {
  let attempt = 1;

  while (true) {
    try {
      await fn();

      return;
    } catch (error) {
      if (attempt > maxRetries) {
        throw error;
      }
    }

    attempt += 1;

    await sleep(retryDelay);
  }
}
