declare namespace CDP {
  interface PageCaptureScreenshotReturnObject {
    readonly data: string;
  }

  interface PageNavigateParameters {
    readonly url: string;
  }

  // https://chromedevtools.github.io/devtools-protocol/tot/Page/
  interface Page {
    captureScreenshot(): Promise<PageCaptureScreenshotReturnObject>;
    enable(): Promise<void>;
    loadEventFired(): Promise<void>;
    navigate(parameters: PageNavigateParameters): Promise<void>;
  }

  interface RuntimeEvaluateParameters {
    readonly expression: string;
  }

  // https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObject
  interface RuntimeRemoteObject {
    type:
      | 'object'
      | 'function'
      | 'undefined'
      | 'string'
      | 'number'
      | 'boolean'
      | 'symbol';
    subtype?:
      | 'array'
      | 'null'
      | 'node'
      | 'regexp'
      | 'date'
      | 'map'
      | 'set'
      | 'weakmap'
      | 'weakset'
      | 'iterator'
      | 'generator'
      | 'error'
      | 'proxy'
      | 'promise'
      | 'typedarray';
    className?: string;
    value?: any; // tslint:disable-line no-any
    description?: string;
  }

  interface RuntimeEvaluateReturnObject {
    readonly result: RuntimeRemoteObject;
  }

  // https://chromedevtools.github.io/devtools-protocol/tot/Runtime/
  interface Runtime {
    evaluate(
      parameters: RuntimeEvaluateParameters
    ): Promise<RuntimeEvaluateReturnObject>;
  }

  interface Client {
    readonly Page: Page;
    readonly Runtime: Runtime;

    close(): Promise<void>;
  }

  interface Options {
    readonly host?: string;
    readonly port?: number;
    readonly secure?: boolean;
    readonly remote?: boolean;
  }
}

declare module 'chrome-remote-interface' {
  function _CDP(options?: CDP.Options): Promise<CDP.Client>;

  export = _CDP;
}
