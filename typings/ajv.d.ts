declare namespace Ajv {
  export interface AjvOptions {
    readonly allErrors?: boolean;
  }

  export interface ErrorsTextOptions {
    readonly dataVar?: string;
    readonly separator?: string;
  }

  export class Ajv {
    public errors: object[] | null;

    public constructor(options?: AjvOptions);

    public errorsText(errors?: object[], options?: ErrorsTextOptions): string;
    public validate(schema: object, data: object): boolean;
  }
}

declare module 'ajv' {
  export = Ajv.Ajv;
}
