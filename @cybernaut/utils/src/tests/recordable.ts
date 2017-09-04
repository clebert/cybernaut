import {getRecording} from '../getRecording';
import {recordable} from '../recordable';

interface RecordableObject {
  ignoredOriginalProperty: this;
  ignoredValueProperty: string;

  originalProperty: this;
  valueProperty: string;

  ignoredOriginalMethod(): this;
  ignoredValueMethod(a: string, b: string): string;

  originalMethod(): this;
  valueMethod(a: string, b: string): string;
}

let originalClass: RecordableClass;
let proxyClass: RecordableClass;

let originalObject: RecordableObject;
let proxyObject: RecordableObject;

class RecordableClass {
  public ignoredMethod(expected: RecordableClass): boolean {
    return this === expected;
  }

  public method(expected: RecordableClass): boolean {
    return this === expected;
  }
}

beforeEach(() => {
  originalClass = new RecordableClass();

  proxyClass = recordable<RecordableClass>('recordableClass', [
    'ignoredMethod'
  ])(originalClass);

  originalObject = {} as any; /* tslint:disable-line no-any */

  originalObject.ignoredOriginalProperty = originalObject.originalProperty = originalObject;
  originalObject.ignoredValueProperty = originalObject.valueProperty = 'foo';

  originalObject.ignoredOriginalMethod = originalObject.originalMethod = () =>
    originalObject;

  originalObject.ignoredValueMethod = originalObject.valueMethod = (a, b) =>
    a + b;

  proxyObject = recordable<RecordableObject>('recordableObject', [
    'ignoredOriginalMethod',
    'ignoredOriginalProperty',
    'ignoredValueMethod',
    'ignoredValueProperty'
  ])(originalObject);
});

