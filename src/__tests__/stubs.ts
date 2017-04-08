// tslint:disable no-any

import {Stub, stub} from 'sinon';

export class BrowserStubs {
  public readonly outputFile: Stub = stub();
  public readonly sleep: Stub = stub();
  public readonly uuidV4: Stub = stub();
}

export const browserStubs = new BrowserStubs();

export class ConfigStubs {
  public readonly resolve: Stub = stub();
}

export const configStubs = new ConfigStubs();

export class ElementStubs {
  public readonly translate: Stub = stub();
}

export const elementStubs = new ElementStubs();

export class ImplementationStubs {
  public readonly Builder: Stub = stub();
  public readonly Test: Stub = stub();
  public readonly build: Stub = stub();
  public readonly implementation: Stub = stub();
  public readonly implicitlyWait: Stub = stub();
  public readonly manage: Stub = stub();
  public readonly pageLoadTimeout: Stub = stub();
  public readonly pass: Stub = stub();
  public readonly quit: Stub = stub();
  public readonly setScriptTimeout: Stub = stub();
  public readonly timeouts: Stub = stub();
  public readonly withCapabilities: Stub = stub();
}

export const implementationStubs = new ImplementationStubs();

export class PredicateStubs {
  public readonly deepStrictEqual: Stub = stub();
}

export const predicateStubs = new PredicateStubs();

export class StepStubs {
  public readonly sleep: Stub = stub();
  public readonly step: Stub = stub();
}

export const stepStubs = new StepStubs();

export class TestStubs {
  public readonly fail: Stub = stub();
  public readonly format: Stub = stub();
  public readonly get: Stub = stub();
  public readonly pass: Stub = stub();
  public readonly perform: Stub = stub();
  public readonly run: Stub = stub();
  public readonly test: Stub = stub();
}

export const testStubs = new TestStubs();

export type Stubs =
  BrowserStubs |
  ConfigStubs |
  ElementStubs |
  ImplementationStubs |
  PredicateStubs |
  StepStubs |
  TestStubs;

export function resetAll(stubs: Stubs): void {
  for (const key of Object.keys(stubs)) {
    (stubs as any)[key].reset();
  }
}
