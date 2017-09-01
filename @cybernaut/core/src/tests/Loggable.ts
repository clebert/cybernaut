import {Loggable} from '../Loggable';

class ConcreteLoggable extends Loggable {
  public constructor() {
    super('loggable', [
      'ignoredPropertyLog',
      'ignoredPropertyThis',
      'ignoredMethodLog',
      'ignoredMethodThis'
    ]);
  }

  public get ignoredPropertyLog(): string {
    return this.log;
  }

  public get ignoredPropertyThis(): this {
    return this;
  }

  public ignoredMethodLog(): string {
    return this.log;
  }

  public ignoredMethodThis(): this {
    return this;
  }

  public get propertyLog(): string {
    return this.log;
  }

  public get propertyThis(): this {
    return this;
  }

  /* tslint:disable-next-line no-any */
  public methodLog(...args: any[]): string {
    return this.log;
  }

  /* tslint:disable-next-line no-any */
  public methodThis(...args: any[]): this {
    return this;
  }

  public methodValue(): string {
    return 'a value';
  }
}

let loggable: ConcreteLoggable;

beforeEach(() => {
  loggable = new ConcreteLoggable();
});

describe('Loggable.log', () => {
  it('should not contain ignored-property accesses or ignored-method calls', () => {
    expect(loggable.ignoredPropertyThis.methodThis().ignoredPropertyLog).toBe(
      'loggable.methodThis()'
    );

    expect(loggable.ignoredMethodThis().propertyThis.ignoredMethodLog()).toBe(
      'loggable.propertyThis'
    );
  });

  it('should contain property accesses and method calls', () => {
    expect(loggable.propertyThis.propertyLog).toBe(
      'loggable.propertyThis.propertyLog'
    );

    const methodThis = loggable.methodThis.bind(loggable);

    expect(loggable.methodThis(1).methodValue()).toBe('a value');

    expect(methodThis(2).methodLog()).toBe(
      'loggable.methodThis(1).methodValue().methodThis(2).methodLog()'
    );

    expect(loggable.methodLog('')).toBe("loggable.methodLog('')");
    expect(loggable.methodLog([], {})).toBe('loggable.methodLog([], {})');
  });
});
