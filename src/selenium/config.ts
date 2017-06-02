import {Options} from '../core/options';

export interface Capabilities {
  readonly browserName: string;
}

export interface Timeouts {
  readonly element: number;
  readonly page: number;
  readonly script: number;
}

export interface SeleniumConfig extends Options {
  readonly capabilities: Capabilities;
  readonly timeouts: Timeouts;
}