describe('recordable()', () => {
  describe('the proxy', () => {
    it('should not have any extra properties', () => {
      expect(Object.getOwnPropertyNames(proxyClass).sort()).toEqual([]);

      expect(
        Object.getOwnPropertyNames(Object.getPrototypeOf(proxyClass)).sort()
      ).toEqual(['constructor', 'ignoredMethod', 'method']);

      expect(Object.getOwnPropertyNames(proxyObject).sort()).toEqual([
        'ignoredOriginalMethod',
        'ignoredOriginalProperty',
        'ignoredValueMethod',
        'ignoredValueProperty',
        'originalMethod',
        'originalProperty',
        'valueMethod',
        'valueProperty'
      ]);
    });

    it('should record any access to its non-ignored properties', () => {
      proxyClass.ignoredMethod(proxyClass);
      proxyClass.method(proxyClass);

      expect(getRecording(proxyClass)).toBe('recordableClass.method({})');

      const originalMethod = proxyObject.originalMethod.bind(proxyObject);

      /* tslint:disable-next-line no-unused-expression */
      proxyObject.originalProperty.valueProperty;

      originalMethod().valueMethod('foo', 'bar');

      const ignoredOriginalMethod = proxyObject.ignoredOriginalMethod.bind(
        proxyObject
      );

      /* tslint:disable-next-line no-unused-expression */
      proxyObject.ignoredOriginalProperty.ignoredValueProperty;

      ignoredOriginalMethod().ignoredValueMethod('foo', 'bar');

      expect(getRecording(proxyObject)).toBe(
        "recordableObject.originalProperty.valueProperty.originalMethod().valueMethod('foo', 'bar')"
      );
    });

    it('should reset the recording of itself', () => {
      proxyClass.method(proxyClass);

      proxyObject.originalMethod();

      expect(getRecording(proxyClass)).toBe('recordableClass.method({})');
      expect(getRecording(proxyClass)).toBe('recordableClass');
      expect(getRecording(originalClass)).toBe('recordableClass');

      expect(getRecording(proxyObject)).toBe(
        'recordableObject.originalMethod()'
      );
      expect(getRecording(proxyObject)).toBe('recordableObject');
      expect(getRecording(originalObject)).toBe('recordableObject');
    });

    it('should return itself', () => {
      expect(proxyObject.ignoredOriginalProperty).toBe(proxyObject);
      expect(proxyObject.ignoredOriginalMethod()).toBe(proxyObject);

      expect(proxyObject.originalProperty).toBe(proxyObject);
      expect(proxyObject.originalMethod()).toBe(proxyObject);
    });

    it('should return a value', () => {
      expect(proxyObject.ignoredValueProperty).toBe('foo');
      expect(proxyObject.ignoredValueMethod('foo', 'bar')).toBe('foobar');

      expect(proxyObject.valueProperty).toBe('foo');
      expect(proxyObject.valueMethod('foo', 'bar')).toBe('foobar');
    });

    it('should provide itself as this-value', () => {
      expect(proxyClass.ignoredMethod(proxyClass)).toBe(true);
      expect(proxyClass.method(proxyClass)).toBe(true);
    });
  });

  describe('the original', () => {
    it('should not have any extra properties', () => {
      expect(Object.getOwnPropertyNames(originalClass).sort()).toEqual([]);

      expect(
        Object.getOwnPropertyNames(Object.getPrototypeOf(originalClass)).sort()
      ).toEqual(['constructor', 'ignoredMethod', 'method']);

      expect(Object.getOwnPropertyNames(originalObject).sort()).toEqual([
        'ignoredOriginalMethod',
        'ignoredOriginalProperty',
        'ignoredValueMethod',
        'ignoredValueProperty',
        'originalMethod',
        'originalProperty',
        'valueMethod',
        'valueProperty'
      ]);
    });

    it('should provide access to the recording of the proxy', () => {
      expect(getRecording(originalClass)).toBe('recordableClass');
      expect(getRecording(originalObject)).toBe('recordableObject');
    });

    it('should not record any access to its properties', () => {
      originalClass.ignoredMethod(originalClass);
      originalClass.method(originalClass);

      expect(getRecording(originalClass)).toBe('recordableClass');

      const originalMethod = originalObject.originalMethod.bind(originalObject);

      /* tslint:disable-next-line no-unused-expression */
      originalObject.originalProperty.valueProperty;

      originalMethod().valueMethod('foo', 'bar');

      const ignoredOriginalMethod = originalObject.ignoredOriginalMethod.bind(
        originalObject
      );

      /* tslint:disable-next-line no-unused-expression */
      originalObject.ignoredOriginalProperty.ignoredValueProperty;

      ignoredOriginalMethod().ignoredValueMethod('foo', 'bar');

      expect(getRecording(originalObject)).toBe('recordableObject');
    });

    it('should reset the recording of the proxy', () => {
      proxyClass.method(proxyClass);

      proxyObject.originalMethod();

      expect(getRecording(originalClass)).toBe('recordableClass.method({})');
      expect(getRecording(originalClass)).toBe('recordableClass');
      expect(getRecording(proxyClass)).toBe('recordableClass');

      expect(getRecording(originalObject)).toBe(
        'recordableObject.originalMethod()'
      );
      expect(getRecording(originalObject)).toBe('recordableObject');
      expect(getRecording(proxyObject)).toBe('recordableObject');
    });

    it('should return itself', () => {
      expect(originalObject.ignoredOriginalProperty).toBe(originalObject);
      expect(originalObject.ignoredOriginalMethod()).toBe(originalObject);

      expect(originalObject.originalProperty).toBe(originalObject);
      expect(originalObject.originalMethod()).toBe(originalObject);
    });

    it('should return a value', () => {
      expect(originalObject.ignoredValueProperty).toBe('foo');
      expect(originalObject.ignoredValueMethod('foo', 'bar')).toBe('foobar');

      expect(originalObject.valueProperty).toBe('foo');
      expect(originalObject.valueMethod('foo', 'bar')).toBe('foobar');
    });

    it('should provide itself as this-value', () => {
      expect(originalClass.ignoredMethod(originalClass)).toBe(true);
      expect(originalClass.method(originalClass)).toBe(true);
    });
  });
});
