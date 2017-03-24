import {sleep} from './utils';

export type Step = () => Promise<void>;

export async function run(step: Step, stepTimeout: number): Promise<void> {
  let error: Error | undefined;

  let cancelTimeout: any; // tslint:disable-line no-any
  let timedOut = false;

  const startTimeout = async () => {
    const result = sleep(stepTimeout);

    cancelTimeout = result.cancel;

    await result.wakeUp;

    timedOut = true;

    throw error || new Error(`step timed out after ${stepTimeout} ms`);
  };

  const executeStep = async () => {
    do {
      try {
        await step();

        cancelTimeout();

        return;
      } catch (e) {
        error = e;
      }

      // The next line makes sure that the while loop runs asynchronously
      await sleep(0).wakeUp;
    } while (!timedOut);
  };

  await Promise.race<void>([startTimeout(), executeStep()]);
}
