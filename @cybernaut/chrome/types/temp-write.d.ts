declare module 'temp-write' {
  function tempWrite(data: Buffer, name?: string): Promise<string>;

  export = tempWrite;
}
