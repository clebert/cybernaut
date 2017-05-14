// tslint:disable no-any

declare namespace jest {
  interface AsyncMatchers {
    toEqual(expected: any): Promise<void>;
  }

  interface Matchers {
    readonly rejects: AsyncMatchers;
  }
}
