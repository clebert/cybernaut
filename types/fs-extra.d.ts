// tslint:disable max-line-length

declare module 'fs-extra' {
  export interface Options {
    readonly encoding?: string;
    readonly flag?: string;
    readonly mode?: number;
  }

  // https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputFile.md
  export function outputFile(file: string, data: string | Buffer, options?: Options): Promise<void>;
}
