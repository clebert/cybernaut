// tslint:disable promise-function-async

declare module 'imgur' {
  export interface Response {
    readonly data: {
      readonly link: string;
    };
  }

  export function setClientId(id: string): void;
  export function uploadBase64(data: string): Promise<Response>;
}
