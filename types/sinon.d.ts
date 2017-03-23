// tslint:disable no-any

declare module 'sinon' {
  export interface Spy {
    (): any;

    readonly args: any[][];
    readonly callCount: number;
  }

  export interface Stub extends Spy {
    onFirstCall(): this;
    onSecondCall(): this;
    rejects(error: Error): this;
    reset(): void;
    resetBehavior(): void;
    resolves(value: any): this;
    returns(value: any): this;
    throws(error: Error): this;
  }

  export function stub(): Stub;
}
