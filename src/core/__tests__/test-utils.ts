export function given(name: string, fn: () => void): void {
  describe('given ' + name, fn);
}

export function when(name: string, fn: () => void): void {
  describe('when ' + name, fn);
}

export function then(name: string, fn: () => Promise<void>): void {
  test('then ' + name, fn);
}

export function and(name: string, fn: () => void): void {
  describe('and ' + name, fn);
}

// This function works in conjunction with Jest fake timers.
export async function shortSleep(): Promise<void> {
  for (let i = 0; i < 10; i += 1) {
    await Promise.resolve();
  }
}
