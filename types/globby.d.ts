declare module 'globby' {
  export interface Options {
    readonly nodir?: boolean;
    readonly realpath?: boolean;
  }

  export function sync(patterns: string[], options?: Options): string[];
}
