declare module 'debug' {
  type Debug = (...args: string[]) => void;

  function createDebug(namespace: string): Debug;

  export = createDebug;
}
