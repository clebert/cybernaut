/* tslint:disable no-any */

declare module 'puppeteer' {
  export interface ClickOptions {
    readonly button?: 'left' | 'right' | 'middle';
    readonly clickCount?: number;
    readonly delay?: number;
  }

  export interface ElementHandle {
    click(options?: ClickOptions): Promise<void>;
  }

  export interface ResponseHeaders {
    readonly [name: string]: string;
  }

  export interface Response {
    readonly headers: ResponseHeaders;
    readonly ok: boolean;
    readonly status: number;
    readonly url: string;

    buffer(): Promise<Buffer>;
    json(): Promise<object>;
    text(): Promise<string>;
  }

  export interface NavigationOptions {
    readonly timeout?: number;
    readonly waitUntil?: 'load' | 'networkidle';
    readonly networkIdleInflight?: number;
    readonly networkIdleTimeout?: number;
  }

  export interface ClippingRegion {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  }

  export interface ScreenshotOptions {
    readonly path?: string;
    readonly type?: 'jpeg' | 'png';
    readonly quality?: number;
    readonly fullPage?: boolean;
    readonly clip?: ClippingRegion;
    readonly omitBackground?: boolean;
  }

  export interface TypeOptions {
    readonly delay?: number;
  }

  export interface Page {
    $(selector: string): Promise<ElementHandle>;
    $$(selector: string): Promise<ElementHandle[]>;

    $eval<T, U extends Element = Element>(
      selector: string,
      pageFunction: (element: U, ...args: any[]) => T | Promise<T>,
      ...args: any[]
    ): Promise<T>;

    click(selector: string, options?: ClickOptions): Promise<void>;
    focus(selector: string): Promise<void>;
    goto(url: string, options?: NavigationOptions): Promise<Response>;
    screenshot(options?: ScreenshotOptions): Promise<Buffer>;
    title(): Promise<string>;
    type(text: string, options?: TypeOptions): Promise<void>;
    url(): string;
  }

  export interface Browser {
    close(): void;
    newPage(): Promise<Page>;
    version(): Promise<string>;
    wsEndpoint(): string;
  }

  export interface ConnectOptions {
    readonly browserWSEndpoint?: string;
    readonly ignoreHTTPSErrors?: boolean;
  }

  export interface LaunchOptions {
    readonly ignoreHTTPSErrors?: boolean;
    readonly headless?: boolean;
    readonly executablePath?: string;
    readonly slowMo?: number;
    readonly args?: string[];
    readonly handleSIGINT?: boolean;
    readonly timeout?: number;
    readonly dumpio?: boolean;
    readonly userDataDir?: string;
  }

  export function connect(options?: ConnectOptions): Promise<Browser>;
  export function launch(options?: LaunchOptions): Promise<Browser>;
}
