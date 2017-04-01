export class Deferred {
  public done: boolean = false;

  public then(onFulfilled: () => void): void {
    setImmediate(() => {
      this.done = true;

      onFulfilled();
    });
  }
}
