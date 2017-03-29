export type Step = () => Promise<void>;

export async function run(
  step: Step, retries: number, retryDelay: number, attempts: number = 1
): Promise<number> {
  try {
    await step();

    return attempts;
  } catch (e) {
    if (retries >= attempts) {
      await new Promise<void>(resolve => {
        setTimeout(resolve, retryDelay);
      });

      return await run(step, retries, retryDelay, attempts + 1);
    } else {
      throw e;
    }
  }
}
