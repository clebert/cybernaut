export function getValue<T>(maybeValue: T | undefined, defaultValue: T): T {
  return maybeValue !== undefined ? maybeValue : defaultValue;
}
