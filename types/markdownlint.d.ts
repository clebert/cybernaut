declare module 'markdownlint' {
  interface Options {
    readonly config: string;
    readonly files: string[];
  }

  type Callback = (error: Error, result: object) => void;

  function markdownlint(options: Options, callback: Callback): string[];

  export = markdownlint;
}
