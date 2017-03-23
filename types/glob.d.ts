declare module 'glob' {
  export interface Options {
    readonly ignore?: string | string[];
    readonly nodir?: boolean;
    readonly realpath?: boolean;
  }

  export function sync(pattern: string, options?: Options): string[];
}
