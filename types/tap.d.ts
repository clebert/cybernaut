// tslint:disable max-line-length promise-function-async

declare namespace Tap {
  export type TestCallback = (t: Test) => void | Promise<void>;

  export type TestOptions = {
    readonly todo?: boolean;
    readonly skip?: boolean;
    readonly timeout?: number;
    readonly bail?: boolean;
    readonly autoend?: boolean;
    readonly diagnostic?: boolean;
    readonly buffered?: boolean;
    readonly jobs?: number;
  } & object;

  export interface TestPragma {
    readonly strict: boolean;
  }

  export class Test {
    public jobs: number;

    public test(
      name: string,
      options: TestOptions,
      callback?: TestCallback
    ): Promise<this>;

    public test(name: string, callback?: TestCallback): Promise<this>;

    public tearDown(callback: () => void): void;

    public beforeEach(
      callback: ((done: () => void) => void) | (() => Promise<void>)
    ): void;

    public afterEach(
      callback: ((done: () => void) => void) | (() => Promise<void>)
    ): void;

    public plan(n: number): void;
    public end(): void;
    public bailout(reason?: Error): void;
    public passing(): boolean;
    public comment(message: string): void;
    public fail(message: string, extra?: object): void;
    public pass(message: string): void;
    public pragma(set: TestPragma): void;
    public threw(error: Error): void;
  }
}

declare module 'tap' {
  const tap: Tap.Test;

  export = tap;
}
