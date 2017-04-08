// tslint:disable no-any

declare module 'sinon' {
  export interface Spy {
    (): any;

    readonly args: any[][];
    readonly callCount: number;

    calledWithNew(): this;
  }

  export interface Stub extends Spy {
    onFirstCall(): this;
    onSecondCall(): this;
    onThirdCall(): this;
    rejects(error: Error): this;
    reset(): void;
    resolves(value: any): this;
    returns(value: any): this;
    throws(error: Error): this;
  }

  export function stub(): Stub;
}
