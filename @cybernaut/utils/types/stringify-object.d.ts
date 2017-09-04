declare module 'stringify-object' {
  interface Options {
    readonly indent?: string;
    readonly inlineCharacterLimit?: number;
    readonly singleQuotes?: boolean;

    filter?<T>(object: T, property: keyof T): boolean;
  }

  /* tslint:disable-next-line no-any */
  function stringifyObject(value: any, options?: Options): string;

  export = stringifyObject;
}
