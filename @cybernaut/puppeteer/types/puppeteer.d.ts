declare module 'puppeteer' {
  export interface ElementHandle {
    click(): Promise<void>;
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

  export interface GotoOptions {
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

  export interface Page {
    $(selector: string): Promise<ElementHandle>;
    $$(selector: string): Promise<ElementHandle[]>;
    goto(url: string, options?: GotoOptions): Promise<Response>;
    screenshot(options?: ScreenshotOptions): Promise<Buffer>;
    title(): Promise<string>;
    url(): string;
  }

  export interface Browser {
    close(): void;
    newPage(): Promise<Page>;
  }

  export interface LaunchOptions {
    readonly headless?: boolean;
  }

  export function launch(options?: LaunchOptions): Promise<Browser>;
}
