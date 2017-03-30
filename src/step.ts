import {sleep} from './utils';

export type Step = () => Promise<void>;

export async function run(
  step: Step, retries: number, retryDelay: number, attempts: number = 1
): Promise<number> {
  try {
    await step();

    return attempts;
  } catch (e) {
    if (retries >= attempts) {
      await sleep(retryDelay);

      return run(step, retries, retryDelay, attempts + 1);
    } else {
      throw e;
    }
  }
}
