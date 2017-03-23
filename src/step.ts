import {sleep} from './utils';

export type Step = () => Promise<void>;

export async function run(step: Step, stepTimeout: number): Promise<void> {
  let error: Error | undefined;

  let cancelTimeout: any; // tslint:disable-line no-any
  let timedOut = false;

  await Promise.race<void>([
    (async () => {
      const result = sleep(stepTimeout);

      cancelTimeout = result.cancel;

      await result.wakeUp;

      timedOut = true;

      throw error || new Error(`step timed out after ${stepTimeout} ms`);
    })(),
    (async () => {
      do {
        try {
          await step();

          cancelTimeout();

          return;
        } catch (e) {
          error = e;
        }

        await sleep(0).wakeUp;
      } while (!timedOut);
    })()
  ]);
}
