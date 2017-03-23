export interface SleepResult {
  wakeUp: Promise<void>;

  cancel(): void;
}

export function sleep(duration: number): SleepResult {
  let timeoutId: any; // tslint:disable-line no-any

  const wakeUp = new Promise<void>(resolve => {
    timeoutId = setTimeout(resolve, duration);
  });

  const cancel = () => {
    clearTimeout(timeoutId);
  };

  return {wakeUp, cancel};
}
