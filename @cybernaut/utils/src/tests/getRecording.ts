import {getRecording} from '../getRecording';
import {recordable} from '../recordable';

describe('getRecording()', () => {
  it('should return a recording', () => {
    expect(getRecording({[Symbol.for('recording')]: 'recordable'})).toBe(
      'recordable'
    );

    expect(getRecording(recordable<object>('recordable')({}))).toBe(
      'recordable'
    );
  });

  it('should throw an error', () => {
    expect(() => getRecording({[Symbol.for('recording')]: {}})).toThrowError(
      'No recording found'
    );
  });
});
