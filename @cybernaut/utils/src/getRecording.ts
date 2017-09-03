export function getRecording(recordable: object): string {
  /* tslint:disable-next-line no-any */
  const recording = (recordable as any)[Symbol.for('recording')];

  if (typeof recording !== 'string') {
    throw new Error('No recording found');
  }

  return recording;
}
