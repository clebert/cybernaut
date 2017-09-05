declare namespace CDP {
  /* https://chromedevtools.github.io/devtools-protocol/tot/DOM/ */
  namespace DOM {
    type NodeId = number;

    interface Node {
      readonly nodeId: NodeId;
    }

    interface GetDocumentReturnObject {
      readonly root: Node;
    }

    interface QuerySelectorAllParameters {
      readonly nodeId: NodeId;
      readonly selector: string;
    }

    interface QuerySelectorAllReturnObject {
      readonly nodeIds: NodeId[];
    }

    interface GetOuterHTMLParameters {
      readonly nodeId?: NodeId;
    }

    interface GetOuterHTMLReturnObject {
      readonly outerHTML: string;
    }
  }

  interface DOM {
    getDocument(): Promise<DOM.GetDocumentReturnObject>;

    querySelectorAll(
      parameters: DOM.QuerySelectorAllParameters
    ): Promise<DOM.QuerySelectorAllReturnObject>;

    getOuterHTML(
      parameters?: DOM.GetOuterHTMLParameters
    ): Promise<DOM.GetOuterHTMLReturnObject>;
  }

  /* https://chromedevtools.github.io/devtools-protocol/tot/Emulation/ */
  namespace Emulation {
    interface SetDeviceMetricsOverrideParameters {
      readonly width: number;
      readonly height: number;
      readonly deviceScaleFactor: number;
      readonly mobile: boolean;
      readonly fitWindow: boolean;
      readonly screenWidth?: number;
      readonly screenHeight?: number;
      readonly dontSetVisibleSize?: boolean;
    }

    interface SetTouchEmulationEnabledParameters {
      readonly enabled: boolean;
    }

    interface SetCPUThrottlingRateParameters {
      readonly rate: number;
    }

    interface CanEmulateReturnObject {
      readonly result: boolean;
    }
  }

  interface Emulation {
    setDeviceMetricsOverride(
      parameters: Emulation.SetDeviceMetricsOverrideParameters
    ): Promise<void>;

    setTouchEmulationEnabled(
      parameters: Emulation.SetTouchEmulationEnabledParameters
    ): Promise<void>;

    setCPUThrottlingRate(
      parameters: Emulation.SetCPUThrottlingRateParameters
    ): Promise<void>;

    canEmulate(): Promise<Emulation.CanEmulateReturnObject>;
  }

  /* https://chromedevtools.github.io/devtools-protocol/tot/Network/ */
  namespace Network {
    interface SetUserAgentOverrideParameters {
      readonly userAgent: string;
    }
  }

  interface Network {
    enable(): Promise<void>;
    setUserAgentOverride(
      parameters: Network.SetUserAgentOverrideParameters
    ): Promise<void>;
  }

  /* https://chromedevtools.github.io/devtools-protocol/tot/Page/ */
  namespace Page {
    interface NavigateParameters {
      readonly url: string;
    }

    interface CaptureScreenshotParameters {
      readonly fromSurface?: boolean;
    }

    interface CaptureScreenshotReturnObject {
      readonly data: string;
    }
  }

  interface Page {
    enable(): Promise<void>;
    navigate(parameters: Page.NavigateParameters): Promise<void>;

    captureScreenshot(
      parameters?: Page.CaptureScreenshotParameters
    ): Promise<Page.CaptureScreenshotReturnObject>;

    loadEventFired(): Promise<void>;
  }

  /* https://chromedevtools.github.io/devtools-protocol/tot/Runtime/ */
  namespace Runtime {
    interface EvaluateParameters {
      readonly expression: string;
    }

    interface RemoteObject {
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
      value?: any /* tslint:disable-line no-any */;
      description?: string;
    }

    interface EvaluateReturnObject {
      readonly result: RemoteObject;
    }
  }

  interface Runtime {
    evaluate(
      parameters: Runtime.EvaluateParameters
    ): Promise<Runtime.EvaluateReturnObject>;
  }

  /* https://github.com/cyrus-and/chrome-remote-interface#class-cdp */
  interface Client {
    readonly DOM: DOM;
    readonly Emulation: Emulation;
    readonly Network: Network;
    readonly Page: Page;
    readonly Runtime: Runtime;

    close(): Promise<void>;
  }

  /* https://github.com/cyrus-and/chrome-remote-interface#cdpoptions-callback */
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
